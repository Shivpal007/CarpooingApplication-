package com.RideShare.CarPool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class CarPoolApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(CarPoolApplication.class, args);
		System.out.println("SpringBoot Started on 8132");
	}
}
