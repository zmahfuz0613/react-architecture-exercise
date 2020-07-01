import React, { Component } from 'react'
import './Products.css'

import Product from '../../components/Product/Product'
import Search from '../../components/Search/Search'
import { AZ, ZA, lowestFirst, highestFirst } from "../../utils/sort"
import Sort from '../../components/Sort/Sort'
import Layout from '../../components/shared/Layout/Layout'
import { getProducts } from '../../services/products'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      allProducts: [],
      queriedProducts: [],
      sortType: ''
    }
  }

  async componentDidMount() {
    const allProducts = await getProducts()
    this.setState({ 
      allProducts: allProducts,
      queriedProducts: allProducts 
    })
  }

  handleSearch = event => {
    const sort = () => this.handleSort(this.state.sortType)
    const queriedProducts = this.state.allProducts.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState({ queriedProducts }, sort)
  }

  handleSort = type => {
    this.setState({ sortType: type })
    const { queriedProducts } = this.state
    switch (type) {
      case "name-ascending":
        this.setState({
          queriedProducts: AZ(queriedProducts)
        });
        break
      case "name-descending":
        this.setState({
          queriedProducts: ZA(queriedProducts)
        });
        break
      case "price-ascending":
        this.setState({
          queriedProducts: lowestFirst(queriedProducts)
        });
        break
      case "price-descending":
        this.setState({
          queriedProducts: highestFirst(queriedProducts)
        });
        break
      default:
        break
    }
  }

  handleSubmit = event => event.preventDefault()

  render() {
    const productsJSX = this.state.queriedProducts.map((product, index) =>
      <Product _id={product._id} name={product.name} imgURL={product.imgURL} price={product.price} key={index} />
    )

    return (
      <Layout>
        <Search onSubmit={this.handleSubmit} onChange={this.handleSearch} />
        <Sort onSubmit={this.handleSubmit} onChange={this.handleSort} />
        <div className="products">
          {productsJSX}
        </div>
      </Layout>
    )
  }
}

export default Products