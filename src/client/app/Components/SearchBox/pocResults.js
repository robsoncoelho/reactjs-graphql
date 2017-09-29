import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { POC_SEARCH } from '../Common/queries.js';

function POCList($datetime, $algorithm, $lat, $long) {
		return graphql(POC_SEARCH, {
		 	options: () => ({ variables: { now: $datetime, algorithm: $algorithm, lat: $lat, long: $long } })
		})
	}
}

// export default graphql(POC_SEARCH, {
//   options: () => ({ variables: { now: "2017-08-01T20:00:00.000Z", algorithm: "NEAREST", lat: "-23.632919", long: "-46.699453" } })
// })(Header);