package com.RideShare.CarPool.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RideShare.CarPool.Entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

	
	
}//RoleRepository
