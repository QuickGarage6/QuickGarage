package com.app.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Garage;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Long> {

	Optional<Garage> findByEmail(String email);

	Optional<Garage> findByMobileNo(String mobileNo);

	@Modifying
	@Transactional
	@Query("Delete from Garage u where u.email=:username OR u.mobileNo=:username")
	void deleteGarage(String username);

	
}
