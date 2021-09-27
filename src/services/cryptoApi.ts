// const axios = require("axios").default;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const cryptoApiHeaders = {
	'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
	'x-rapidapi-key': 'd016496cf4mshf87ffef8a6d0a61p1434a3jsne91ea82e08bc',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com/exchanges';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

const options = {
	method: 'GET',
	url: 'https://coinranking1.p.rapidapi.com/exchanges',
	headers: {
		'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
		'x-rapidapi-key': 'd016496cf4mshf87ffef8a6d0a61p1434a3jsne91ea82e08bc',
	},
};

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: builder => ({
		getCryptos: builder.query({
			query: () => createRequest('/coins'),
		}),
	}),
});
