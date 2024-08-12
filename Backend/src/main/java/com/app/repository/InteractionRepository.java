package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.dto.InteractionDto;
import com.app.entities.InteractionHistory;

@Repository
public interface InteractionRepository extends JpaRepository<InteractionHistory, Long> {
	
	@Query("SELECT new com.app.dto.InteractionDto(u.name, i.interactionDate) " + "FROM InteractionHistory i "
			+ "JOIN i.user u " + "WHERE i.garage.id = :garageId")
	List<InteractionDto> findInteractionsByGarageId(@Param("garageId") Long garageId);
}
