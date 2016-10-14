package es.cesarlopezfab.security;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CompositeFilter;

import es.cesarlopezfab.AppUserRepository;
import es.cesarlopezfab.oauth2.Oauth2FilterBuilder;

@EnableWebSecurity
@Configuration
@EnableOAuth2Client
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final List<Oauth2FilterBuilder> filterBuilders;
	private final UserService userService;
	private final TokenAuthenticationService tokenAuthenticationService;

	@Autowired
	public SecurityConfig(List<Oauth2FilterBuilder> filterBuilders, AppUserRepository repo) {
		super(true);
		this.userService = new UserService(repo);
		tokenAuthenticationService = new TokenAuthenticationService(new TokenHandler("ultraSecret", userService));
		this.filterBuilders = filterBuilders;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.exceptionHandling().and().anonymous().and().servletApi().and().headers().cacheControl().and().and()
				.authorizeRequests()

				.antMatchers("/", "/auth/**", "/login**", "/js/**", "/css/**").permitAll().anyRequest().authenticated().and()

				.addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class)
				.addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService),
						UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(new AuthFilter(new AntPathRequestMatcher("/auth/**"), tokenAuthenticationService, userService),
						UsernamePasswordAuthenticationFilter.class);
	}

	private Filter ssoFilter() {
		CompositeFilter filter = new CompositeFilter();
		List<Filter> filters = new ArrayList<>();
		for (Oauth2FilterBuilder b : filterBuilders) {
			filters.add(b.build());
		}

		filter.setFilters(filters);
		return filter;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService()).passwordEncoder(new BCryptPasswordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	@Override
	public UserService userDetailsService() {
		return userService;
	}

	@Bean
	public TokenAuthenticationService tokenAuthenticationService() {
		return tokenAuthenticationService;
	}
	
	@Bean
	public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(filter);
		registration.setOrder(-100);
		return registration;
	}

}