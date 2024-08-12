package com.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NotificationDto {
	 private Long id;
	    private Long garageId;
	    private String message;
	    private LocalDateTime createdDate;
	    private boolean isRead;
	    private boolean isBookingConfirmationRequested;
    
    public NotificationDto() {}
}
