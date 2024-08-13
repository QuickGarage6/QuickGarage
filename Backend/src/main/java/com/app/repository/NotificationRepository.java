package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	Notification findTopByGarageIdAndIsReadAndIsBookingConfirmationRequestedOrderByCreatedDateDesc(Long garageId,
			boolean isRead, boolean isBookingConfirmationRequested);

	List<Notification> findByGarageId(Long garageId);
}
