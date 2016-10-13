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
					<button onClick={logout} className="btn btn-primary">Logout</button>
				</div>
	}
}


class App extends Component {
	render() {
		return (
		        <div>
		          <LoginRegistration />
		          <Logout />
		          <References />
		      </div>
		    );
	}
}

ReactDOM.render(<App />, document.getElementById('react'));

