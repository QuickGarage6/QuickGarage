package com.app.dto;

import com.app.entities.Services;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GarageDetailsForUserDto {
	
	private String ownerName;

	private String garageName;

	private String mobileNo;

	private Services serviceType;
	
	private GarageAddressForUserDto addressForUserDto;
	
	private int yrsOfOperation;
}
