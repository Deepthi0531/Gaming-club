package com.gaming.Controller;

import com.gaming.Model.Game;
import com.gaming.Model.Member;
import com.gaming.Model.Recharge;
import com.gaming.Model.Transaction;
import com.gaming.Model.dto.TransactionDto;
import com.gaming.Repository.GameRepository;
import com.gaming.Repository.MemberRepository;
import com.gaming.Repository.RechargeRepository;
import com.gaming.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RechargeRepository rechargeRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private GameRepository gameRepository;

    // DTO for creating a new member
    public static class MemberCreationRequest {
        private String name;
        private String phone;
        private double initialDeposit;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public double getInitialDeposit() { return initialDeposit; }
        public void setInitialDeposit(double initialDeposit) { this.initialDeposit = initialDeposit; }
    }

    // DTO for the 'play game' request
    public static class PlayGameRequest {
        private String gameId;
        public String getGameId() { return gameId; }
        public void setGameId(String gameId) { this.gameId = gameId; }
    }

    @PostMapping
    public ResponseEntity<?> createMembership(@RequestBody MemberCreationRequest request) {
        if (memberRepository.findByPhone(request.getPhone()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "A member with this phone number already exists."));
        }
        Member newMember = new Member();
        newMember.setName(request.getName());
        newMember.setPhone(request.getPhone());
        newMember.setBalance(request.getInitialDeposit());
        newMember.setMemberSince(LocalDateTime.now());
        Member savedMember = memberRepository.save(newMember);

        Recharge initialRecharge = new Recharge();
        initialRecharge.setMemberId(savedMember.getId());
        initialRecharge.setAmount(request.getInitialDeposit());
        initialRecharge.setTimestamp(Instant.now());
        rechargeRepository.save(initialRecharge);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    @GetMapping("/{phone}")
    public ResponseEntity<?> getMemberByPhone(@PathVariable String phone) {
        Optional<Member> memberOptional = memberRepository.findByPhone(phone);
        if (memberOptional.isPresent()) {
            return ResponseEntity.ok(memberOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Member not found with this phone number."));
        }
    }

    @GetMapping("/{phone}/recharges")
    public ResponseEntity<?> getRechargeHistory(@PathVariable String phone) {
        Optional<Member> memberOptional = memberRepository.findByPhone(phone);
        if (memberOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Member not found."));
        }
        List<Recharge> recharges = rechargeRepository.findByMemberIdOrderByTimestampDesc(memberOptional.get().getId());
        return ResponseEntity.ok(recharges);
    }

    // --- THIS IS THE CORRECT VERSION OF THE METHOD ---
    @GetMapping("/{phone}/transactions")
    public ResponseEntity<?> getPlayedGamesHistory(@PathVariable String phone) {
        Optional<Member> memberOptional = memberRepository.findByPhone(phone);
        if (memberOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Member not found."));
        }
        List<Transaction> transactions = transactionRepository.findByMemberIdOrderByTimestampDesc(memberOptional.get().getId());
        
        List<String> gameIds = transactions.stream()
                .map(Transaction::getGameId)
                .distinct()
                .collect(Collectors.toList());
                
        Map<String, String> gameIdToNameMap = gameRepository.findAllById(gameIds).stream()
                .collect(Collectors.toMap(Game::getId, Game::getName));
                
        List<TransactionDto> transactionDtos = transactions.stream().map(transaction -> {
            TransactionDto dto = new TransactionDto();
            dto.setId(transaction.getId());
            dto.setAmount(transaction.getAmount());
            dto.setTimestamp(transaction.getTimestamp());
            dto.setGameName(gameIdToNameMap.getOrDefault(transaction.getGameId(), "Unknown Game"));
            return dto;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(transactionDtos);
    }

    @PostMapping("/{phone}/play")
    public ResponseEntity<?> playGame(@PathVariable String phone, @RequestBody PlayGameRequest request) {
        Optional<Member> memberOptional = memberRepository.findByPhone(phone);
        if (memberOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Member not found."));
        }

        Optional<Game> gameOptional = gameRepository.findById(request.getGameId());
        if (gameOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Game not found."));
        }

        Member member = memberOptional.get();
        Game game = gameOptional.get();

        if (member.getBalance() < game.getPrice()) {
            return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(Map.of("message", "Insufficient balance."));
        }

        member.setBalance(member.getBalance() - game.getPrice());
        memberRepository.save(member);

        Transaction transaction = new Transaction();
        transaction.setMemberId(member.getId());
        transaction.setGameId(game.getId());
        transaction.setAmount(game.getPrice());
        transaction.setTimestamp(Instant.now());
        transactionRepository.save(transaction);

        return ResponseEntity.ok(Map.of("message", "Game played successfully.", "newBalance", member.getBalance()));
    }
}