import React, {Component} from 'react';

import style from './style.scss';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

const Product = ({ data, countProduct, handleFormChange }) => (
	<div className={style.product}>
		<div className={style.top}>
			<p className={style.productTitle}>{data.title}</p>
			<img src={data.imageUrl} />
		</div>
		<div>
			<p className={style.productValue}><span>R$</span> {data.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
			<div className={style.productCounter}>
				<button onClick={(e) => countProduct(e, data, "decrease")}><FaMinus className={style.buttonIcon} /></button>
				<input pattern="[0-9]*" onChange={(e) => countProduct(e, data)} type="text" name="counter" value={data.count} />
				<button onClick={(e) => countProduct(e, data, "increase")}><FaPlus className={style.buttonIcon} /></button>
			</div>
		</div>
	</div>
)

export default Product;