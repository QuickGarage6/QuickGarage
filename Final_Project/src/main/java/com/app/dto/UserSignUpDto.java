package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpDto {
	
    private String name;
    private String mobile;
    private String email;
    private String password;

    
}
