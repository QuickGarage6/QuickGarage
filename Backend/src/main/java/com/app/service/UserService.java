package com.app.service;

import java.util.Optional;

import com.app.dto.UpdatePasswordDto;
import com.app.entities.User;

public interface UserService {

	public User signUp(User user) throws Exception;

	public Optional<User> signIn(String userName, String password);

	public Optional<User> getUserByEmail(String email);

	public Optional<User> getUserByMobile(String mobile);

	public String updatePassword(String username,UpdatePasswordDto updatePasswordDto) throws Exception;
	
	public String deleteUser(String username) throws Exception;
}
