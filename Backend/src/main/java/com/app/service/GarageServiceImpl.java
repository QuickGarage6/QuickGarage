package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AddressDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.GarageDetailsForUserDto;
import com.app.dto.GarageDto;
import com.app.dto.GarageUpdateDto;
import com.app.dto.UpdatePasswordDto;
import com.app.entities.Address;
import com.app.entities.Garage;
import com.app.repository.GarageRepository;

@Service
@Transactional
public class GarageServiceImpl implements GarageService {

	@Autowired
	private GarageRepository garageRepository;
	
	@Autowired
	private ModelMapper modelMapper;

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

	public Optional<Garage> signIn(String garageName, String password) {
		Optional<Garage> garage = garageRepository.findByEmail(garageName);
		// String message = "garage not found";
		if (!garage.isPresent()) {
			garage = garageRepository.findByMobileNo(garageName);
		}
		if (garage.isPresent() && password.equals(garage.get().getPassword())) {
			// message = "garage login successful";
			return garage;
		}
		return Optional.empty();
	}

	public Optional<Garage> getGarageByEmail(String email) {
		return garageRepository.findByEmail(email);
	}

	public Optional<Garage> getGarageByMobile(String mobile) {
		return garageRepository.findByMobileNo(mobile);
	}

	@Override
	public String deleteGarage(String garagename) throws Exception {
		Garage garage = garageRepository.findByEmail(garagename).orElse(null);
		String message = "Account deleted successfully";
		if (garage == null) {
			garage = garageRepository.findByMobileNo(garagename).orElseThrow(() -> new Exception("garage not found"));
		}

		garageRepository.delete(garage);
		return message;

	}

	@Override
	public String updatePassword(String garagename, UpdatePasswordDto updatePasswordDto) throws Exception {

		Garage garage = garageRepository.findByEmail(garagename).orElse(null);
		String message = "Password updated successfully";
		if (garage == null) {
			garage = garageRepository.findByMobileNo(garagename).orElse(null);
			if (garage == null)
				throw new Exception("garage not found");
		}

		if (!updatePasswordDto.getCurrentPassword().equals(garage.getPassword())) {
			throw new Exception("Current password is incorrect");
		}

		garage.setPassword(updatePasswordDto.getNewPassword());
		garageRepository.save(garage);

		return message;
	}

	@Override
	public String updateGarageDetails(String username, GarageUpdateDto garageUpdateDto) throws Exception {
		Garage garage = garageRepository.findByEmail(username).orElse(null);
		String message = "Details updated successfully";
		if (garage == null) {
			garage = garageRepository.findByMobileNo(username).orElse(null);
			if (garage == null)
				throw new Exception("garage not found");
		}

		if (garageUpdateDto.getOwnerName() != null) {
			garage.setOwnerName(garageUpdateDto.getOwnerName());
		}
		if (garageUpdateDto.getGarageName() != null) {
			garage.setGarageName(garageUpdateDto.getGarageName());
		}
		if (garageUpdateDto.getMobileNo() != null) {
			garage.setMobileNo(garageUpdateDto.getMobileNo());
		}
		if (garageUpdateDto.getEmail() != null) {
			garage.setEmail(garageUpdateDto.getEmail());
		}
		if (garageUpdateDto.getServiceType() != null) {
			garage.setServiceType(garageUpdateDto.getServiceType());
		}
		if (garageUpdateDto.getAddressDto() != null) {
			AddressDto addressDto = garageUpdateDto.getAddressDto();
			Address address = garage.getAddress(); // Assuming you have a getter for address

			// Update address fields
			if (addressDto.getStreetAddress() != null) {
				address.setStreetAddress(addressDto.getStreetAddress());
			}
			if (addressDto.getCity() != null) {
				address.setCity(addressDto.getCity());
			}
			if (addressDto.getState() != null) {
				address.setState(addressDto.getState());
			}
			if (addressDto.getZipCode() != null) {
				address.setZipCode(addressDto.getZipCode());
			}
			if (addressDto.getCountry() != null) {
				address.setCountry(addressDto.getCountry());
			}

			garage.setAddress(address); // Assuming you have a setter for address
		}
		if (garageUpdateDto.getLicenseNumber() > 0) {
			garage.setLicenseNumber(garageUpdateDto.getLicenseNumber());
		}
		if (garageUpdateDto.getYrsOfOperation() > 0) {
			garage.setYrsOfOperation(garageUpdateDto.getYrsOfOperation());
		}

		garageRepository.save(garage);

		return message;

	}

	@Override
	public Optional<Garage> forgotPassword(ForgotPasswordDto forgotPasswordDto) throws Exception {
		Optional<Garage> garageOptional = garageRepository.findByEmail(forgotPasswordDto.getUsername());
		// String message = "Details updated successfully";
		if (!garageOptional.isPresent()) {
			garageOptional = garageRepository.findByMobileNo(forgotPasswordDto.getUsername());
			if (!garageOptional.isPresent())
				throw new Exception("garage not found");
		}
		Garage garage = garageOptional.get();
		if (!forgotPasswordDto.getNewPassword().equals(forgotPasswordDto.getConfirmPassword())) {
			throw new Exception("Password is incorrect");
		}
		garage.setPassword(forgotPasswordDto.getNewPassword());
		garageRepository.save(garage);

		return garageOptional;

	}

	@Override
	public List<GarageDto> getAllGarages() {
		List<Garage> garages = garageRepository.findAll();
		return garages.stream().map(garage -> modelMapper.map(garage, GarageDto.class)).collect(Collectors.toList());

	}
	
	@Override
	public List<GarageDetailsForUserDto> getAllGaragesForUser() {
		List<Garage> garages = garageRepository.findAll();
		return garages.stream().map(garage -> modelMapper.map(garage, GarageDetailsForUserDto.class)).collect(Collectors.toList());

	}
}
