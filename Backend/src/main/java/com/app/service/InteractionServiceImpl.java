package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.InteractionDto;
import com.app.repository.InteractionRepository;

@Service
@Transactional
public class InteractionServiceImpl implements InteractionService {

    @Autowired
    private InteractionRepository interactionHistoryRepository;

//    public List<InteractionHistory> getInteractionHistoryByUserId(Long userId) {
//        return interactionHistoryRepository.findByUserId(userId);
//    }
//
//    public List<InteractionHistory> getInteractionHistoryByGarageId(Long garageId) {
//        return interactionHistoryRepository.findByGarageId(garageId);
//    }
    
    public List<InteractionDto> getInteractionsForGarage(Long garageId) {
        return interactionHistoryRepository.findInteractionsByGarageId(garageId);
    }
}
