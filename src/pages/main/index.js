import React, { Component } from 'react';
import ProductAPI from '../../services/products.service';
import './styles.css';

export default class Main extends Component {

  state = {
    products: [],
    productInfo: {},
    page: 1,
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await ProductAPI.get(`/products?page=${page}`);
    const { docs, ...productInfo} = response.data;
    this.setState({ products: docs, productInfo, page })
  };

  previousPage = () => {
    const { page } = this.state;
    
    if (page === 1) return;
    
    const pageNumber = page - 1;
    
    this.loadProducts(pageNumber);
  }

  nextPage = () => {
    const { page, productInfo } = this.state;
   
    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };
  

  render() {
    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <a href={product.url} target="_blank">Acessar</a>
          </article>
        ))}

        <div className="actions">
          <button disabled={page === 1} onClick={this.previousPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
        </div>
      </div>
    )
  }
}