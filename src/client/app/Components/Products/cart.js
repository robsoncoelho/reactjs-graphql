import React, {Component} from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';

import style from './style.scss';

const Cart = ({ total }) => (
	<section className={style.cart}>
		<p className={style.productTitle}><span>Total: R$ </span>{total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
	</section>
)

export default Cart;