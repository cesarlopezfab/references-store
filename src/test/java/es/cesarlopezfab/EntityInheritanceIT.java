package es.cesarlopezfab;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("memoryDB")

public class EntityInheritanceIT {

	@Autowired
	ReferenceRepository repo;

	@Test
	@Transactional
	public void itWorks() {
		assertTrue(repo.findAll().isEmpty());
	}
	
	@Test
	@Transactional
	public void saveWorks() {
		repo.save(buildLink());
		List<Reference> findAll = repo.findAll();
		assertEquals(1, findAll.size());
	}
	
	@Test
	@Transactional
	public void saveWorksForDifferentTypes() {
		Note note = buildNote();
		Link link = buildLink();
		repo.save(note);
		repo.save(link);
		List<Reference> result = repo.findAll();
		assertEquals(2, result.size());
		assertTrue(result.contains(note));
		assertTrue(result.contains(link));
	}

	private Note buildNote() {
		String title = "My first note";
		String content = "Let's look if this note work";
		Note note = new Note();
		note.setTitle(title);
		note.setTitle(content);
		return note;
	}

	private Link buildLink() {
		String title = "github";
		String url = "github.com/cesarlopezfa";
		Link link = new Link();
		link.setTitle(title);
		link.setUrl(url);
		return link;
	}
	
	

}
