package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
		return userRepository.save(user);
	}

	public Optional<User> signInByEmail(String userName, String password) {
		Optional<User> user = userRepository.findByEmail(userName);
		
		if (user.isPresent() && password.equals(user.get().getPassword())) {
			return user;
		}
		return Optional.empty();
	}
	public Optional<User> signInByMobileNo(String userName, String password) {
		Optional<User> user = userRepository.findByMobileNo(userName);
		
		if (user.isPresent() && password.equals(user.get().getPassword())) {
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
}
