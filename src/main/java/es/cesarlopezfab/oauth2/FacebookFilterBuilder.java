package es.cesarlopezfab.oauth2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;

@Configuration
class FacebookFilterBuilder extends Oauth2FilterBuilder {

	@Autowired
	FacebookFilterBuilder(OAuth2ClientContext oauth2ClientContext) {
		super(oauth2ClientContext);
	}

	@Bean
	@ConfigurationProperties("facebook.resource")
	@Override
	ResourceServerProperties resource() {
		return new ResourceServerProperties();
	}

	@Bean
	@ConfigurationProperties("facebook.client")
	@Override
	AuthorizationCodeResourceDetails details() {
		return new AuthorizationCodeResourceDetails();
	}

	@Override
	String path() {
		return "facebook";
	}

}
