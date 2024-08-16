package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.UserExceptions;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.UpdatePasswordDto;
import com.app.dto.UserDto;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User signUp(User user) throws UserExceptions {
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new UserExceptions("Email already in use");
		}
		if (userRepository.findByMobileNo(user.getMobileNo()).isPresent()) {
			throw new UserExceptions("Mobile number already in use");
		}

		if (!user.getConfirmPassword().equals(user.getPassword())) {
			throw new UserExceptions("Password do not match");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		return userRepository.save(user);
	}

	public Optional<User> signIn(String username, String password) {
		Optional<User> user = userRepository.findByEmail(username);
		if (!user.isPresent()) {
			user = userRepository.findByMobileNo(username);
		}

		if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
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
	public String updatePassword(String username, UpdatePasswordDto updatePasswordDto) throws UserExceptions {

		User user = userRepository.findByEmail(username).orElse(null);
		String message = "Password updated successfully";
		if (user == null) {
			user = userRepository.findByMobileNo(username).orElse(null);
			if (user == null)
				throw new UserExceptions("User not found");
		}

		if (!passwordEncoder.matches(updatePasswordDto.getCurrentPassword(), user.getPassword())) {
			throw new UserExceptions("Current password is incorrect");
		}

		user.setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
		userRepository.save(user);

		return message;
	}

	@Override
	public String deleteUser(String username) throws UserExceptions {
		User user = userRepository.findByEmail(username).orElse(null);
		String message = "Account deleted successfully";
		if (user == null) {
			user = userRepository.findByMobileNo(username).orElseThrow(() -> new UserExceptions("User not found"));
		}

		userRepository.deleteUser(username);
		return message;
	}

	@Override
	public Optional<User> forgotPassword(ForgotPasswordDto forgotPasswordDto) throws UserExceptions {
		Optional<User> userOptional = userRepository.findByEmail(forgotPasswordDto.getUsername());

		if (!userOptional.isPresent()) {
			userOptional = userRepository.findByMobileNo(forgotPasswordDto.getUsername());
			if (!userOptional.isPresent())
				throw new UserExceptions("user not found");
		}
		User user = userOptional.get();
		if (!forgotPasswordDto.getNewPassword().equals(forgotPasswordDto.getConfirmPassword())) {
			throw new UserExceptions("Password is incorrect");
		}

		user.setPassword(passwordEncoder.encode(forgotPasswordDto.getNewPassword()));
		userRepository.save(user);

		return userOptional;

	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
	}

	public void deleteUserById(Long id) throws UserExceptions {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
		} else {
			throw new UserExceptions("User not found with id: " + id);
		}
	}

	@Override
	public Optional<User> getUserById(Long id) {
		return userRepository.findById(id);

	}

}
