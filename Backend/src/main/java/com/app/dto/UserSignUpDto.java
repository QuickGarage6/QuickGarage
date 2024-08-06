package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpDto {

	private String firstName;
	private String lastName;
	private String mobileNo;
	private String email;
	private String password;
	private String confirmPassword;

}
