package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 20)
	@NotBlank(message = "First Name is mandatory")
	private String firstName;
	@Column(length = 20)
	@NotBlank(message = "Last Name is mandatory")
	private String lastName;
	@Column(length = 15)
	@NotBlank(message = "Mobile number is mandatory")
	@Size(min = 10, max = 10, message = "Mobile number must be 10 digits")
	private String mobileNo;
	@Column(length = 20, unique = true)
	@Email(message = "Email should be valid")
	private String email;
	@Column(length = 20)
	@NotBlank(message = "Password is mandatory")
	@NotNull
	@Size(min = 6, message = "Password must be atleast 6 characters ")
	private String password;
	@Column(length = 20)
	@NotBlank(message = "Password is mandatory")
	@NotNull
	@Size(min = 6, message = "Password must be atleast 6 characters ")
	private String confirmPassword;

}
