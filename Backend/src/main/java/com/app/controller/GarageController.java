package com.app.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.GarageSignInDto;
import com.app.dto.GarageSignUpDto;
import com.app.entities.Address;
import com.app.entities.Garage;
import com.app.service.GarageServiceImpl;

@RestController
@RequestMapping("/api/garage")
public class GarageController {
	@Autowired
	private GarageServiceImpl garageService;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/signup")
	public ResponseEntity<Garage> signUp(@RequestBody GarageSignUpDto garageSignUpDto) throws Exception {

		// Convert DTO to Entity
		Garage garage = modelMapper.map(garageSignUpDto, Garage.class);
		if (garageSignUpDto.getAddressDto() != null) {
			Address address = modelMapper.map(garageSignUpDto.getAddressDto(), Address.class);
			garage.setAddress(address);
		}

		Garage newGarage = garageService.signUp(garage);
		return ResponseEntity.ok(newGarage);

	}

	@PostMapping("/signin")
	public ResponseEntity<String> signIn(@RequestBody GarageSignInDto garageSignInDto) {
		String message = garageService.signIn(garageSignInDto.getUserName(), garageSignInDto.getPassword());
		if (message.equals("Garage login successful")) {
			return ResponseEntity.ok(message);
		} else {
			return ResponseEntity.status(401).body(message);
		}
	}

	@GetMapping("/email")
	public ResponseEntity<Garage> getGarageByEmail(@RequestParam String email) {
		return garageService.getGarageByEmail(email).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/mobile")
	public ResponseEntity<Garage> getGarageByMobile(@RequestParam String mobile) {
		return garageService.getGarageByMobile(mobile).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

}
