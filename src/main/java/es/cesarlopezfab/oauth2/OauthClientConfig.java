package es.cesarlopezfab.oauth2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.CompositeFilter;

class OauthClientConfig extends WebSecurityConfigurerAdapter {

	private final List<Oauth2FilterBuilder> filterBuilders;
	private final Environment env;

	@Autowired
	OauthClientConfig(List<Oauth2FilterBuilder> filterBuilders, Environment env) {
		this.filterBuilders = filterBuilders;
		this.env = env;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		List<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
		if (activeProfiles.contains("noSecurity")) {
			http.csrf().disable().antMatcher("/**").authorizeRequests().antMatchers("/**").permitAll();
		} else {
			http.csrf().disable().antMatcher("/**").authorizeRequests().antMatchers("/", "/login**", "/js/**").permitAll()
					.anyRequest().authenticated().and().logout().logoutSuccessUrl("/").permitAll().and()
					.addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);	
		}
		
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

	@Bean
	public FilterRegistrationBean oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(filter);
		registration.setOrder(-100);
		return registration;
	}

}
