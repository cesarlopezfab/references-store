package es.cesarlopezfab;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Link implements Reference {
	
	@Id @GeneratedValue
	public String id;
	public String title;
	public String url;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Link() {
	}

	public Link(String id, String title, String url) {
		this.id = id;
		this.title = title;
		this.url = url;
	}

}
