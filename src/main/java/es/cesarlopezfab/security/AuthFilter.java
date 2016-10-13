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

			String username = request.getParameter("email");
			String password = request.getParameter("password");
			Collection<? extends GrantedAuthority> authorities = new ArrayList<>();
			
			
			UserAuthentication authentication = new UserAuthentication(new User(username, password, authorities));
			tokenAuthenticationService.addAuthentication(response, authentication);
			return authentication;			
		}
		
		if ("/auth/register".equals(path)) {
			String username = request.getParameter("email");
			String password = request.getParameter("password");
			Collection<? extends GrantedAuthority> authorities = new ArrayList<>();
			
			// FIXME: Refactor this ugly code O.o
			try {
				userService.loadUserByUsername(username);
				throw new RuntimeException("User already exists");
			} catch(UsernameNotFoundException e) {
				userService.addUser(new User(username, password, authorities));

				UserAuthentication authentication = new UserAuthentication(new User(username, password, authorities));
				tokenAuthenticationService.addAuthentication(response, authentication);
				return authentication;
			}
			
		}
		return null;
		
	}

}
