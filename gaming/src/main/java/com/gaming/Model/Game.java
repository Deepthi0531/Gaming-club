package com.gaming.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "games")
public class Game {

    @Id
    private String id;
    private String name;
    private double price;
    private String description;
    private int minPlayers;
    private boolean multipleAllowed;

    public Game() {}

    public Game(String name, double price, String description, int minPlayers, boolean multipleAllowed) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.minPlayers = minPlayers;
        this.multipleAllowed = multipleAllowed;
    }

    public String getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getMinPlayers() {
        return minPlayers;
    }

    public void setMinPlayers(int minPlayers) {
        this.minPlayers = minPlayers;
    }

    public boolean isMultipleAllowed() {
        return multipleAllowed;
    }

    public void setMultipleAllowed(boolean multipleAllowed) {
        this.multipleAllowed = multipleAllowed;
    }
}