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
@EqualsAndHashCode(of = {"url"}, callSuper=true)
@ToString
public class Link extends Reference {
	
	private String url;
}
