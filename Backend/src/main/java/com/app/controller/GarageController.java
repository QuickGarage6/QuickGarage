package com.app.controller;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.GarageSignInDto;
import com.app.dto.GarageSignUpDto;
import com.app.dto.GarageUpdateDto;
import com.app.dto.UpdatePasswordDto;
import com.app.entities.Address;
import com.app.entities.Garage;
import com.app.entities.User;
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
	public ResponseEntity<Garage> signIn(@RequestBody GarageSignInDto garageSignInDto) {
		Optional<Garage> garageOptional = garageService.signIn(garageSignInDto.getUserName(), garageSignInDto.getPassword());
		if (garageOptional.isPresent()) {
            Garage garage = garageOptional.get();
            return ResponseEntity.ok(garage); // Return user data with status 200 OK
        } 
	   else {
			return ResponseEntity.status(401).build();
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

	@DeleteMapping("/{username}/delete")
	public ResponseEntity<String> deleteGarage(@PathVariable String username) {
		try {
			String message = garageService.deleteGarage(username);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}

	@PutMapping("/{username}/update-password")
	public ResponseEntity<String> updatePassword(@PathVariable String username,
			@RequestBody UpdatePasswordDto updatePasswordDto) {
		try {

			String message = garageService.updatePassword(username, updatePasswordDto);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PutMapping("/{username}/update-garage")
	public ResponseEntity<String> updateGarageDetails(@PathVariable String username,
			@RequestBody GarageUpdateDto garageUpdateDto) {
		System.out.println("Received GarageUpdateDto: " + garageUpdateDto);
		try {

			String message = garageService.updateGarageDetails(username, garageUpdateDto);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
