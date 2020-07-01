import React, { Component } from 'react';
import './ProductCards.css';
import ProductCard from '../ProductCard/ProductCard'
import { getProducts } from '../../services/products'

class ProductCards extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  async componentDidMount() {
    const products = await getProducts()
    this.setState({ products })
  }

  render() {

    const CARDS = this.state.products.reverse().map((product, index) =>
      index < 8 ? <ProductCard _id={product._id} name={product.name} imgURL={product.imgURL} key={index} /> : null
    )

    return (
      <div className="product-cards">
        <div className="latest">LATEST</div>
        <div className="cards">
          {CARDS}
        </div>
      </div>
    )
  }
}

export default ProductCards