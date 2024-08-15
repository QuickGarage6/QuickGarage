package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.ForgotPasswordDto;
import com.app.dto.UpdatePasswordDto;
import com.app.dto.UserDto;
import com.app.entities.User;

public interface UserService {

	public User signUp(User user) throws Exception;

	public Optional<User> signIn(String userName, String password);

	public Optional<User> getUserByEmail(String email);

	public Optional<User> getUserById(Long id);

	public Optional<User> getUserByMobile(String mobile);

	public String updatePassword(String username, UpdatePasswordDto updatePasswordDto) throws Exception;

	public String deleteUser(String username) throws Exception;

	public Optional<User> forgotPassword(ForgotPasswordDto forgotPasswordDto) throws Exception;

	public List<UserDto> getAllUsers();

	public void deleteUserById(Long id) throws Exception;

}
