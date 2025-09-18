package com.gaming.Repository;

import com.gaming.Model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    // This method finds all transactions for a given memberId,
    // sorted with the most recent first.
    List<Transaction> findByMemberIdOrderByTimestampDesc(String memberId);

}