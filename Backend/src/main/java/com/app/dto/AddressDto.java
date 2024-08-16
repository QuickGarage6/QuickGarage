package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {
	@NotBlank(message = "Street Address is mandatory")
	@NotNull
	private String streetAddress;
	
	@NotBlank(message = "City is mandatory")
	@NotNull
	private String city;
	
	@NotBlank(message = "State is mandatory")
	@NotNull
	private String state;
	
	@NotBlank(message = "Country is mandatory")
	@NotNull
	private String country;
	
	@NotBlank(message = "Zipcode is mandatory")
	@NotNull
	private String zipCode;
}
