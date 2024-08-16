package com.app.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NotificationDto {
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private Long id;
	
	private Long garageId;
	private Long userId;
	private String message;
	private LocalDate createdDate;
	private boolean isRead;
	private boolean isBookingConfirmationRequested;

	public NotificationDto() {
	}
}
