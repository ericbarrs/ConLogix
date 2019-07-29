import React, { Component } from 'react'

export default class Middle extends Component {
    render() {
        return (
            <div className="Main">
                <p>You could buy <span> {Math.floor(this.props.input / this.props.data.Local_price)} </span> of Big Macs in your country</p>
                <p>Your purchasing power parity (PPP) is <span> {this.props.data.Dollar_PPP} </span></p>
            </div>
        )
    }
}
