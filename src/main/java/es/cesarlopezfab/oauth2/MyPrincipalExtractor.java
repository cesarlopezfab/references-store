package es.cesarlopezfab.oauth2;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;

public class MyPrincipalExtractor implements PrincipalExtractor {

	private static final String[] PRINCIPAL_KEYS = new String[] { "user", "username", "userid", "user_id", "login",
			"id", "name" };

	@Override
	public Object extractPrincipal(Map<String, Object> map) {
		Map<String, Object> user = new HashMap<String, Object>();
		for (String key : PRINCIPAL_KEYS) {
			if (map.containsKey(key)) {
				user.put(key, map.get(key));
			}
		}
		return user;
	}

}
