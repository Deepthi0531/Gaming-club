package com.gaming.Controller;

import com.gaming.Model.Member;
import com.gaming.Model.Recharge;
import com.gaming.Model.dto.CollectionRecordDto;
import com.gaming.Repository.MemberRepository;
import com.gaming.Repository.RechargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
//import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/collections")
@CrossOrigin(origins = "http://localhost:3000")
public class CollectionController {

    @Autowired
    private RechargeRepository rechargeRepository;
    
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public ResponseEntity<?> getCollectionsByDate(
        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        ZoneId systemTimeZone = ZoneId.systemDefault();
        Instant startInstant = date.atStartOfDay(systemTimeZone).toInstant();
        Instant endInstant = date.plusDays(1).atStartOfDay(systemTimeZone).toInstant();

        List<Recharge> recharges = rechargeRepository.findByTimestampBetween(startInstant, endInstant);

        double rechargeTotal = recharges.stream().mapToDouble(Recharge::getAmount).sum();
        double grandTotal = rechargeTotal ;

        List<String> memberIds = recharges.stream().map(Recharge::getMemberId).distinct().collect(Collectors.toList());
        Map<String, String> memberIdToNameMap = memberRepository.findAllById(memberIds).stream()
            .collect(Collectors.toMap(Member::getId, Member::getName));
            
        List<CollectionRecordDto> records = recharges.stream()
            .map(recharge -> new CollectionRecordDto(
                memberIdToNameMap.getOrDefault(recharge.getMemberId(), "Unknown Member"),
                recharge.getAmount()
            ))
            .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("records", records);
        response.put("total", grandTotal);

        return ResponseEntity.ok(response);
    }
}