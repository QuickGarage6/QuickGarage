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
public class GarageUpdateDto extends GarageBaseDto{


	@Enumerated(EnumType.STRING)
    private Services serviceType;

	@NotNull
	private AddressDto addressDto;

	@NotNull
	private int licenseNumber;

	@NotNull
	private int yrsOfOperation;

}
