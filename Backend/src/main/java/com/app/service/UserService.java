package com.app.service;

import java.util.Optional;

import com.app.entities.User;

public interface UserService {

	public User signUp(User user) throws Exception;

	public String signIn(String userName, String password);

	public Optional<User> getUserByEmail(String email);

	public Optional<User> getUserByMobile(String mobile);

}
