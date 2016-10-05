import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import rest from 'rest';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' });

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const is = this.props.is;
    const value = this.state[is];
    const handleChange = this.props.c;

    return <input onChange={handleChange} value={value} name={is} type="text" placeholder={is} />
  }

}

class NewReference extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', url: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {title, url, type} = this.state;
    client({
      path: '/references',
      entity: {title, url, type}
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Text is="title" c={this.handleChange} />
        <Text is="url" c={this.handleChange} />
        <select name="type" value={this.state.type} onChange={this.handleChange} >
          <option value=""></option>
          <option value="link">Link</option>
          <option value="note">Note</option>
        </select>
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


class References extends Component {
  render() {

    const references = this.props.references.map(function(reference) {
      return <LinkReference key={reference.id} title={reference.title} url={reference.url} />;
    });

    return (
        <div>
          <NewReference />
          {references}
      </div>
    );
  }
}


client({path: '/references'}).then(function(response) {
  ReactDOM.render(<References references={response.entity}/>, document.getElementById('react'));
});