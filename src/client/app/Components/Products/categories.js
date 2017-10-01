import React, {Component} from 'react';
import { POC_CATEGORIES, CLIENT } from '../Common/api.js';

import style from './style.scss';
import FaSearch from 'react-icons/lib/fa/search';

class Categories extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	categories: null,
	    }
  	}

  	requestCategories(lat, lng, now) {
  		CLIENT.query({ query: POC_CATEGORIES, variables: { algorithm: "NEAREST", lat: lat, long: lng, now: now },
		}).then((response) => {
			this.onResponse(response.data.allCategory);
	    }).catch((response) => {
			this.onFail(response)
		});
	}

	onResponse(data) {
		this.setState({categories: data})
	}

	onFail(response) {

	}

	render() {
		const { categories } = this.state;
		const { address } = this.props;
		let options;

		if( address && !categories ){
			const now = new Date().toISOString();
  			this.requestCategories(address.location.lat, address.location.lng, now);
		}

		if( categories ){
			options = categories.map((data, index) =>
				<option key={index} value={data.id}>{data.title}</option>
			)
		}

		return (
			<div className={style.categoryField}>
				<form>
					<select value={this.props.value} onChange={(e) => this.props.filterCategory(e)}>
						<option value={0}>{'Todos'}</option>
						{options}
					</select>
				</form>
			</div>
		)
	}
}

export default Categories;