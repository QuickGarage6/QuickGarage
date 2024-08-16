package com.app.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.BookingDto;
import com.app.entities.Booking;
import com.app.entities.Notification;
import com.app.repository.BookingRepository;
import com.app.repository.NotificationRepository;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public BookingDto createBooking(BookingDto bookingDTO) {
        Booking booking = new Booking(
            bookingDTO.getUserId(),
            bookingDTO.getGarageId(),
            bookingDTO.getBookingDate()
        );
        booking = bookingRepository.save(booking);
        
        // Create and save notification for the garage owner
        Notification notification = new Notification();
        notification.setGarageId(bookingDTO.getGarageId());
        notification.setUserId(bookingDTO.getUserId());
        notification.setMessage("New booking request from user ID " + bookingDTO.getUserId());
        notification.setCreatedDate(LocalDate.now());
        notification.setRead(false);
        notification.setBookingConfirmationRequested(true);
        notificationRepository.save(notification);

        bookingDTO.setId(booking.getId());
        return bookingDTO;
    }

    public BookingDto confirmBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setConfirmed(true);
        bookingRepository.save(booking);

        // Update notification status
        Notification notification = notificationRepository.findTopByGarageIdAndIsReadAndIsBookingConfirmationRequestedOrderByCreatedDateDesc(
            booking.getGarageId(), false, true
        );
        if (notification != null) {
            notification.setRead(true);
            notification.setBookingConfirmationRequested(false);
            notificationRepository.save(notification);
        }
        
        return new BookingDto(booking.getId(), booking.getUserId(), booking.getGarageId(), booking.getBookingDate(),true);
    }
}
