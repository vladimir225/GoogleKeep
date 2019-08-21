import React from "react";
import { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./App.css";
import { string } from "prop-types";
import Keeps from "./Keeps";
import Login from "./Login";
interface AppProps {}
interface AppState {
  value: string;
  arrKeeps: Array<Keep>;
}

interface Keep {
  title: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      value: "",
      arrKeeps: []
    };
  }

  addKeep = () => {
    fetch("http://localhost:4444/keep", {
      method: "POST",
      body: JSON.stringify({ title: this.state.value }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(keep => {
        this.setState({
          value: "",
          arrKeeps: this.state.arrKeeps.concat(keep)
        });
      });
  };

  componentDidMount() {
    fetch("http://localhost:4444/keeps")
      .then(r => r.json())
      .then(data => {
        this.setState({ arrKeeps: data, value: "" });
      });
  }

  handleChange = (event: any) => {
    this.setState({
      value: event.target.value
    });
  };

  register = () => {
    
  }

  login = () => {
    
  }

  render() {
    console.log(this.state.value)
    const keepsElement = this.state.arrKeeps.map(val => (
      <Keeps title={val.title} />
    ));
    //const login = <Login login={this.login} />
    return (
      <div className='container'>
        <div className='footer'>
          <input
            className='footer_input'
            onChange={this.handleChange}
            value={this.state.value}
            placeholder="Заметка..."
          />
          
          <button className='footer_button' onClick={this.addKeep}>Keep</button>
          <Link to='/registr'><button className='footer_registr'>registr</button></Link>
          <Link to='/login'><button className='footer_registr'>Login</button></Link>
        </div>
        <div className='container_keeps'>
        {keepsElement}
        </div>
      </div>
    );
  }
}

export default App;
