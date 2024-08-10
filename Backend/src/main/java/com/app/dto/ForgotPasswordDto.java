package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordDto {

	private String Username;
	private String newPassword;
	private String confirmPassword;
}
