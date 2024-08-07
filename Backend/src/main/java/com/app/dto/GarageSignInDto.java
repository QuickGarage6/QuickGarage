package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GarageSignInDto {
	private String userName; // Can be email or mobile
	private String password;
}
