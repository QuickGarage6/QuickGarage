package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	Notification findTopByGarageIdAndIsReadAndIsBookingConfirmationRequestedOrderByCreatedDateDesc(Long garageId,
			boolean hasRead, boolean hasBookingConfirmationRequested);
}
