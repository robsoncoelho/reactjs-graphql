import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { POC_SEARCH, CLIENT } from '../Common/api.js';

import classNames from 'classnames/bind';
import style from './style.scss';
import MdLocationOn from 'react-icons/lib/md/location-on';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: {
				name: '',
				location: {},
				number: '',
				complement: '',
			},
			pocResults: false,
			errorMessage: '',
			fieldErrors: {},
			waitingData: false,
			showComplementBox: false,
		}

		this.baseState = this.state;
	}

	onSuggestSelect(suggest) {
		let fields = this.state.address;
		fields['name'] = suggest.description;
		fields['location'] = suggest.location;

		let number = suggest.gmaps.address_components.filter((item) => item.types == 'street_number');

		if( number[0] ){
			let fields = this.state.address;
			fields['number'] = number[0].long_name;
		}

		this.setState({'showComplementBox': true})
		this.setState({fieldErrors: ''})
		this.setState({fields})
	}

	onSuggestBlur(suggest) {
		if( suggest === '' ){
			this.setState(this.baseState);
		}
	}

	handleFormChange(field, event) {
		let fields = this.state.address;
		fields[field] = event.target.value;        
		this.setState({fields});
		this.setState({fieldErrors: ''})
	}

	handleFormFocus() {
		this.setState({pocResults: false})
		this.setState({errorMessage: ''})
	}

	handleFormSubmit(event) {
		event.preventDefault();

		let fieldErrors = {};
		let isValid = true;

		if( this.state.address.name === ''){
			fieldErrors["address"] = "Endereço não informado";
			isValid = false;
		}
		if( this.state.address.number === ''){
			fieldErrors["number"] = "Número não informado";
			isValid = false;
		}

		if(!this.state.waitingData ){
			if( isValid ){
				let date = new Date().toISOString();
				this.requestPOCList(date, this.state.address.location.lat, this.state.address.location.lng);
				this.setState({waitingData: true})
			} else {
				this.setState({fieldErrors: fieldErrors})
			}
		}
	}

	requestPOCList(datetime, lat, lng) {
		CLIENT.query({
		  query: POC_SEARCH,
		  variables: { now: datetime, algorithm: "NEAREST", lat: lat, long: lng },
		}).then((response) => {
			this.onResponse(response.data.pocSearch);
	    }).catch((response) => {
			this.onFail(response)
		});
	}

	onResponse(data) {
		this.setState({waitingData: false});
		if( data.length > 0){
			if( data[0].status === "AVAILABLE" ){
				this.setState({'pocResults': data[0]});
			} else {
				this.setState({'pocResults': false});
				this.setState({'errorMessage': 'Nossos fornecedores nessa região não estão disponíveis no momento.'})
			}
		} else {
			this.setState({'pocResults': false});
			this.setState({'errorMessage': 'Ops! Não temos fornecedores para atender essa região no momento.'})
		}
	}

	onFail(response) {
		this.setState({'pocResults': false});
		this.setState({'errorMessage': 'Ops! Não foi possível realizar sua busca, tente novamente dentro de alguns instantes.'})
	}

  	render() {
  		const {
  			showComplementBox,
  			address,
  			fieldErrors,
  			waitingData,
  			pocResults,
  			errorMessage
  		} = this.state;

  		let Iconsubmit;

  		if( !waitingData ){
  			Iconsubmit = <FaArrowRight className={style.buttonIcon} />
  		} else {
  			Iconsubmit = <FaCircleONotch className={style.buttonLoading} />
  		}

		if (pocResults) {
	      	return (
	        	<Redirect to={'/products'} />
	      	)
		}

		return (
			<div className={style.searchContainer}>
				<form onSubmit={this.handleFormSubmit.bind(this)}>
					<div className={style.fieldBox}>
						<h2>Endereço de entrega</h2>
						<div className={style.addressBox}>
							<MdLocationOn className={style.marker} />
							<Geosuggest
								placeholder="Fala ai o endereço"
								types={['address']}
								suggestsClassName={style.results}
								suggestsHiddenClassName={style.resultsHidden}
								suggestItemActiveClassName={style.resultItemActive}
								onBlur={this.onSuggestBlur.bind(this)}
								onFocus={this.handleFormFocus.bind(this)}
							 	disabled={waitingData}
							 	country={['br']}
								onSuggestSelect={this.onSuggestSelect.bind(this)} />
							<span className={style.labelError}>{fieldErrors["address"]}</span>
						</div>
					</div>
					<div className={classNames(style.fieldGroup, showComplementBox && style.showFieldGroup)}>
						<div className={style.fieldBox}>
							<input onFocus={this.handleFormFocus.bind(this)} onChange={this.handleFormChange.bind(this, "number")} value={address["number"]} disabled={waitingData} type="text" name="number" placeholder="Número" autoComplete="off" />
							<span className={style.labelError}>{fieldErrors["number"]}</span>
						</div>
						<div className={style.fieldBox}>
							<input onFocus={this.handleFormFocus.bind(this)} onChange={this.handleFormChange.bind(this, "complement")} value={address["complement"]} disabled={waitingData} type="text" name="complement" placeholder="Complemento" autoComplete="off" />
						</div>
						<div className={style.buttonBox}>
							<button type="submit">
								{Iconsubmit}
							</button>
						</div>
					</div>
				</form>
				{ !pocResults &&
					<div className={style.errorMessage}><p>{errorMessage}</p></div>
				}
			</div>
		)
	}
}

export default SearchBox;

