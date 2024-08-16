package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "street_address", length = 50)
	@NotBlank(message = "Street Address is mandatory")
	@NotNull
	private String streetAddress;
	
	@Column(length = 20)
	@NotNull
	@NotBlank(message = "City is mandatory")
	private String city;
	
	@Column(length = 20)
	@NotNull
	@NotBlank(message = "State is mandatory")
	private String state;
	
	@Column(length = 20)
	@NotNull
	@NotBlank(message = "Country is mandatory")
	private String country;
	
	@Column(length = 20, name = "zip_code")
	@NotNull
	@NotBlank(message = "Zip code is mandatory")
	private String zipCode;

}
