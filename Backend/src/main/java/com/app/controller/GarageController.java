package com.app.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.GarageSignInDto;
import com.app.dto.GarageSignUpDto;
import com.app.dto.GarageUpdateDto;
import com.app.dto.NotificationDto;
import com.app.dto.UpdatePasswordDto;
import com.app.entities.Address;
import com.app.entities.Garage;
import com.app.entities.Services;
import com.app.service.GarageServiceImpl;
import com.app.service.NotificationServiceImpl;

@RestController
@RequestMapping("/api/garage")
public class GarageController {
	@Autowired
	private GarageServiceImpl garageService;

	@Autowired
	private NotificationServiceImpl notificationService;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/signup")
	public ResponseEntity<ApiResponse<Garage>> signUp(@RequestBody @Valid GarageSignUpDto garageSignUpDto)
			throws Exception {

		Garage garage = modelMapper.map(garageSignUpDto, Garage.class);
		if (garageSignUpDto.getAddressDto() != null) {
			Address address = modelMapper.map(garageSignUpDto.getAddressDto(), Address.class);
			garage.setAddress(address);
		}

		Garage newGarage = garageService.signUp(garage);
		ApiResponse<Garage> response = new ApiResponse<>(HttpStatus.OK, "Garage signed up successfully", newGarage);
		return ResponseEntity.ok(response);

	}

	@PostMapping("/signin")
	public ResponseEntity<ApiResponse<Garage>> signIn(@RequestBody @Valid GarageSignInDto garageSignInDto) {
		Optional<Garage> garageOptional = garageService.signIn(garageSignInDto.getUserName(),
				garageSignInDto.getPassword());
		if (garageOptional.isPresent()) {
			Garage garage = garageOptional.get();
			ApiResponse<Garage> response = new ApiResponse<>(HttpStatus.OK, "Garage signIn successful", garage);
			return ResponseEntity.ok(response); // Return user data with status 200 OK

		} else {
			return ResponseEntity.status(401).body(new ApiResponse(HttpStatus.UNAUTHORIZED, "Garage login failed"));
		}
	}

	@GetMapping("/email")
	public ResponseEntity<Garage> getGarageByEmail(@RequestParam @NotNull String email) {
		return garageService.getGarageByEmail(email).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/mobile")
	public ResponseEntity<Garage> getGarageByMobile(@RequestParam @NotNull String mobile) {
		return garageService.getGarageByMobile(mobile).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{username}/delete")
	public ResponseEntity<String> deleteGarage(@PathVariable @NotNull String username) {
		try {
			String message = garageService.deleteGarage(username);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}

	@PutMapping("/{username}/update-password")
	public ResponseEntity<String> updatePassword(@PathVariable @NotNull String username,
			@RequestBody @Valid UpdatePasswordDto updatePasswordDto) {
		try {

			String message = garageService.updatePassword(username, updatePasswordDto);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PutMapping("/{username}/update-garage")
	public ResponseEntity<String> updateGarageDetails(@PathVariable @NotNull String username,
			@RequestBody GarageUpdateDto garageUpdateDto) {
		System.out.println("Received GarageUpdateDto: " + garageUpdateDto);
		try {

			String message = garageService.updateGarageDetails(username, garageUpdateDto);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PutMapping("/forget-password")
	public ResponseEntity<ApiResponse<Garage>> forgotPassword(@RequestBody @Valid ForgotPasswordDto forgotPasswordDto) {
		try {

			Optional<Garage> garageOptional = garageService.forgotPassword(forgotPasswordDto);

			Garage garage = garageOptional.get();
			ApiResponse<Garage> response = new ApiResponse<>(HttpStatus.OK, "Password updated successfully", garage);
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			return ResponseEntity.status(401).body(new ApiResponse(HttpStatus.UNAUTHORIZED, "Please try again"));
		}
	}

	@GetMapping("/nearby")
	public ResponseEntity<ApiResponse<List<Garage>>> getNearbyGarages(@RequestParam @NotNull double latitude,
			@RequestParam double longitude, @RequestParam(defaultValue = "5") double radiusInKm) {
		List<Garage> garages = garageService.getNearbyGarages(latitude, longitude, radiusInKm);
		ApiResponse<List<Garage>> response = new ApiResponse<>(HttpStatus.OK, "List displayed successfully", garages);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{garageId}/notification")
	public List<NotificationDto> getNotification(@PathVariable @NotNull Long garageId) {
		return notificationService.getNotifications(garageId);
	}

	@GetMapping("/services")
	public ResponseEntity<ApiResponse<List<Services>>> getServices() {
		List<Services> service = garageService.getServices();
		ApiResponse<List<Services>> response = new ApiResponse<>(HttpStatus.OK, "Service List displayed successfully",
				service);
		return ResponseEntity.ok(response);
	}

}
