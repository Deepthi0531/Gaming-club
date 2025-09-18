package com.gaming.Controller;

import com.gaming.Model.Member;
import com.gaming.Model.Recharge;
import com.gaming.Repository.MemberRepository;
import com.gaming.Repository.RechargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/recharges")
@CrossOrigin(origins = "http://localhost:3000")
public class RechargeController {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RechargeRepository rechargeRepository;

    public static class RechargeRequest {
        private String phone;
        private double amount;
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }
    }

    @PostMapping
    public ResponseEntity<?> rechargeAccount(@RequestBody RechargeRequest request) {
        Optional<Member> memberOptional = memberRepository.findByPhone(request.getPhone());

        if (memberOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Member not found with this phone number."));
        }
        Member member = memberOptional.get();
        member.setBalance(member.getBalance() + request.getAmount());
        Member updatedMember = memberRepository.save(member);

        Recharge recharge = new Recharge();
        recharge.setMemberId(updatedMember.getId());
        recharge.setAmount(request.getAmount());
        recharge.setTimestamp(Instant.now());
        rechargeRepository.save(recharge);

        return ResponseEntity.ok(updatedMember);
    }
}