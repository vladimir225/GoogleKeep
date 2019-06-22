import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { string } from "prop-types";
interface AppProps{
    title:string
}
interface AppState{
  
}

class Keeps extends React.Component<AppProps, AppState> {
  state = {
    
  }

 
  render() {
    const title = this.props.title
    return (
      <div>
          {title}
      </div>
    );
  }
}

export default Keeps;
    