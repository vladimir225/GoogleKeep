import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import './Registr.css'
interface RegistrProps {}
interface RegistrState {
    user: string,
    password: string
}

class Registr extends React.Component<RegistrProps, RegistrState> {
    constructor(props: RegistrProps) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
      }

    render() {
        return(
            <div className='container'>
                <form className='form'>
                    <label htmlFor='login-field' >Логин</label>
                    <input onChange={this.handleNameChange} value={this.state.user} className='UserName' name='user' type='text' id='login-field'></input>
                    <label htmlFor='password-field'>Пароль</label>
                    <input onChange={this.handlePassword} value={this.state.password} className='password' name='password' type='password' id='password-field'></input>
                    <button onClick={this.handleClick}>Зарегистрироваться</button>
                </form>
            </div>
        )
    }

    handleClick = (event:any) => {
        console.log(this.state)
        event.preventDefault()
        fetch("http://localhost:4444/registr",{ method: 'POST', body: JSON.stringify(this.state), headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }})
      .then(r => r.json())
      .then(data => {
        console.log(data,'============')
        if (data.id) {
            //this.props.login()

        }
      });
    }

    handleNameChange = (event:any) => {
        console.log(event.target.value)
        this.setState({
            user: event.target.value
        })
    }

    handlePassword = (event: any) => {
        this.setState({
            password: event.target.value
        })
    }
}

export default Registr;