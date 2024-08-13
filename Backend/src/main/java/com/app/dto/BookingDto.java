package com.app.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class BookingDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
    private Long userId;
    private Long garageId;
    private LocalDateTime bookingDateTime;
    private boolean isConfirmed;

}

