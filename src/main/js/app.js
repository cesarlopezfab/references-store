import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import References from './references';
import {user} from './entities';

class Login extends Component {
	render() {
		return <div>
				<div>With Facebook <a href="login/facebook">click here</a></div>
				<div>With Github <a href="login/github">click here</a></div>
			</div>;
	}
}

class Logout extends Component {
	render() {
		const logout = function() {
			user().logout();
		}
		return <div>
					<button onClick={logout} className="btn btn-primary">Logout</button>
				</div>
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

