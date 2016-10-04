package es.cesarlopezfab;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class EntityInheritanceIT {

	@Autowired
	LinkRepository repo;

	@Test
	public void itWorks() {
		assertTrue(repo.findAll().isEmpty());
	}

}
