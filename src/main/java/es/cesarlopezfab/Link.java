package es.cesarlopezfab;

import javax.persistence.Entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"title", "url"}, callSuper=true)
@ToString
public class Link extends Reference {
	
	private String title;
	private String url;
}
