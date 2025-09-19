package com.gaming.Model.dto;

public class CollectionRecordDto {

    private String memberName;
    private double amount;
    
    public CollectionRecordDto(String memberName, double amount) {
        this.memberName = memberName;
        this.amount = amount;
    }
    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}