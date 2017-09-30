import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { POC_PRODUCTS, CLIENT } from '../Common/api.js';
import Product from './product.js';

import classNames from 'classnames/bind';
import style from './style.scss';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

class ProductList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	products: null,
	     	countTotal: 0
	    }
  	}

  	componentDidMount() {
  		this.requestPOCList('113');
  	}

  	requestPOCList(id) {
		CLIENT.query({
		  query: POC_PRODUCTS,
		  variables: { id: id, search: "", categoryId: 0 },
		}).then((response) => {
			this.onResponse(response.data.poc);
	    }).catch((response) => {
			this.onFail(response)
		});
	}

	onResponse(data) {
		let products = data.products.map((data, index) =>
			data.productVariants[0]
		).map((data) => {
		    return {
		    	title: data['title'],
		    	price: data['price'],
		    	imageUrl: data['imageUrl'],
		    	count: 0
		    }
		})

		this.setState({'products': products});
	}

	onFail(response) {
		// this.setState({'pocResults': false});
		// this.setState({'errorMessage': 'Ops! Não foi possível realizar sua busca, tente novamente dentro de alguns instantes.'})
	}

  	countProduct(event, index, type) {
	  	let products = this.state.products;
  		if( type === "increase" ){
			products[index]['count'] = parseInt(products[index]['count']) + 1;
	    } else if( type === "decrease" ) {
	    	if( products[index]['count'] > 0 ){
				products[index]['count'] = parseInt(products[index]['count']) - 1;
		    }
	    } else {
	    	products[index]['count'] = (event.target.validity.valid) ? event.target.value : products[index]['count'];
	    }

	    this.setState(products);

	    console.log(this.state.products[index].count)
  	}

  	render() {
  		const { countTotal, products } = this.state;
  		let productsResult;

  		if( products !== null ){
  			productsResult = products.map((data, index) => {
				return <Product countProduct={this.countProduct.bind(this)} index={index} key={index} data={data} />
  			})
  		} else {
  			productsResult = <FaCircleONotch className={style.loadingProducts}/>
  		}

		return (
			<section className={style.productPage}>
				{productsResult}
			</section>
		)
	}
}

export default ProductList;
