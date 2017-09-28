import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';

import searchBox from '../style/searchbox.scss';
import MdLocationOn from 'react-icons/lib/md/location-on';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';


class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
		}
	}

	onSuggestSelect(suggest) {
		console.log(suggest);
	}
  	render() {
		return (
			<div className={searchBox.searchContainer}>

				<div className={searchBox.fieldBox}>
					<h2>Endereço de entrega</h2>
					<div className={searchBox.addressBox}>
						<MdLocationOn className={searchBox.marker} />
						<Geosuggest
							placeholder="Fala ai o endereço"
							types={['address']}
							suggestsClassName={searchBox.results}
							suggestsHiddenClassName={searchBox.resultsHidden}
							suggestItemActiveClassName={searchBox.resultItemActive}
							inputClassName={searchBox.input}
							onSuggestSelect={(suggest) => this.setState({'address':suggest})} />
					</div>
				</div>
				<div className={searchBox.fieldGroup}>
					<div className={searchBox.fieldBox}>
						<input className={searchBox.input} type="text" name="number" placeholder="Número" autoComplete="off" required />
					</div>
					<div className={searchBox.fieldBox}>
						<input className={searchBox.input} type="text" name="complement" placeholder="Complemento" autoComplete="off" />
					</div>
					<div className={searchBox.buttonBox}>
						<button><FaArrowRight className={searchBox.buttonIcon} /></button>
					</div>
				</div>
			</div>
		)
	}
}

export default SearchBox;