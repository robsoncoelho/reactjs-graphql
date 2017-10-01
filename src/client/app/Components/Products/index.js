import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { POC_PRODUCTS, CLIENT } from '../Common/api.js';

import Product from './product.js';
import Search from './search.js';
import Cart from './cart.js';

import classNames from 'classnames/bind';
import style from './style.scss';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

class Products extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	products: null,
	    	cartProducts: [],
	     	cartAmount: 0,
	     	errorMessage: '',
	     	search: '',
	     	isLoading: false,
	    }
  	}

  	componentDidMount() {
  		this.requestPOCList('113', "", 0);
  	}

  	requestPOCList(id, search, categoryId) {
  		this.setState({'isLoading': true });
		CLIENT.query({ query: POC_PRODUCTS, variables: { id: id, search: search, categoryId: categoryId },
		}).then((response) => {
			this.onResponse(response.data.poc);
	    }).catch((response) => {
			this.onFail(response)
		});
	}

	onResponse(data) {
		this.setState({'isLoading': false });
		const productList = data.products.map((data, index) =>
			data.productVariants[0]
		).map((data) => {
		    return { title: data['title'], price: data['price'], imageUrl: data['imageUrl'], count: 0, priceTotal: 0 }
		})

		if( productList.length > 0 ){
			if( this.state.products === null ) {
				this.setState({'products': productList});
			} else {
				const products = this.state.cartProducts;

				productList.map((product, index) => {
					products.some(function(productCart){
				        if(product.title === productCart.title){
				        	productList[index] = productCart;
				        }

				    });
				})

				this.setState({'products': productList});
			}
		} else {
			this.setState({'errorMessage': 'Nenhum produto localizado'})
		}
	}

	onFail(response) {
		this.setState({'isLoading': false });
		this.setState({'errorMessage': 'Ops! Não foi possível carregar os produtos, tente novamente em instantes.'})
	}

	itemsCount(event, type, product) {
		if( type === "increase" ){
			product['count'] = parseInt(product['count']) + 1;
		} else if( type === "decrease" ){
			if( product['count'] > 0 ){
				product['count'] = parseInt(product['count']) - 1;
			}
		} else {
	    	product['count'] = (event.target.validity.valid) ? event.target.value : product['count'];
	    }

		product['priceTotal'] = product['count'] * product['price'];

		return product;
	}

  	countProduct(event, product, type) {
  		let products = this.state.cartProducts;
  		if( products.length === 0 ){
			product = this.itemsCount(event, type, product);
  			this.countCartAmount(product, 'new');
  		} else {
		  	const productExists = products.filter((data, index) => {
		  		data['index'] = index;
				return data.title === product.title
		  	}).map((data) =>
		  		this.itemsCount(event, type, data)
		  	)

		  	if( productExists.length === 0 ){
				product = this.itemsCount(event, type, product);
		  		this.countCartAmount(product, 'new');
		  	} else {
		  		product = productExists[0];
		  		products[product['index']] = product;
		  		this.countCartAmount(products, 'exists');
		  	}
  		}
  	}

  	countCartAmount(product, type) {
  		let state;
  		if( type === 'new' ){
  			state = [...this.state.cartProducts, product];
  		} else {
  			state = product;
  		}
		this.setState({cartProducts: state}, () => {
		 	const cartAmount = this.state.cartProducts.reduce((sum, i) => (
		    	sum += i.priceTotal
		    ), 0).toFixed(2);
	  		this.setState({cartAmount: parseFloat(cartAmount)});
		})
  	}

  	searchProduct(event) {
	    this.setState({'search': event.target.value});
  	}

  	searchSubmit(event) {
		event.preventDefault();
		this.requestPOCList('113', this.state.search, 0);
	}

  	renderResults() {
  		const {
  			errorMessage,
  			products,
  			isLoading,
  		} = this.state;

  		if( isLoading ) {
  			return (
  				<div className={style.loadingProducts}>
  					<FaCircleONotch className={style.loadingIcon}/>
  				</div>
  			)
  		} else if( products !== null ){
			return (
				<section className={style.productList}>
				{products.map((data, index) =>
					<Product countProduct={this.countProduct.bind(this)} key={index} data={data} />
				)}
				</section>
			)
		} else if( errorMessage !== '' ){
			return ( <p className={style.errorMessage}>{errorMessage}</p> )
		}
  	}

  	render() {
   		const {
  			cartAmount,
  		} = this.state;

		return (
			<div className={style.productPage}>
				<div className={style.productsContainer}>
					<section className={style.filters}>
						<Search searchProduct={this.searchProduct.bind(this)} searchSubmit={this.searchSubmit.bind(this)} />
					</section>
					{this.renderResults()}
				</div>
				<Cart total={cartAmount} />
			</div>
		)
	}
}

export default Products;
