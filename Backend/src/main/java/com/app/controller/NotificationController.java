package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.NotificationDto;
import com.app.service.NotificationService;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {
	@Autowired
    private NotificationService notificationService;

    @PostMapping
    public NotificationDto createNotification(@RequestBody NotificationDto notificationDTO) {
        return notificationService.createNotification(notificationDTO);
    }

    @GetMapping("/{id}")
    public NotificationDto getNotification(@PathVariable Long id) {
        return notificationService.getNotification(id);
    }
}
