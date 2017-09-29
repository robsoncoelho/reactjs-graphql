import React, {Component} from 'react';

import style from './style.scss';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

class Product extends React.Component {
  	constructor(props) {
	    super(props);
	    this.state = {
	     	count: ''
	    }
  	}

  	handleFormChange(event) {
		const count = (event.target.validity.valid) ? event.target.value : this.state.count;
		this.setState({ count });
	}

	render() {
		const product = this.props.data.productVariants[0];		

		return (
			<div className={style.product}>
				<div className={style.top}>
					<p className={style.productTitle}>{product.title}</p>
					<img src={product.imageUrl} />
				</div>
				<div>
					<p className={style.productValue}><span>R$</span> {product.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
					<div className={style.productCounter}>
						<button><FaMinus className={style.buttonIcon} /></button>
						<input pattern="[0-9]*" onInput={this.handleFormChange.bind(this)} type="text" name="counter" value={this.state.count} />
						<button><FaPlus className={style.buttonIcon} /></button>
					</div>
				</div>
			</div>
		)
	}
}

export default Product;