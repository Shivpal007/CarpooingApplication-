package com.main;

import java.util.Arrays;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class MyBeans {

	@Bean
	CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOrigins(Arrays.asList("http://localhost:3013")); // Ensure it matches your frontend URL
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setExposedHeaders(Arrays.asList("Authorization")); 
	    
	    source.registerCorsConfiguration("/**", config);

	    return new CorsWebFilter(source);
	}

    @Bean
    RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("CarPool", r -> r.path("/auth/**")
                        .uri("lb://CARPOOL")) // Ensure Eureka service name is correct
                .route("UserService", r -> r.path("/api/**")
                        .uri("lb://USERSERVICE")) // Ensure this matches Eureka registration
                .build();
	}
}
