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
    const is = this.props.is;
    const value = this.state[is];
    const handleChange = this.props.c;

    return <input onChange={handleChange} value={value} name={is} type="text" placeholder={is} />
  }
}

class Select extends StateFullComponent {
  render() {
    const {c, is, values, emptyValue} = this.props;
    const value = this.state[is];

    if (emptyValue) {
      values.unshift('');
    }
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

class NewReference extends StateFullComponent {
  constructor(props) {
    super(props);
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
        <Select is="type" values={['link', 'note']} c={this.handleChange} emptyValue />
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