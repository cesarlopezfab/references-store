package es.cesarlopezfab;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, String> {

	AppUser findByEmail(String email);

}
