package es.cesarlopezfab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
	
	private final AppUserRepository repo;
	
	@Autowired
	public AppUserService(AppUserRepository repo) {
		this.repo = repo;
	}

	public AppUser getLoggedInUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		return repo.findByEmail(email);
	}

}
