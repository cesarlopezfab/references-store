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
	
	private final LinkRepository repo;

	@Autowired
	ReferencesController(LinkRepository repo) {
		this.repo = repo;
	}
	
	@RequestMapping(value="/references", method=RequestMethod.GET)
	@ResponseBody
	public List<Link> references() {
		return repo.findAll();
	}
	
	@RequestMapping(value="/references", method=RequestMethod.POST, consumes="application/json")
	public void a(@RequestBody Link link) {
		repo.save(link);
		
	}

}
