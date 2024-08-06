package com.app.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserSignInDto;
import com.app.dto.UserSignUpDto;
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
	public ResponseEntity<String> signIn(@RequestBody UserSignInDto userSignInDto) {
		String message = userService.signIn(userSignInDto.getUserName(), userSignInDto.getPassword());
		if (message.equals("User login successful")) {
			return ResponseEntity.ok(message);
		} else {
			return ResponseEntity.status(401).body(message);
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
}