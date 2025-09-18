package com.gaming.Repository;

import com.gaming.Model.Recharge;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.Instant;
import java.util.List;

public interface RechargeRepository extends MongoRepository<Recharge, String> {
    List<Recharge> findByTimestampBetween(Instant start, Instant end);

    List<Recharge> findByMemberIdOrderByTimestampDesc(String memberId);
}