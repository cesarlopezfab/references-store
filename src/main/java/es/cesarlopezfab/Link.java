package es.cesarlopezfab;

public class Link implements Reference {

	public String title;
	public String url;
	public String id;

	public Link(String id, String title, String url) {
		this.id = id;
		this.title = title;
		this.url = url;
	}

}
