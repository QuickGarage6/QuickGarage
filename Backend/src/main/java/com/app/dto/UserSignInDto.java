package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserSignInDto {

	@NotBlank(message = "User Name is mandatory")
	private String userName; // Can be email or mobile
	
	@NotBlank(message = "Password is mandatory")
	@NotNull
	@Size(min = 6, message = "Password must be atleast 6 characters ")
	private String password;
}