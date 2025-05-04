package com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class P13ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(P13ApiGatewayApplication.class, args);
		System.out.println("ApiGateway Started on 8130");
	}

}
