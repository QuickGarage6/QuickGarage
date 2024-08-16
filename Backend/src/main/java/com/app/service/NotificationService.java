package com.app.service;

import java.util.List;

import com.app.dto.NotificationDto;

public interface NotificationService {

	public NotificationDto createNotification(NotificationDto notificationDTO);

	public List<NotificationDto> getNotifications(Long garageId);
}
