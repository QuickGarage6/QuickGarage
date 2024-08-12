package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.GarageDto;
import com.app.dto.UserDto;
import com.app.service.GarageService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private GarageService garageService;

	@Autowired
	private UserService userService;

	@GetMapping("/garages")
	public List<GarageDto> getAllGarages() {
		return garageService.getAllGarages();
	}

	@GetMapping("/users")
	public List<UserDto> getAllUsers() {
		return userService.getAllUsers();
	}

}
