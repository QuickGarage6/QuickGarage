package com.app.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.GarageExceptions;
import com.app.dto.AddressDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.GarageDetailsForUserDto;
import com.app.dto.GarageDto;
import com.app.dto.GarageUpdateDto;
import com.app.dto.UpdatePasswordDto;
import com.app.entities.Address;
import com.app.entities.Garage;
import com.app.entities.Services;
import com.app.repository.GarageRepository;

@Service
@Transactional
public class GarageServiceImpl implements GarageService {

	@Autowired
	private GarageRepository garageRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public Garage signUp(Garage garage) throws GarageExceptions {
		if (garageRepository.findByEmail(garage.getEmail()).isPresent()) {
			throw new GarageExceptions("Email already in use");
		}
		if (garageRepository.findByMobileNo(garage.getMobileNo()).isPresent()) {
			throw new GarageExceptions("Mobile number already in use");
		}

		if (!garage.getConfirmPassword().equals(garage.getPassword())) {
			throw new GarageExceptions("Password do not match");
		}

		garage.setPassword(passwordEncoder.encode(garage.getPassword()));
		return garageRepository.save(garage);
	}

	public Optional<Garage> signIn(String garageName, String password) {
		Optional<Garage> garage = garageRepository.findByEmail(garageName);
		if (!garage.isPresent()) {
			garage = garageRepository.findByMobileNo(garageName);
		}
		if (garage.isPresent() && passwordEncoder.matches(password, garage.get().getPassword())) {
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
	public String deleteGarage(String garagename) throws GarageExceptions {
		Garage garage = garageRepository.findByEmail(garagename).orElse(null);
		String message = "Account deleted successfully";
		if (garage == null) {
			garage = garageRepository.findByMobileNo(garagename).orElseThrow(() -> new GarageExceptions("garage not found"));
		}

		garageRepository.delete(garage);
		return message;

	}

	@Override
	public String updatePassword(String garagename, UpdatePasswordDto updatePasswordDto) throws GarageExceptions {

		Garage garage = garageRepository.findByEmail(garagename).orElse(null);
		String message = "Password updated successfully";
		if (garage == null) {
			garage = garageRepository.findByMobileNo(garagename).orElse(null);
			if (garage == null)
				throw new GarageExceptions("garage not found");
		}

		if (!passwordEncoder.matches(updatePasswordDto.getCurrentPassword(), garage.getPassword())) {
			throw new GarageExceptions("Current password is incorrect");
		}

		garage.setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
		garageRepository.save(garage);

		return message;
	}

	@Override
	public String updateGarageDetails(String username, GarageUpdateDto garageUpdateDto) throws GarageExceptions {
		Garage garage = garageRepository.findByEmail(username).orElse(null);
		String message = "Details updated successfully";
		if (garage == null) {
			garage = garageRepository.findByMobileNo(username).orElse(null);
			if (garage == null)
				throw new GarageExceptions("garage not found");
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
			Address address = garage.getAddress();

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

			garage.setAddress(address);
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
	public Optional<Garage> forgotPassword(ForgotPasswordDto forgotPasswordDto) throws GarageExceptions {
		Optional<Garage> garageOptional = garageRepository.findByEmail(forgotPasswordDto.getUsername());

		if (!garageOptional.isPresent()) {
			garageOptional = garageRepository.findByMobileNo(forgotPasswordDto.getUsername());
			if (!garageOptional.isPresent())
				throw new GarageExceptions("garage not found");
		}
		Garage garage = garageOptional.get();
		if (!forgotPasswordDto.getNewPassword().equals(forgotPasswordDto.getConfirmPassword())) {
			throw new GarageExceptions("Password is incorrect");
		}

		garage.setPassword(passwordEncoder.encode(forgotPasswordDto.getNewPassword()));

		garageRepository.save(garage);

		return garageOptional;

	}

	@Override
	public List<GarageDto> getAllGarages() {
		List<Garage> garages = garageRepository.findAll();
		return garages.stream().map(garage -> modelMapper.map(garage, GarageDto.class)).collect(Collectors.toList());

	}

	@Override
	public List<GarageDto> getAllGaragesForUser() {
		List<Garage> garages = garageRepository.findAll();
		return garages.stream().map(garage -> modelMapper.map(garage, GarageDto.class))
				.collect(Collectors.toList());

	}

	public List<Garage> getNearbyGarages(double latitude, double longitude, double radiusInKm) {
		double radiusInMeters = radiusInKm * 1000;
		return garageRepository.findNearbyGarages(latitude, longitude, radiusInMeters);
	}

	public void deleteGarageById(Long id) throws GarageExceptions {
		if (garageRepository.existsById(id)) {
			garageRepository.deleteById(id);
		} else {
			throw new GarageExceptions("Garage not found with id: " + id);
		}
	}

	@Override
	public List<Services> getServices() {
		Services[] services = Services.values();
		return Arrays.asList(services);
	}

}
