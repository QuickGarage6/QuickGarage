package com.app.service;

import java.util.Optional;

import com.app.entities.Garage;

public interface GarageService {

	public Garage signUp(Garage garage) throws Exception;

	public String signIn(String userName, String password);

	public Optional<Garage> getGarageByEmail(String email);

	public Optional<Garage> getGarageByMobile(String mobile);
	
}
