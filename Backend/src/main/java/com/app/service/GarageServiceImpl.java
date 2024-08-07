package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Garage;
import com.app.repository.GarageRepository;

@Service
@Transactional
public class GarageServiceImpl implements GarageService {

	@Autowired
	private GarageRepository garageRepository;

	public Garage signUp(Garage garage) throws Exception {
		if (garageRepository.findByEmail(garage.getEmail()).isPresent()) {
			throw new Exception("Email already in use");
		}
		if (garageRepository.findByMobileNo(garage.getMobileNo()).isPresent()) {
			throw new Exception("Mobile number already in use");
		}

		if (!garage.getConfirmPassword().equals(garage.getPassword())) {
			throw new Exception("Password do not match");
		}
		return garageRepository.save(garage);
	}

	public String signIn(String garageName, String password) {
		Optional<Garage> garage = garageRepository.findByEmail(garageName);
		String message = "garage not found";
		if (!garage.isPresent()) {
			garage = garageRepository.findByMobileNo(garageName);
		}
		if (garage.isPresent() && password.equals(garage.get().getPassword())) {
			message = "garage login successful";
			return message;
		}
		return message;
	}

	public Optional<Garage> getGarageByEmail(String email) {
		return garageRepository.findByEmail(email);
	}

	public Optional<Garage> getGarageByMobile(String mobile) {
		return garageRepository.findByMobileNo(mobile);
	}

}
