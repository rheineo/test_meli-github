import React, { Component } from "react";
import logo from '../Assets/Logo_ML.png';
import iconSearch from '../Assets/ic_Search.png';

export class SearchForm extends Component {
    state = {
        inputSearch: ''
    }

    // asigna al state el valor del input cuando cambia.
    _handleChange = (e) => {
        this.setState({ inputSearch: e.target.value })
    }

    // prevenDefault para evitar que se ejecute el metodo nativo.
    _handleSubmit = (e) => {
        const { inputSearch } = this.state
        e.preventDefault()
        this.props.onResults(null)
        this.props.onResults(inputSearch)
    }
    render() {
        return (
            
                    <form onSubmit={this._handleSubmit}>
                        <div className="has-addons">
                            <div className="df">
                                <div><img src={logo} alt="logo" /></div>
                                <div className="w-full"><input className="input"
                                    onChange={this._handleChange}
                                    type="text"
                                    placeholder="Nunca dejes de buscar">
                                </input></div>
                                <div><button className="button">
                                    <img src={iconSearch} alt="iconSearch" />
                                </button>
                                </div>
                            </div>
                        </div>
                    </form>
         
        )
    }
}