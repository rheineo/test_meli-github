import React, { Component } from "react";
import PropTypes from "prop-types";
import { Producto } from "./Producto";

export class ProductosList extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  state = {
    productos: []
}

  _fetchListProducto({ query }) {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then(res => res.json())
      .then(result => {
        const { results = [], paging = {} } = result
        this.setState({ productos: results })
      })
  }

  componentWillMount() {
    const { query } = this.props.match.params
    this._fetchListProducto({ query: query })
  }

  render() {
    this.componentWillMount()
    const { productos } = this.state
    return (
      <div className='productosList'>
       {
            this.state.productos.length > 0 ?     
            productos.slice(0,4).map(item => {
              return (
                <div key={item.id} className='productosList-item'>
                <Producto
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  city={item.address.state_name}
                  poster={item.thumbnail}
                />
                </div>
              )
            })
            :<p>Sin Resultados</p>
          }
      </div>
    )
  }
}