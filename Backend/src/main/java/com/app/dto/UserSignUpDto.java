package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpDto {

	private String firstName;
	private String lastName;
	private String mobileNo;
	private String email;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String confirmPassword;
	private double longitude;
	private double latitude;

}
