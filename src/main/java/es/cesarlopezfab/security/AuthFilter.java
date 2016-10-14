package es.cesarlopezfab.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.util.UrlPathHelper;

public class AuthFilter extends AbstractAuthenticationProcessingFilter {

	private final TokenAuthenticationService tokenAuthenticationService;
	private final UserService userService;

	protected AuthFilter(RequestMatcher requiresAuthenticationRequestMatcher,
			TokenAuthenticationService tokenAuthenticationService, UserService userService) {
		super(requiresAuthenticationRequestMatcher);
		this.tokenAuthenticationService = tokenAuthenticationService;
		this.userService = userService;
		this.setAuthenticationSuccessHandler(new AuthenticationSuccessHandler() {

			@Override
			public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
					Authentication authentication) throws IOException, ServletException {
				// no-op continue chain

			}
		});
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {

		String path = new UrlPathHelper().getPathWithinApplication(request);

		
		if ("/auth".equals(path)) {
			User user = extractUserFrom(request);
			User storedUser = userService.loadUserByUsername(user.getUsername());
			if (!storedUser.getPassword().equals(user.getPassword())) {
				throw new RuntimeException("Password do not match");
			}
			
			return addAuthenticationTo(response, user);
		}

		if ("/auth/register".equals(path)) {
			User user = extractUserFrom(request);;
			if (userExists(user.getUsername())) {
				throw new RuntimeException("User already exists");
			} else {
				userService.addUser(user);
				return addAuthenticationTo(response, user);
			}

		}
		return null;

	}

	private boolean userExists(String username) {
		try {
			userService.loadUserByUsername(username);
			return true;
		} catch (UsernameNotFoundException e) {
			return false;
		}

	}

	private Authentication addAuthenticationTo(HttpServletResponse response, User user) {
		UserAuthentication authentication = new UserAuthentication(user);
		tokenAuthenticationService.addAuthentication(response, authentication);
		return authentication;
	}

	private User extractUserFrom(HttpServletRequest request) {
		String username = request.getParameter("email");
		String password = request.getParameter("password");
		Collection<? extends GrantedAuthority> authorities = new ArrayList<>();

		User user = new User(username, password, authorities);
		return user;
	}

}
