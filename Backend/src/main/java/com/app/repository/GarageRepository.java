package com.app.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

	@Query(value = "SELECT *, " +
            "ST_Distance_Sphere(POINT(:longitude, :latitude), POINT(g.longitude, g.latitude)) AS distance " +
            "FROM garage g " +
            "WHERE ST_Distance_Sphere(POINT(:longitude, :latitude), POINT(g.longitude, g.latitude)) <= :radius " +
            "ORDER BY distance",
    nativeQuery = true)
List<Garage> findNearbyGarages(@Param("latitude") double latitude,
                            @Param("longitude") double longitude,
                            @Param("radius") double radius);
	
}
