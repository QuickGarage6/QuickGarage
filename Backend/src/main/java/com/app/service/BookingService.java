package com.app.service;

import com.app.dto.BookingDto;

public interface BookingService {

	public BookingDto createBooking(BookingDto bookingDTO);

	public BookingDto confirmBooking(Long bookingId);

}
