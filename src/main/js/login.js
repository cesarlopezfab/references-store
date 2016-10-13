import React, {Component} from 'react';
import {Text, Password, Checkbox} from './components';
import {user} from './entities';

class LoginRegistration extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      loginActive: true
    };
  }
  handleRegister() {
    this.setState({
      loginActive: false
    });
  }
  handleLogin() {
    this.setState({
      loginActive: true
    });
  }
  render() {
    let loginDisplay;
    let registerDisplay;
    let loginActive;
    let registerActive;

    if (this.state.loginActive) {
      loginDisplay = 'block';
      registerDisplay = 'none';
      loginActive = 'active';
      registerActive = '';
    } else {
      loginDisplay = 'none';
      registerDisplay = 'block';
      loginActive = '';
      registerActive = 'active';
    }

    return <div className="container">
          <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-6">
                    <a href="#" onClick={this.handleLogin} className={loginActive}>Login</a>
                  </div>
                  <div className="col-xs-6">
                    <a href="#" onClick={this.handleRegister} className={registerActive}>Register</a>
                  </div>
                </div>
              <hr />
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Login display={loginDisplay} />
                    <Register display={registerDisplay} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  }
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state;
    user().login({email, password});
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const c = this.handleChange;
    return <form style={{display: this.props.display}} onSubmit={this.handleSubmit}>

                  <Text is='email' c={c} />
                  <Password is='password' c={c} />
									<Checkbox />

									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												<input type="submit" className="form-control btn btn-primary" value="Log In"/>
											</div>
										</div>
									</div>

									<div className="form-group">
										<div className="row">
											<div className="col-lg-12">
												<div className="text-center">
													<a className="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div>
									</div>

								</form>

  }
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state;
    user().add({email, password});
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const c = this.handleChange;
    return <form style={{display: this.props.display}} onSubmit={this.handleSubmit}>
									<Text is='username' c={c} />
                  <Text is='email' c={c} />
                  <Password is='password' c={c} />
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												<input type="submit" className="form-control btn btn-success" value="Register Now"/>
											</div>
										</div>
									</div>
								</form>
  }
}

export {LoginRegistration};