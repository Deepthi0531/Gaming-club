package com.gaming.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime; // <-- Make sure to import this

@Document(collection = "recharges")
public class Recharge {

    @Id
    private String id;
    private double amount;
    
    // --- ADD THESE TWO FIELDS ---
    private String memberId;
    private LocalDateTime timestamp;

    // --- Getters and setters ---
    public String getId() { return id; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    
    // --- ADD THESE METHODS ---
    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}