package es.cesarlopezfab;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReferencesController {
	
	@RequestMapping(value="/references", method=RequestMethod.GET)
	@ResponseBody
	public List<Reference> references() {
		final List<Reference> r = new ArrayList<>();
		r.add(new Link("github.com", "https://github.com/cesarlopezfab"));
		return r;
	}

}
