import React, { Component } from "react";
import PropTypes from "prop-types";
import { Producto } from "./Producto";
import Pagination from "./Pagination";

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
    productos: [], currentProductos: [], currentPage: null, totalPages: null
  }

  onPageChanged = data => {
    const { productos } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProductos = productos.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentProductos, totalPages });
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
  /*
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
    */
  render() {
    this.componentWillMount()
    const { productos, currentProductos, currentPage, totalPages } = this.state;
    const totalProductos = productos.length;

    if (totalProductos === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">

          {currentProductos.map(item => {
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
          }
          )}
        </div>

        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <h2 className={headerClass}>
              <strong className="text-secondary">{totalProductos}</strong> Productos
            </h2>

          </div>


          <div className="d-flex flex-row py-4 align-items-center">
            <Pagination totalRecords={totalProductos} pageLimit={4} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          </div>
          {currentPage && (
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Página <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
            </span>
          )}
        </div>
      </div>
    );
  }
}