package com.gaming.Controller;

import com.gaming.Model.Game;
import com.gaming.Model.Member;
import com.gaming.Model.Recharge;
import com.gaming.Model.Transaction;
import com.gaming.Repository.GameRepository;
import com.gaming.Repository.MemberRepository;
import com.gaming.Repository.RechargeRepository;
import com.gaming.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        // Getters and Setters
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
        // Getter and Setter
        public String getGameId() { return gameId; }
        public void setGameId(String gameId) { this.gameId = gameId; }
    }

    // --- POST /api/members ---
    // Creates a new member
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
        initialRecharge.setTimestamp(LocalDateTime.now());
        rechargeRepository.save(initialRecharge);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    // --- GET /api/members/{phone} ---
    // Finds a member by their phone number
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

    // --- GET /api/members/{phone}/recharges ---
    // Gets the recharge history for a specific member
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

    // --- GET /api/members/{phone}/transactions ---
    // Gets the played games history for a specific member
    @GetMapping("/{phone}/transactions")
    public ResponseEntity<?> getPlayedGamesHistory(@PathVariable String phone) {
        Optional<Member> memberOptional = memberRepository.findByPhone(phone);
        if (memberOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Member not found."));
        }
        List<Transaction> transactions = transactionRepository.findByMemberIdOrderByTimestampDesc(memberOptional.get().getId());
        return ResponseEntity.ok(transactions);
    }

    // --- POST /api/members/{phone}/play ---
    // Handles the logic when a member plays a game
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

        // Deduct balance and save member
        member.setBalance(member.getBalance() - game.getPrice());
        memberRepository.save(member);

        // Create transaction record
        Transaction transaction = new Transaction();
        transaction.setMemberId(member.getId());
        transaction.setGameId(game.getId());
        transaction.setAmount(game.getPrice());
        transaction.setTimestamp(LocalDateTime.now());
        transactionRepository.save(transaction);

        return ResponseEntity.ok(Map.of("message", "Game played successfully.", "newBalance", member.getBalance()));
    }
}