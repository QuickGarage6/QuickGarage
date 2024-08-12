package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.ForgotPasswordDto;
import com.app.dto.UpdatePasswordDto;
import com.app.dto.UserDto;
import com.app.entities.Garage;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	
	@Autowired
	private ModelMapper modelMapper;

	public User signUp(User user) throws Exception {
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new Exception("Email already in use");
		}
		if (userRepository.findByMobileNo(user.getMobileNo()).isPresent()) {
			throw new Exception("Mobile number already in use");
		}

		if (!user.getConfirmPassword().equals(user.getPassword())) {
			throw new Exception("Password do not match");
		}
		return userRepository.save(user);
	}

	public Optional<User> signIn(String username, String password) {
		Optional<User> user = userRepository.findByEmail(username);
		// String message = "User not found";
		if (!user.isPresent()) {
			user = userRepository.findByMobileNo(username);
		}
		if (user.isPresent() && password.equals(user.get().getPassword())) {
			// message = "User login successful";
			// return message;
			return user;
		}
		return Optional.empty();
	}

	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public Optional<User> getUserByMobile(String mobile) {
		return userRepository.findByMobileNo(mobile);
	}

	@Override
	public String updatePassword(String username, UpdatePasswordDto updatePasswordDto) throws Exception {

		User user = userRepository.findByEmail(username).orElse(null);
		String message = "Password updated successfully";
		if (user == null) {
			user = userRepository.findByMobileNo(username).orElse(null);
			if (user == null)
				throw new Exception("User not found");
		}

		if (!updatePasswordDto.getCurrentPassword().equals(user.getPassword())) {
			throw new Exception("Current password is incorrect");
		}

		user.setPassword(updatePasswordDto.getNewPassword());
		userRepository.save(user);

		return message;
	}

	@Override
	public String deleteUser(String username) throws Exception {
		User user = userRepository.findByEmail(username).orElse(null);
		String message = "Account deleted successfully";
		if (user == null) {
			user = userRepository.findByMobileNo(username).orElseThrow(() -> new Exception("User not found"));
		}

		userRepository.deleteUser(username);
		return message;
	}

	@Override
	public Optional<User> forgotPassword(ForgotPasswordDto forgotPasswordDto) throws Exception {
		Optional<User> userOptional = userRepository.findByEmail(forgotPasswordDto.getUsername());
		// String message = "Details updated successfully";
		if (!userOptional.isPresent()) {
			userOptional = userRepository.findByMobileNo(forgotPasswordDto.getUsername());
			if (!userOptional.isPresent())
				throw new Exception("user not found");
		}
		User user = userOptional.get();
		if (!forgotPasswordDto.getNewPassword().equals(forgotPasswordDto.getConfirmPassword())) {
			throw new Exception("Password is incorrect");
		}
		user.setPassword(forgotPasswordDto.getNewPassword());
		userRepository.save(user);

		return userOptional;

	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
	}
	
	
	
	
}
