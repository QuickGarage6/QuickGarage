package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {
	private String streetAddress;
	private String city;
	private String state;
	private String country;
	private String zipCode;
}
