package com.app.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long userId;
	private Long garageId;
	private LocalDateTime bookingDateTime;
	private boolean isConfirmed=false;

	@ManyToOne
	@JoinColumn(name = "userId", insertable = false, updatable = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "garageId", insertable = false, updatable = false)
	private Garage garage;

	public Booking(Long userId, Long garageId, LocalDateTime bookingDateTime) {
		this.userId = userId;
		this.garageId = garageId;
		this.bookingDateTime = bookingDateTime;
	}
	
}
