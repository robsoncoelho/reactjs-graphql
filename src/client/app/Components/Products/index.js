import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { POC_PRODUCTS } from '../Common/api.js';
import Product from './product.js';

import classNames from 'classnames/bind';
import style from './style.scss';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

class Products extends Component {

  	render() {
  		const { data: { poc } } = this.props;
  		let productsResult;

  		if( poc ){
  			productsResult = poc.products.map((data, index) =>
				<Product key={index} data={data} />
			)
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

export default graphql(POC_PRODUCTS, {
	options: () => ({ variables: { id: "113", search: "", categoryId: 0 } })
})(Products);
