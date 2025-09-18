package com.gaming.Repository;

import com.gaming.Model.Recharge;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface RechargeRepository extends MongoRepository<Recharge, String> {

    List<Recharge> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    // --- ADD THIS METHOD ---
    // Finds all recharges for a given memberId, sorted with the most recent first.
    List<Recharge> findByMemberIdOrderByTimestampDesc(String memberId);
}