package com.app.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.BookingDto;
import com.app.service.BookingServiceImpl;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
	 @Autowired
	    private BookingServiceImpl bookingService;

	    @PostMapping("/create")
	    public BookingDto createBooking(@RequestBody @Valid BookingDto bookingDTO) {
	        return bookingService.createBooking(bookingDTO);
	    }

	    @PutMapping("/{id}/confirm")
	    public ResponseEntity<ApiResponse<BookingDto>> confirmBooking(@PathVariable @NotNull Long id) {
	    	BookingDto bookingDto=bookingService.confirmBooking(id);
	    	ApiResponse<BookingDto> response = new ApiResponse<>(HttpStatus.OK, "Garage Booking Confirmed Successfully", bookingDto);
			return ResponseEntity.ok(response);

	    }
}
