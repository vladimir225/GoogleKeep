import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { string } from "prop-types";
import Keeps from "./Keeps";
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

  render() {
    console.log(this.state.value);
    const keepsElement = this.state.arrKeeps.map(val => (
      <Keeps title={val.title} />
    ));
    return (
      <div>
        <input
          onChange={this.handleChange}
          value={this.state.value}
          placeholder="Заметка..."
        />
        <button onClick={this.addKeep}>Keep</button>
        {keepsElement}
      </div>
    );
  }
}

export default App;
