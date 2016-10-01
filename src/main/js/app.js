import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import rest from 'rest';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' });

class NewLinkReference extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', url: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {title, url} = this.state;
    client({
      path: '/references',
      entity: {title, url}
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.title} name="title" type="text" placeholder="Title" />
        <input onChange={this.handleChange} value={this.state.url} name="url" type="text" placeholder="Url" />
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
          <NewLinkReference />
          {references}
      </div>
    );
  }
}


client({path: '/references'}).then(function(response) {
  ReactDOM.render(<References references={response.entity}/>, document.getElementById('react'));
});