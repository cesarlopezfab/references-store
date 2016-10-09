package es.cesarlopezfab.oauth2;

import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;

abstract class Oauth2FilterBuilder {

	private static final String BASE_PATH = "/login/";

	private final OAuth2ClientContext oauth2ClientContext;

	Oauth2FilterBuilder(OAuth2ClientContext oauth2ClientContext) {
		this.oauth2ClientContext = oauth2ClientContext;
	}

	OAuth2ClientAuthenticationProcessingFilter build() {
		return buildFilter(BASE_PATH + path(), details(), resource());
	}

	abstract ResourceServerProperties resource();

	abstract AuthorizationCodeResourceDetails details();

	abstract String path();

	private OAuth2ClientAuthenticationProcessingFilter buildFilter(String path,
			AuthorizationCodeResourceDetails details, ResourceServerProperties resource) {
		OAuth2ClientAuthenticationProcessingFilter filter = new OAuth2ClientAuthenticationProcessingFilter(path);
		OAuth2RestTemplate facebookTemplate = new OAuth2RestTemplate(details, oauth2ClientContext);
		filter.setRestTemplate(facebookTemplate);
		filter.setTokenServices(new UserInfoTokenServices(resource.getUserInfoUri(), details.getClientId()));
		return filter;
	}

}
