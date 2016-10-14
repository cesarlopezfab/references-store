package es.cesarlopezfab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppUserController {
	
	private final AppUserService service;

	@Autowired
	public AppUserController(AppUserService service) {
		this.service = service;
	}
	
	@RequestMapping("/api/user")
	public AppUser user() {
		return service.getLoggedInUser();
	}

}
