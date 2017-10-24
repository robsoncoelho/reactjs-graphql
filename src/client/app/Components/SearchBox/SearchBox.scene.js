import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { POC_SEARCH, CLIENT } from '../Common/api.js';
import classNames from 'classnames/bind';

import { connect } from 'react-redux';
import { setPocResults } from './SearchBox.actions';

import MdLocationOn from 'react-icons/lib/md/location-on';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';

import style from './style.scss';

const initialState = {
	showComplementBox: false,
	waitingData: false,
	resultStatus: '',
	handleSubmit: false,
	address: {
		name: null,
		location: {},
		number: '',
		complement: '',
	}
}

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	reset() {
		this.setState(initialState);
	}

	onSuggestSelect(suggest) {
		let address = this.state.address;
		address['name'] = suggest.description;
		address['location'] = suggest.location;

		let number = suggest.gmaps.address_components.filter((item) => item.types == 'street_number');

		if( number[0] ){
			address['number'] = number[0].long_name;
		}

		this.setState({ address });
		this.setState({ showComplementBox: true });
	}

	onSuggestBlur(suggest) {
		if( suggest === '' ){
			this.reset();
		}
	}

	handleFormChange(field, event) {
		let address = this.state.address;
		address[field] = event.target.value;
		this.setState({ address });
	}

	handleFormFocus() {
		this.props.setPocResults(false);
		this.setState({ handleSubmit: false });
	}

	handleFormSubmit(event) {
		event.preventDefault();

		let requiredFields = true;

		if( !this.state.address['name'] || !this.state.address['number'] ){
			requiredFields = false;
		}

		if( !this.state.waitingData ){
			if( requiredFields ){
				let date = new Date().toISOString();
				this.requestPOCList(date, this.state.address.location.lat, this.state.address.location.lng);
				this.setState({ waitingData: true });
			}
		}

		this.setState({ handleSubmit: true });
	}

	requestPOCList(datetime, lat, lng) {
		CLIENT.query({
		  query: POC_SEARCH,
		  variables: {
		  	now: datetime,
		  	algorithm: "NEAREST",
		  	lat: lat,
		  	long: lng
		  },
		}).then((response) => {
			this.onResponse(response.data.pocSearch);
	    }).catch((response) => {
			this.onFail(response)
		});
	}

	onResponse(data) {
		this.setState({ waitingData: false });
		if( data.length > 0 ){
			if( data[1].status === "AVAILABLE" ){
				this.props.setPocResults(data[1]);
				this.setState({ resultStatus: data[1].status }); 
			} else {
				this.props.setPocResults(data[1]);
				this.setState({ resultStatus: "NOT_AVAILABLE" });
			}
		} else {
			this.props.setPocResults(false);
			this.setState({ resultStatus: "NO_RESULTS" });
		}
	}

	onFail(response) {
		this.props.setPocResults(false);
		this.setState({ resultStatus: "REQUEST_ERROR" });
	}

	setErrorMessage(status) {
		switch(status){
			case 'NOT_AVAILABLE':
				return 'Nossos fornecedores nessa região não estão disponíveis no momento.';
			break;
			case 'NO_RESULTS':
				return 'Ops! Não temos fornecedores para atender essa região no momento.';
			break;
			case 'REQUEST_ERROR':
				return 'Ops! Não foi possível realizar sua busca, tente novamente dentro de alguns instantes.';
			break;
			default:
				return false;
			break;
		}
	}

  	render() {
  		const {
  			pocResults
  		} = this.props;

  		const {
			waitingData,
  			showComplementBox,
  			address,
  			handleSubmit,
  			resultStatus,
  		} = this.state;

  		const errorMessage = this.setErrorMessage(resultStatus);

  		let Iconsubmit,
  			inputText = true;

  		if( !waitingData ){
  			Iconsubmit = <FaArrowRight className={style.buttonIcon} />
  		} else {
  			Iconsubmit = <FaCircleONotch className={style.buttonLoading} />
  		}

		if( pocResults.id ){
	      	return (
	        	<Redirect to={{pathname: '/products', state: { pocSearch: pocResults, address: address }}} />
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
							{ !address.name && handleSubmit &&
								<span className={style.labelError}>{'Endereço não informado.'}</span>
							}
						</div>
					</div>
					<div className={classNames(style.fieldGroup, showComplementBox && style.showFieldGroup)}>
						<div className={style.fieldBox}>
							<input
								onFocus={this.handleFormFocus.bind(this)}
								onChange={this.handleFormChange.bind(this, "number")}
								value={address.number}
								disabled={waitingData}
								type="text"
								name="number"
								placeholder="Número"
								autoComplete="off" />
							{ !address.number && handleSubmit &&
								<span className={style.labelError}>{'Número não informado.'}</span>
							}
						</div>
						<div className={style.fieldBox}>
							<input
								onFocus={this.handleFormFocus.bind(this)}
								onChange={this.handleFormChange.bind(this, "complement")}
								value={address["complement"]}
								disabled={waitingData}
								type="text"
								name="complement"
								placeholder="Complemento"
								autoComplete="off" />
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

const mapStateToProps = (state, ownProps) => {
  return {
    pocResults: state.searchBox
  }
};

const mapDispatchToProps = dispatch => ({
  setPocResults: (result) => {
    dispatch(setPocResults(result));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

