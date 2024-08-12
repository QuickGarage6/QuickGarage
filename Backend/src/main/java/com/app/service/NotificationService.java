package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.NotificationDto;
import com.app.entities.Notification;
import com.app.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public NotificationDto createNotification(NotificationDto notificationDTO) {
        Notification notification = new Notification();
        notification.setGarageId(notificationDTO.getGarageId());
        notification.setMessage(notificationDTO.getMessage());
        notification.setCreatedDate(notificationDTO.getCreatedDate());
        notification.setRead(notificationDTO.isRead());
        notification.setBookingConfirmationRequested(notificationDTO.isBookingConfirmationRequested());
        notification = notificationRepository.save(notification);

        notificationDTO.setId(notification.getId());
        return notificationDTO;
    }

    public NotificationDto getNotification(Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
        return new NotificationDto(
            notification.getId(),
            notification.getGarageId(),
            notification.getMessage(),
            notification.getCreatedDate(),
            notification.isRead(),
            notification.isBookingConfirmationRequested()
        );
    }
}
