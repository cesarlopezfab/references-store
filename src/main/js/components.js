import React, {Component} from 'react';


class StateFullComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
}

function buildInput(type, value, is, c){
  const id = 'id' + Math.random();
  return (<div className='form-group'><label htmlFor={id} className='sr-only'>{is}</label><input className='form-control' id={id} onChange={c} value={value} name={is} placeholder={is} type={type} /></div>);
}


class Email extends StateFullComponent {
  render() {
    const {is, c} = this.props;
    const value = this.state[is];
    return buildInput('email', value, is ,c);
  }
}

class Password extends StateFullComponent {
  render() {
    const {is, c} = this.props;
    const value = this.state[is];
    return buildInput('password', value, is ,c);
  }
}

class Text extends StateFullComponent {
  render() {
    const {is, c} = this.props;
    const value = this.state[is];
    return buildInput('text', value, is ,c);
  }
}

class Checkbox extends StateFullComponent {
  render() {
    return <div className="form-group text-center">
              <input type="checkbox" tabIndex="3" className="" name="remember" id="remember"/>
              <label htmlFor="remember"> Remember Me</label>
            </div>
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

export {Text, Password, Email, Checkbox, Select, StateFullComponent};