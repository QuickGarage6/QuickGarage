package com.app.controller;

import java.util.Optional;

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

import com.app.dto.ForgotPasswordDto;
import com.app.dto.UpdatePasswordDto;
import com.app.dto.UserSignInDto;
import com.app.dto.UserSignUpDto;
import com.app.entities.User;
import com.app.entities.User;
import com.app.service.UserServiceImpl;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/signup")
	public ResponseEntity<User> signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {

		// Convert DTO to Entity
		User user = modelMapper.map(userSignUpDto, User.class);

		User newUser = userService.signUp(user);
		return ResponseEntity.ok(newUser);
	}

	@PostMapping("/signin")
	public ResponseEntity<User> signIn(@RequestBody UserSignInDto userSignInDto) {
		Optional<User> userOptional = userService.signIn(userSignInDto.getUserName(), userSignInDto.getPassword());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			return ResponseEntity.ok(user); // Return user data with status 200 OK
		} else {
			return ResponseEntity.status(401).build();
		}
	}

	@GetMapping("/email")
	public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
		return userService.getUserByEmail(email).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/mobile")
	public ResponseEntity<User> getUserByMobile(@RequestParam String mobile) {
		return userService.getUserByMobile(mobile).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/{username}/update-password")
	public ResponseEntity<String> updatePassword(@PathVariable String username,
			@RequestBody UpdatePasswordDto updatePasswordDto) {
		try {

			userService.updatePassword(username, updatePasswordDto);
			return ResponseEntity.ok("Password updated successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@DeleteMapping("/{username}/delete")
	public ResponseEntity<String> deleteUser(@PathVariable String username) {
		try {
			String message = userService.deleteUser(username);
			return ResponseEntity.ok(message);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}

	@PutMapping("/forget-password")
	public ResponseEntity<User> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
		try {

			Optional<User> userOptional = userService.forgotPassword(forgotPasswordDto);

			User user = userOptional.get();
			return ResponseEntity.ok(user); // Return user data with status 200 OK

		} catch (Exception e) {
			return ResponseEntity.status(401).build();
		}
	}
}