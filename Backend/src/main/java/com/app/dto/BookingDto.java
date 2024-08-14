package com.app.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class BookingDto {
	

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	private Long userId;
	private Long garageId;
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private LocalDate bookingDate;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private boolean isConfirmed;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getGarageId() {
		return garageId;
	}

	public void setGarageId(Long garageId) {
		this.garageId = garageId;
	}

	public LocalDate getBookingDate() {
		return bookingDate.now();
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}
}
