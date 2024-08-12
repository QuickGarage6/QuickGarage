package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingDto;
import com.app.service.BookingService;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
	 @Autowired
	    private BookingService bookingService;

	    @PostMapping
	    public BookingDto createBooking(@RequestBody BookingDto bookingDTO) {
	        return bookingService.createBooking(bookingDTO);
	    }

	    @PutMapping("/{id}/confirm")
	    public BookingDto confirmBooking(@PathVariable Long id) {
	        return bookingService.confirmBooking(id);
	    }
}
