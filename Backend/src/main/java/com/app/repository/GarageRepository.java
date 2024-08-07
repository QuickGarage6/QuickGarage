package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Garage;

@Repository
public interface GarageRepository extends JpaRepository<Garage, Long> {

	Optional<Garage> findByEmail(String email);

	Optional<Garage> findByMobileNo(String mobileNo);

}
