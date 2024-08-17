package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	@Modifying
    @Query("DELETE FROM Booking b WHERE b.garage.id = :garageId")
    void deleteByGarageId(Long garageId);
	
	@Modifying
	@Query("DELETE FROM Booking b WHERE b.user.id = :userId")
	void deleteByUserId(Long userId);
	
}
