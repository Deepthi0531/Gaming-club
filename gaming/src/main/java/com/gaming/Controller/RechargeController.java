package com.gaming.gaming.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.gaming.gaming.Repository.RechargeRepository;
import com.gaming.gaming.Model.Recharge;

@RestController
@RequestMapping("/api/recharges")
public class RechargeController {

    @Autowired
    private RechargeRepository rechargeRepository;

    @GetMapping
    public List<Recharge> getAllRecharges() {
        return rechargeRepository.findAll();
    }

    @PostMapping
    public Recharge createRecharge(@RequestBody Recharge recharge) {
        return rechargeRepository.save(recharge);
    }
}
