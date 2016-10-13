package es.cesarlopezfab.security;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();
    private final HashMap<String, User> userMap = new HashMap<String, User>();
    
    public UserService() {
    	userMap.put("prueba@prueba.com", new User("prueba@prueba.com", "prueba", new ArrayList<>()));
    }

    @Override
    public final User loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userMap.get(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        detailsChecker.check(user);
        return user;
    }

    public void addUser(User user) {
        userMap.put(user.getUsername(), user);
    }
}