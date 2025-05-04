package com.RideShare.CarPool.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RideShare.CarPool.Entities.Role;
import com.RideShare.CarPool.Repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository roleRepository;
	
	public List<Role> getRoles(){
		return roleRepository.findAll();
	}//getAllRoles
	
	
}//RoleService
