package com.RideShare.CarPool.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RideShare.CarPool.Entities.Role;
import com.RideShare.CarPool.Services.RoleService;


//@CrossOrigin(origins = "*")
@RestController
public class RoleController {

	
	
	@Autowired
	RoleService rService;
	
	@GetMapping("/getRoles")
	public List<Role> getRoles(){
		return rService.getRoles();
	}//getRoles
	
	
}//RoleController
