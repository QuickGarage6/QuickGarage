package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GarageAddressForUserDto {
    
	@NotBlank(message = "Street Address is mandatory")
	@NotNull
	private String streetAddress;
	
	@NotNull
	@NotBlank(message = "City is mandatory")
	private String city;
}
