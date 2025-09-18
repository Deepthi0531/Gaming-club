package com.gaming.Repository;

import com.gaming.Model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.Instant;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    List<Transaction> findByMemberIdOrderByTimestampDesc(String memberId);
    List<Transaction> findByTimestampBetween(Instant start, Instant end);
}