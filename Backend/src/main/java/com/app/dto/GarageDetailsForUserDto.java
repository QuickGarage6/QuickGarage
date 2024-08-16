package com.app.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.app.entities.Services;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GarageDetailsForUserDto {

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

	@Enumerated(EnumType.STRING)
	private Services serviceType;

	@NotNull
	private int yrsOfOperation;

	@NotNull
	private GarageAddressForUserDto addressForUserDto;

}
