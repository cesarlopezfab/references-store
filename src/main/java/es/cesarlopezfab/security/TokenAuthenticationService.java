package es.cesarlopezfab.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;

public class TokenAuthenticationService {

	private static final String AUTH_HEADER_NAME = "Authorization";

	private final TokenHandler tokenHandler;

	public TokenAuthenticationService(TokenHandler tokenHandler) {
		this.tokenHandler = tokenHandler;
	}

	public void addAuthentication(HttpServletResponse response, UserAuthentication authentication) {
		final User user = authentication.getDetails();
		response.addHeader(AUTH_HEADER_NAME, "Bearer " + tokenHandler.createTokenForUser(user));
	}

	public Authentication getAuthentication(HttpServletRequest request) {
		final String token = request.getHeader(AUTH_HEADER_NAME);
		if (token != null) {

			final User user = tokenHandler.parseUserFromToken(token.replace("Bearer ", ""));
			if (user != null) {
				return new UserAuthentication(user);
			}
		}
		return null;
	}
}