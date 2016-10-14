import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import References from './references';
import {user} from './entities';
import {LoginRegistration} from './login';


class Logout extends Component {
	render() {
		const logout = function() {
			user().logout();
		}
		return <div>
					<button onClick={logout} className="btn btn-primary pull-right">Logout</button>
				</div>
	}
}

const renderApp = function(logged) {
	if (logged) {
		return <div>
		<Logout />
		<References />
		</div>
	} else {
		return <LoginRegistration />
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		const self = this;
		user(function(user) {
			const logged = user ? true : false;
			self.setState({
				logged
			});
		});
	}
	render() {
		return renderApp(this.state.logged);
	}
}

ReactDOM.render(<App />, document.getElementById('react'));

