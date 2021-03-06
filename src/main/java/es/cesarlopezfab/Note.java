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
@EqualsAndHashCode(of = {"content"}, callSuper=true)
@ToString
public class Note extends Reference {
	
	private String content;
}
