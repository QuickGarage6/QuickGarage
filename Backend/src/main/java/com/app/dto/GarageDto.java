package com.app.dto;

import com.app.entities.Services;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GarageDto {
	private String ownerName;

	private String garageName;

	private String mobileNo;

	private String email;

	private Services serviceType;

	private AddressDto addressDto;

	private int licenseNumber;

	private int yrsOfOperation;
	
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private double longitude;

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private double latitude;
}
