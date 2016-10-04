package es.cesarlopezfab;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReferencesController {
	
	private final ReferenceRepository repo;

	@Autowired
	ReferencesController(ReferenceRepository repo) {
		this.repo = repo;
	}
	
	@RequestMapping(value="/references", method=RequestMethod.GET)
	@ResponseBody
	public List<Reference> references() {
		return repo.findAll();
	}
	
	@RequestMapping(value="/references", method=RequestMethod.POST, consumes="application/json")
	public void save(@RequestBody Reference reference) {
		repo.save(reference);
		
	}

}
