package com.app.service;

import java.util.Optional;

import com.app.dto.GarageUpdateDto;
import com.app.dto.UpdatePasswordDto;
import com.app.entities.Garage;

public interface GarageService {

	public Garage signUp(Garage garage) throws Exception;

	public Optional<Garage> signIn(String userName, String password);

	public Optional<Garage> getGarageByEmail(String email);

	public Optional<Garage> getGarageByMobile(String mobile);

	public String deleteGarage(String username) throws Exception;

	public String updatePassword(String username, UpdatePasswordDto updatePasswordDto) throws Exception;

	public String updateGarageDetails(String username, GarageUpdateDto garageUpdateDto) throws Exception;
}
