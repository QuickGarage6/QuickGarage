package com.app;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.app.dto.AddressDto;
import com.app.dto.GarageAddressForUserDto;
import com.app.dto.GarageDetailsForUserDto;
import com.app.dto.GarageDto;
import com.app.entities.Address;
import com.app.entities.Garage;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean 
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)
				.setPropertyCondition(Conditions.isNotNull());

		// Map nested Address to AddressDto
		modelMapper.addMappings(new PropertyMap<Garage, GarageDto>() {
			@Override
			protected void configure() {
				map(source.getAddress(), destination.getAddressDto());
			}
		});
		
		

		// Map Address fields to AddressDto
		modelMapper.addMappings(new PropertyMap<Address, AddressDto>() {
			@Override
			protected void configure() {
				map().setStreetAddress(source.getStreetAddress());
				map().setCity(source.getCity());
				map().setState(source.getState());
				map().setCountry(source.getCountry());
				map().setZipCode(source.getZipCode());
			}
		});
		
		// Map nested Address to AddressForUserDto
				modelMapper.addMappings(new PropertyMap<Garage, GarageDetailsForUserDto>() {
					@Override
					protected void configure() {
						map(source.getAddress(), destination.getAddressForUserDto());
					}
				});
		
		// Map Address fields to AddressForUserDto
		modelMapper.addMappings(new PropertyMap<Address, GarageAddressForUserDto>() {
			@Override
			protected void configure() {
				map().setStreetAddress(source.getStreetAddress());
				map().setCity(source.getCity());

			}
		});
		

		return modelMapper;
	}

}
