package com.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class BookingDto {
	private Long id;
    private Long userId;
    private Long garageId;
    private LocalDateTime bookingDateTime;
    private boolean isConfirmed;

}

