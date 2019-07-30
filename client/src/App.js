import React from 'react';
import Main from './components/Main'
import Footer from './components/Footer'
import './App.css';

export default class App extends React.Component {
  state = {
    inputField: 0
  }
  componentWillMount() {
    fetch('https://api.ipify.org/?format=json')
      .then(res => res.json())
      .then(ip => {
        this.setState(ip)
        fetch('/api/country', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({ ip: this.state.ip })
        })
          .then(res => res.json())
          .then(data => this.setState({ data: data }))
      })
  }

  inputHandler(e) {
    this.setState({
      inputField: e.target.value,
    })
  }


  randConWorth() {
    return this.state.data.myCountry.Country.Local_price / this.state.data.randomCountry.Local_price
  }

  render() {
    if (this.state.data) {
      return (
        <div className="App">
          <div className="Header">
            <h1>You are in {this.state.data.myCountry.Country}</h1>
            <input type="number" onChange={(e) => this.inputHandler(e)} placeholder="input your currency">{}</input>
          </div>
          <Main input={this.state.inputField} data={this.state.data.myCountry} />
          <Footer data={this.state} />
        </div >
      );
    }
    else {
      return null
    }
  }
}