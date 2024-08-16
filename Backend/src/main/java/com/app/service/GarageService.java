package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.custom_exceptions.GarageExceptions;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.GarageDetailsForUserDto;
import com.app.dto.GarageDto;
import com.app.dto.GarageUpdateDto;
import com.app.dto.UpdatePasswordDto;
import com.app.entities.Garage;
import com.app.entities.Services;

public interface GarageService {

	public Garage signUp(Garage garage) throws GarageExceptions;

	public Optional<Garage> signIn(String userName, String password);

	public Optional<Garage> getGarageByEmail(String email);

	public Optional<Garage> getGarageByMobile(String mobile);

	public String deleteGarage(String username) throws GarageExceptions;

	public String updatePassword(String username, UpdatePasswordDto updatePasswordDto) throws GarageExceptions;

	public String updateGarageDetails(String username, GarageUpdateDto garageUpdateDto) throws GarageExceptions;

	public Optional<Garage> forgotPassword(ForgotPasswordDto forgotPasswordDto) throws GarageExceptions;

	public List<GarageDto> getAllGarages();

	public List<GarageDetailsForUserDto> getAllGaragesForUser();
	
	public List<Garage> getNearbyGarages(double latitude, double longitude, double radiusInKm);
	
	public void deleteGarageById(Long id) throws GarageExceptions;
	
	public List<Services> getServices();

}
