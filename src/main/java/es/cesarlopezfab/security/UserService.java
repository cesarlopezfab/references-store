package es.cesarlopezfab.security;

import java.util.ArrayList;

import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import es.cesarlopezfab.AppUser;
import es.cesarlopezfab.AppUserRepository;

public class UserService implements org.springframework.security.core.userdetails.UserDetailsService {

	private final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();
	private final AppUserRepository repo;

	public UserService(AppUserRepository repo) {
		this.repo = repo;
	}

	@Override
	public final User loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = repo.findByEmail(username);
		
		if (appUser == null) {
			throw new UsernameNotFoundException("user not found");
		}
		User user = new User(appUser.getEmail(), appUser.getPassword(), new ArrayList<>());
		detailsChecker.check(user);
		return user;
	}

	public void addUser(User user) {
		repo.save(new AppUser(user.getUsername(), user.getPassword()));
	}
}