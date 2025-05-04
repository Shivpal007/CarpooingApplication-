package com.RideShare.CarPool.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.RideShare.CarPool.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("SELECT u FROM User u WHERE u.contactno = :contactno")
	 User findUserByContact(String contactno);
	
	@Query("SELECT u FROM User u WHERE u.email = :email AND u.contactno = :contact")
	 User findUserBYEmail(String email,String contact);
}//UserRepository
