import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import rest from 'rest';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' });

class StateFullComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
}

class Text extends StateFullComponent {
  render() {
    const {is, c} = this.props;
    const value = this.state[is];
    const id = 'id' + Math.random();

    return (<div className='form-group'><label id={id} className='sr-only'>{is}</label><input id={id} onChange={c} value={value} name={is} placeholder={is} type="text" /></div>)
  }
}

class Select extends StateFullComponent {
  render() {
    const {c, is, values} = this.props;
    const value = this.state[is];
    const vals = values.map(function(val) {
      return <option key={val} value={val}>{val}</option>
    });

    return (
      <select className='form-control' name={is} value={value} onChange={c} >
        {vals}
      </select>
    )
  }
}

function buildTwoTextElement(first, second, c) {
  return (
    <div className='form-group'>
    <Text is={first} c={c} />
    <Text is={second} c={c} />
    </div>
  );
}

class Link extends Component {
  render() {
    return buildTwoTextElement('title', 'url', this.props.c);
  }
}

class Note extends Component {
  render() {
    return buildTwoTextElement('title', 'content', this.props.c);
  }
}


class Category extends  StateFullComponent {
  render() {
    return buildTwoTextElement('category', 'subcategory', this.props.c);
  }
}

function obtainNewReferenceElement (reference, c){
  if (!reference || !reference.type) {
    return <div style={{display:'none'}}></div>;
  }

  if (reference.type == 'link') {
    return <Link c={c} />;
  }

  if (reference.type == 'note') {
    return <Note c={c} />;
  }
}


class NewReference extends StateFullComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {reference} = this.state;
    client({
      path: '/references',
      entity: reference
    });
  }
  handleChange(e) {
    const reference = this.state.reference || {};
    reference[e.target.name] = e.target.value;
    this.setState({
      reference
    });
  }
  render() {
    const element = obtainNewReferenceElement(this.state.reference, this.handleChange);

    return (
      <form onSubmit={this.handleSubmit} className='row form-inline'>
          <Category c={this.handleChange}  />
          <Select is="type" values={['', 'link', 'note']} c={this.handleChange} />
          {element}
          <input type="submit" value="Ok" className='btn btn-primary' />
      </form>
    )
  }
}

class LinkReference extends Component {

  render() {
    const {title, url} = this.props;
    return <a href={url}>{title}</a>;
  }
}

class NoteReference extends Component {
  render() {
    const {title, content} = this.props;
    return <span>{title}<p>{content}</p></span>;
  }
}


class References extends Component {
  render() {
	  const wrap = function(reference, ref) {
	        return <li className='list-group-item col-md-3' key={reference.id}>{ref}</li>;		  
	  };
	  const references = this.props.references.map(function(reference) {
      if (reference.type === 'link') {
    	  return wrap(reference, <LinkReference title={reference.title} url={reference.url} />)
      }

      if (reference.type === 'note') {
        return wrap(reference, <NoteReference title={reference.title} content={reference.content} />);
      }
    });

    return (
        <div>
          <NewReference />
          <ul className='row list-group'>
          {references}
          </ul>
      </div>
    );
  }
}


client({path: '/references'}).then(function(response) {
  ReactDOM.render(<References references={response.entity}/>, document.getElementById('react'));
});

export default function() {return 'test'};