package es.cesarlopezfab;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"email"})
public class AppUser {
	
	@Id
	private String email;
	private String password;
	private String name;
	private String surname;
	

	public AppUser(String email, String password) {
		this.email = email;
		this.password = password;
	}

}
