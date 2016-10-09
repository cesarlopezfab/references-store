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
    }).then(function() {
    	console.log('reload');
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

const wrapCloseableLi = function (reference, ref) {
  const close = 'glyphicon glyphicon-remove pull-right text-danger';
  const li = 'list-group-item col-md-3';

  const handleClose = function () {
    const path = '/references/' + reference.id;
    client({path: path, entity: reference, method: 'DELETE'}).then(function () {
      console.log('reload')
    });
  }

  return <li className={li} key={reference.id}>
  			{ref}<span onClick={handleClose} className={close}></span>
  		</li>;
};

class Login extends Component {
	render() {
		return <div>
			With Facebook <a href="login/facebook">click here</a>
			</div>;
	}
}

class Logout extends Component {
	render() {
		const logout = function() {
			client({path:'/logout', entity: {}}).then(function() {
				console.log('logged out!!');
			});
		}
		return <div>
					<button onClick={logout} className="btn btn-primary">Logout</button>
				</div>
	}
}

class References extends StateFullComponent {

  componentWillMount() {
	  const self = this;
	  client({path: '/references'}).then(function(response) {
		 self.setState({references: response.entity}) 
	  });
  }
  render() {
	  //FIXME: this is not working properly when logged out.
	  const references = this.state.references && this.state.references.map(function(reference) {
      if (reference.type === 'link') {
    	  return wrapCloseableLi(reference, <LinkReference title={reference.title} url={reference.url} />)
      }

      if (reference.type === 'note') {
        return wrapCloseableLi(reference, <NoteReference title={reference.title} content={reference.content} />);
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

class App extends Component {
	render() {
		return (
		        <div>
		          <Login />
		          <Logout />
		          <References />
		      </div>
		    );
	}
}

ReactDOM.render(<App />, document.getElementById('react'));

