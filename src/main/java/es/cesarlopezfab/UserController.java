package es.cesarlopezfab;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@RequestMapping("/user")
	public Object user(Authentication auth) {
		
		if (auth.getClass().isAssignableFrom(OAuth2Authentication.class)) {
			OAuth2Authentication a = (OAuth2Authentication) auth;
			return a.getPrincipal();
		}
		
		throw new RuntimeException("");
	}

}
