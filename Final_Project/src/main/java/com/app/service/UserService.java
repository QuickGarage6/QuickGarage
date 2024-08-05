package com.app.service;

import java.util.Optional;

import com.app.entities.User;

public interface UserService {

	public User signUp(User user) throws Exception;

	public Optional<User> signInByEmail(String userName, String password);

	public Optional<User> signInByMobileNo(String userName, String password);

	public Optional<User> getUserByEmail(String email);

	public Optional<User> getUserByMobile(String mobile);

}
