package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpDto {

	@NotBlank(message = "Name is mandatory")
	private String name;
	
	@NotBlank(message = "Mobile number is mandatory")
	@Size(min = 10, max = 10, message = "Mobile number must be 10 digits")
	private String mobileNo;
	
	@Email(message = "Email should be valid")
	private String email;
	
	@NotBlank(message = "Password is mandatory")
	@NotNull
	@Size(min = 6, message = "Password must be atleast 6 characters ")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String confirmPassword;

}
