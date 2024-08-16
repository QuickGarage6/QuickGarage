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
import com.app.dto.GarageDetailsForUserDto;
import com.app.dto.UpdatePasswordDto;
import com.app.dto.UserSignInDto;
import com.app.dto.UserSignUpDto;
import com.app.entities.User;
import com.app.service.GarageServiceImpl;
import com.app.service.UserServiceImpl;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private GarageServiceImpl garageService;

	@Autowired
	private ModelMapper modelMapper;

	
    
	@PostMapping("/signup")
	public ResponseEntity<ApiResponse<User>> signUp( @RequestBody @Valid UserSignUpDto userSignUpDto) throws Exception {

		
		User user = modelMapper.map(userSignUpDto, User.class);

		User newUser = userService.signUp(user);
		ApiResponse<User> response = new ApiResponse<>(HttpStatus.OK, "User Registered successfully", newUser);
        return ResponseEntity.ok(response);
	}

	@PostMapping("/signin")
	public ResponseEntity<ApiResponse<User>> signIn( @RequestBody @Valid UserSignInDto userSignInDto) {
		Optional<User> userOptional = userService.signIn(userSignInDto.getUserName(), userSignInDto.getPassword());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			ApiResponse<User> response = new ApiResponse<>(HttpStatus.OK, "User signIn successfully", user);
			return ResponseEntity.ok(response); // Return user data with status 200 OK
		} else {
			return ResponseEntity.status(401).body(new ApiResponse(HttpStatus.UNAUTHORIZED, "User login failed"));
		}
	}

	@GetMapping("/email")
	public ResponseEntity<User> getUserByEmail(@RequestParam @NotNull  String email) {
		return userService.getUserByEmail(email).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/mobile")
	public ResponseEntity<User> getUserByMobile(@RequestParam @NotNull String mobile) {
		return userService.getUserByMobile(mobile).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@RequestParam @NotNull Long id) {
		return userService.getUserById(id).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/{username}/update-password")
	public ResponseEntity<String> updatePassword(@PathVariable @NotNull String username,
			@RequestBody @Valid UpdatePasswordDto updatePasswordDto) {
		try {

			userService.updatePassword(username, updatePasswordDto);
			return ResponseEntity.ok("Password updated successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@DeleteMapping("/{username}/delete")
	public ResponseEntity<String> deleteUser(@PathVariable @NotNull String username) {
		try {
			String message = userService.deleteUser(username);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}

	@PutMapping("/forget-password")
	public ResponseEntity<ApiResponse<User>> forgotPassword(@Valid @RequestBody ForgotPasswordDto forgotPasswordDto) {
		try {

			Optional<User> userOptional = userService.forgotPassword(forgotPasswordDto);

			User user = userOptional.get();
			ApiResponse<User> response = new ApiResponse<>(HttpStatus.OK, "Password updated successfully", user);
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			return ResponseEntity.status(401).body(new ApiResponse(HttpStatus.UNAUTHORIZED, "Please try again"));
		}
	}

	@GetMapping("/garages")
	public List<GarageDetailsForUserDto> getAllGaragesForUser() {
		return garageService.getAllGaragesForUser();
	}
	

}