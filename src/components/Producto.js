import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const numberFormat = (value) =>
    new Intl.NumberFormat('de-DE').format(value);

export class Producto extends Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.string,
        city: PropTypes.string,
        poster: PropTypes.string
    }

    render() {
        const { id, poster, title, price, city } = this.props
        return (
            <Link to={`/items/${id}`} >
                <div className="box1">
                    <div className="p-16">
                        <figure>
                            <img className="imageML"
                                src={poster}
                                alt={title} />
                        </figure>
                    </div>
                    <div className="boxPriceProducto">
                        <span className="fz-24 priceDetail">$ {numberFormat(price)}</span>
                        <p className="fz-18">{title}</p>
                    </div>
                    <div className="boxCiudad">
                        <p className="fz-12">{city}</p>
                    </div>
                </div>
            </Link>
        )
    }
}