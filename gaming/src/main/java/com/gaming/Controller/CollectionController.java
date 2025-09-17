package com.gaming.gaming.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.gaming.gaming.Model.CollectionRecord;
import com.gaming.gaming.Repository.CollectionRepository;

@RestController
@RequestMapping("/api/collections")
public class CollectionController {

    @Autowired
    private CollectionRepository collectionRepository;

    @GetMapping
    public List<CollectionRecord> getAllCollections() {
        return collectionRepository.findAll();
    }

    @PostMapping
    public CollectionRecord createCollection(@RequestBody CollectionRecord collection) {
        return collectionRepository.save(collection);
    }
}
