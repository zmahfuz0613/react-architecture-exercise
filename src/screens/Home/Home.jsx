import React from 'react'
import './Home.css'
import ProductCards from '../../components/ProductCards/ProductCards'
import Layout from '../../components/shared/Layout/Layout'

const Home = () => {
  return (
    <Layout>
      <div className="home">
        <ProductCards />
      </div>
    </Layout>
  )
}

export default Home