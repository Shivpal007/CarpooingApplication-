# Car Pooling Project - CDAC

## Introduction
The Car Pooling Project is designed to offer an efficient, eco-friendly, and cost-effective ride-sharing solution that connects drivers with passengers through a seamless and user-friendly interface. By reducing the number of vehicles on the road, the platform contributes to environmental sustainability and lowers commuting costs.

## Backend and Frontend Clarification
The backend of the system is developed using two powerful frameworks:
- **.NET Core Web API**: Provides high scalability, performance, and lightweight microservices-based architecture for handling requests efficiently. It also manages the core business logic, ensuring smooth operations.
- **Spring Boot (Java)**: Supports secure API services and facilitates integration with other system components.

The frontend is built using **ReactJS**, offering an interactive and responsive user interface that enhances the overall user experience.

## Automation Features
The system leverages automation for seamless operations, including:
- **Driver Verification**: The platform allows drivers to submit required documents, and an admin manually verifies the driver's status. Once approved, SQL triggers update the driver's status in real time.
- **Ride Status Updates**: The system automatically tracks the ride status, updating it based on seat availability and driver verification.
- **Real-Time Synchronization**: A robust MySQL database with well-defined triggers ensures data consistency and synchronization between drivers and passengers.

## Security & Performance
Security and performance optimization are key priorities:
- **Security Measures**:
  - Implementation of authentication and authorization mechanisms using **Spring Security**.
  - Data encryption to safeguard user details and sensitive ride information.
  - Role-based access control to ensure secure interactions within the platform.
  - **JWT Authentication in Java**: Secure access control is enforced through JSON Web Tokens (JWT) with Spring Security in Java, ensuring authenticated sessions for users.
- **Performance Optimization**:
  
  - Efficient API design with optimized queries to handle high traffic seamlessly.

## Features
- **Ride Publishing & Booking**: Drivers can publish available rides, while passengers can book seats conveniently.
- **Seat Management**: The system automatically updates seat availability based on bookings.
- **User Profile Management**: Users can manage their profiles, update ride preferences, and track booking history with secure JWT authentication in Java.

## Tools & Technologies
- **Backend:** .NET Core Web API, Spring Boot (Java)
- **Frontend:** ReactJS
- **Database:** MySQL with SQL triggers
- **Security:** Spring Security, JWT Authentication (Java)
- **Development Tools:** Postman (API Testing), Git (Version Control)

## Conclusion
The Car Pooling Project is a step toward smarter and more sustainable urban mobility. By integrating advanced technologies and automation, it ensures a seamless and secure experience for both drivers and passengers.

