package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.UpdatePasswordDto;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

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

	public String signIn(String userName, String password) {
		Optional<User> user = userRepository.findByEmail(userName);
		String message = "User not found";
		if (!user.isPresent()) {
			user = userRepository.findByMobileNo(userName);
		}
		if (user.isPresent() && password.equals(user.get().getPassword())) {
			message = "User login successful";
			return message;
		}
		return message;
	}

	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public Optional<User> getUserByMobile(String mobile) {
		return userRepository.findByMobileNo(mobile);
	}

	@Override
	public String updatePassword(String userName, UpdatePasswordDto updatePasswordDto) throws Exception {
		User user = userRepository.findByEmail(userName).orElseThrow();
		String message = "Password updated successfully";
		if (user != null) {
			user = userRepository.findByMobileNo(userName).orElseThrow();
		}
		if (!updatePasswordDto.getCurrentPassword().equals(user.getPassword())) {
			throw new Exception("Current password is incorrect");
		}

		user.setPassword(updatePasswordDto.getNewPassword());
		userRepository.save(user);

		return message;
	}
}
