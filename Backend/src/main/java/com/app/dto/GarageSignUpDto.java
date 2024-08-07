package com.app.dto;

import com.app.entities.Address;
import com.app.entities.Services;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GarageSignUpDto {

	private String ownerName;

	private String garageName;

	private String mobileNo;

	private String email;

	private Services serviceType;

	private AddressDto addressDto;

	private int licenseNumber;

	private int yrsOfOperation;

	private String password;

	private String confirmPassword;
}
