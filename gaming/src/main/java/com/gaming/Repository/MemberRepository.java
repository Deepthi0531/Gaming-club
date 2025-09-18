package com.gaming.Repository;

import com.gaming.Model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface MemberRepository extends MongoRepository<Member, String> {
    Optional<Member> findByPhone(String phone);
}