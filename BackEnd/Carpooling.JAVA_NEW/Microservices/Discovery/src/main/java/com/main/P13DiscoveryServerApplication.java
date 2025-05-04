package com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class P13DiscoveryServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(P13DiscoveryServerApplication.class, args);
		System.out.println("Discovery Server Started on 8131");
	}

}
