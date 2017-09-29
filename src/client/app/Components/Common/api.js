import { ApolloClient, createNetworkInterface } from 'react-apollo';
import gql from 'graphql-tag';

export const CLIENT = new ApolloClient({
 	networkInterface: createNetworkInterface({ uri: 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql' }),
});

export const POC_SEARCH = gql`
  query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
	  pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
	    __typename
	    id
	    status
	  }
	}
`;

