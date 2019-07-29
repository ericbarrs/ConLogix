import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <p>Random Country: <span>{this.props.data.data.randomCountry.Country}</span></p>
                <p>You could buy <span>{Math.floor(this.props.data.inputField / this.props.data.data.myCountry.Local_price)}</span> of Big Macs in <span>{this.props.data.data.randomCountry.Country}</span> with <span>{this.props.data.data.myCountry.Country.Local_price}</span>
                    Your  $ <span>{this.props.data.inputField}</span>
                </p>
                <p>Your $ <span>{this.props.data.inputField}</span > is worth about $ < span > {this.props.data.inputField * (this.props.data.data.myCountry.Dollar_price / this.props.data.data.randomCountry.Dollar_price)}</span > in <span>{this.props.data.data.randomCountry.Country}</span></p >
            </div >
        )
    }
}
        // (calculation is (INPUT / local price) * (local dollar price / RAND COUNTRY dollar price)

        // (Calculation is [INPUT] * (local dollar price / RAND COUNTRY dollar price))
