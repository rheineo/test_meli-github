import React, { Component } from "react"
import PropTypes from 'prop-types'
import { ButtonComprar } from "../components/ButtonComprar"

// const API_KEY = '32804288'
const numberFormat = (value) =>
    new Intl.NumberFormat('de-DE').format(value);

export class Detail extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }
    state = {
        producto: {},
        productoDescripcion: {}
    }

    _condicion(condition) {
        return ((condition === 'new') ? 'Nuevo' : 'Usado')
    }

    _goBack() {
        window.history.back()
    }

    _fetchProducto({ id }) {
        fetch(`https://api.mercadolibre.com/items/${id}`)
            .then(res => res.json())
            .then(producto => {
                console.log({ producto })
                this.setState({ producto: producto })
            })
    }

    _fetchProductoDescripcion({ id }) {
        fetch(`https://api.mercadolibre.com/items/${id}/description`)
            .then(res => res.json())
            .then(productoDesc => {
                console.log({ productoDesc })
                this.setState({ productoDescripcion: productoDesc })
            })
    }

    _obtenerImagen(pictures) {
        console.log("this.state.producto.pictures", pictures);
        let sw= false;
        let img = null;
        if (pictures?.length > 0) {
            pictures.forEach(element => {
                if (!sw) {
                    img = element.url
                    sw = true
                    return true
                }
            });   
        }
          
        return img;
    }

    componentDidMount() {
        console.log(this.props)
        const { id } = this.props.match.params
        this._fetchProducto({ id: id })
        this._fetchProductoDescripcion({ id: id })
    }

    render() {
        const { title, price, sold_quantity, condition, pictures } = this.state.producto
        const { plain_text } = this.state.productoDescripcion
        return (
            <div className='productosList columns'>
                <div  className='productoDescripcion'>
                    <div className="box1">
                        <div className="p-16 column is-8">
                            <figure>
                                <img className="detalleImageML" src={this._obtenerImagen(pictures)} alt={title} />
                            </figure>
                        </div>                        
                        <div className="boxPriceProducto column is-4">
                            <div className="fz-14">
                                <span>{this._condicion(condition)}</span> - <span>{sold_quantity} vendidos</span>
                            </div>
                            <div className="detalleTitleProducto">
                                <span className="fz-24">{title}</span>
                            </div>
                            <div>
                                <span className="fz-46 price">$ {numberFormat(price)}</span>
                            </div>
                            <ButtonComprar />
                        </div>
                    </div>
                    <div className="cardDescripcion column is-8">
                        <div>
                            <span className="fz-28">Descripción del producto</span>
                        </div>
                        <div>
                            <span className="fz-16">{plain_text}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}