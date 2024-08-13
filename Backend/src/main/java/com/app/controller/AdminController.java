package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.GarageDto;
import com.app.dto.UserDto;
import com.app.service.GarageServiceImpl;
import com.app.service.UserServiceImpl;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private GarageServiceImpl garageService;

	@Autowired
	private UserServiceImpl userService;

	@GetMapping("/garages")
	public List<GarageDto> getAllGarages() {
		return garageService.getAllGarages();
	}

	@GetMapping("/users")
	public List<UserDto> getAllUsers() {
		return userService.getAllUsers();
	}

	 @DeleteMapping("/users/{id}")
	    public ResponseEntity<String> deleteUser(@PathVariable Long id) throws Exception {
	        userService.deleteUserById(id);
	        return ResponseEntity.ok("User deleted successfully.");
	    }
	 
	 @DeleteMapping("/garage/{id}")
	    public ResponseEntity<String> deleteGarage(@PathVariable Long id) throws Exception{
	        garageService.deleteGarageById(id);
	        return ResponseEntity.ok("Garage deleted successfully.");
	    }
	 
	 
}
