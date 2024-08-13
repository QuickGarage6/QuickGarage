package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.NotificationDto;
import com.app.entities.Notification;
import com.app.repository.NotificationRepository;

@Service
public class NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	public NotificationDto createNotification(NotificationDto notificationDTO) {
		Notification notification = new Notification();
		notification.setGarageId(notificationDTO.getGarageId());
		notification.setMessage("User" + notificationDTO.getUserId() + " has booked a service at your garage");
		notification.setCreatedDate(notificationDTO.getCreatedDate());
		notification.setRead(notificationDTO.isRead());
		notification.setBookingConfirmationRequested(notificationDTO.isBookingConfirmationRequested());
		notification = notificationRepository.save(notification);

		return notificationDTO;
	}

    public List<NotificationDto> getNotifications(Long garageId) {
        List<Notification>notifications= notificationRepository.findByGarageId(garageId);
        return notifications.stream().map(notification -> modelMapper.map(notification, NotificationDto.class)).collect(Collectors.toList());
//        return new NotificationDto(
//            notification.getId(),
//            notification.getGarageId(),
//            notification.getUserId(),
//            notification.getMessage(),
//            notification.getCreatedDate(),
//            notification.isRead(),
//            notification.isBookingConfirmationRequested()
//        );
    }
//	public List<Notification> getNotificationsForGarage(Long garageId, boolean isRead) {
//		Garage garage = garageRepository.findById(garageId)
//				.orElseThrow(() -> new ResourceNotFoundException("Garage not found with id: " + garageId));
//		return notificationRepository.findByGarageAndIsRead(garage, isRead);
//	}
}
