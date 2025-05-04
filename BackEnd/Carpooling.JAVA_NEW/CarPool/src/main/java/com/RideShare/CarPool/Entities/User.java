package com.RideShare.CarPool.Entities;

import java.sql.Date;

import org.hibernate.annotations.GeneratorType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
	
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		int uid;
		
		@Column(name = "Name", nullable = true)
		String name;
		
		@Column(name = "Contactno")
		String contactno;
		
		@Column(name = "Email")
		String email;
		
		@Column(name = "gender")
		String gender;
		
		@Column(name = "dob")
		Date dob;
		
		@Column(name = "Password")
		String password;
		
		@Column(name = "Address")
		String address;
		
		
		@JsonIgnoreProperties({"uid","users"})
		@ManyToOne
		@JoinColumn(name = "rid")  // Foreign key referencing Role
		Role role; 	


	
	
	


}//User
