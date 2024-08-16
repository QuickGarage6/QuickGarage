package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GarageBaseDto {

	@NotBlank(message = "Owner Name is mandatory")
	@NotNull
	private String ownerName;

	@NotBlank(message = "Garage Name is mandatory")
	@NotNull
	private String garageName;

	@NotNull
	@NotBlank(message = "Mobile number is mandatory")
	@Size(min = 10, max = 10, message = "Mobile number must be 10 digits")
	private String mobileNo;

	@Email(message = "Email should be valid")
	private String email;
}
