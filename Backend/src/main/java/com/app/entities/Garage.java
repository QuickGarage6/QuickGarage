package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.app.dto.AddressDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "garage")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Garage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 30)
	@NotBlank(message = "Owner Name is mandatory")
	@NotNull
	private String ownerName;

	@Column(length = 30)
	@NotBlank(message = "Garage Name is mandatory")
	@NotNull
	private String garageName;

	@Column(length = 15)
	@NotNull
	@NotBlank(message = "Mobile number is mandatory")
	@Size(min = 10, max = 10, message = "Mobile number must be 10 digits")
	private String mobileNo;
	
	@Column(length = 30, unique = true)
	@Email(message = "Email should be valid")
	private String email;
	
	@Enumerated(EnumType.STRING)
	private Services serviceType;
    
	@OneToOne(cascade = CascadeType.ALL,orphanRemoval = true) 
	@JoinColumn(name = "address_id")
	@NotNull
	private Address address;
	
	@Column(length = 20)
	@NotNull
	private int licenseNumber;
	
	@Column(length = 20)
	@NotNull
	private int yrsOfOperation;
	
	@Column(length = 20)
	@NotBlank(message = "Password is mandatory")
	@NotNull
	@Size(min = 6, message = "Password must be atleast 6 characters ")
	private String password;
	
	@Transient
	@JsonIgnore
	private String confirmPassword;
	
}
