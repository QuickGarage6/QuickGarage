package com.app.service;

import java.util.List;

import com.app.dto.InteractionDto;

public interface InteractionService {

	public List<InteractionDto> getInteractionsForGarage(Long garageId);
}
