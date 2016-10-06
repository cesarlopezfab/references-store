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

    return <input onChange={c} value={value} name={is} placeholder={is} type="text" />
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
      <select name={is} value={value} onChange={c} >
        {vals}
      </select>
    )
  }
}

class Link extends Component {
  render() {
    const {c} = this.props;
    return (
      <div>
        <Text is="title" c={c} />
        <Text is="url" c={c} />
      </div>
      )
  }
}

class Note extends Component {
  render() {
    const {c} = this.props;
    return (
      <div>
        <Text is="title" c={c} />
        <Text is="content" c={c} />
      </div>
    )
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
      <form onSubmit={this.handleSubmit}>
          <Select is="type" values={['', 'link', 'note']} c={this.handleChange} />
          {element}
          <input type="submit" value="Ok" />
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
    const references = this.props.references.map(function(reference) {
      if (reference.type === 'link') {
        return <li key={reference.id}><LinkReference key={reference.id} title={reference.title} url={reference.url} /></li>;
      }

      if (reference.type === 'note') {
        return <li key={reference.id} ><NoteReference title={reference.title} content={reference.content} /></li>;
      }
    });

    return (
        <div>
          <NewReference />
          <ul>
          {references}
          </ul>
      </div>
    );
  }
}


client({path: '/references'}).then(function(response) {
  ReactDOM.render(<References references={response.entity}/>, document.getElementById('react'));
});