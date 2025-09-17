package com.gaming.gaming.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.gaming.gaming.Model.Recharge;

@Repository
public interface RechargeRepository extends MongoRepository<Recharge, String> {
    // Additional query methods as needed
}
