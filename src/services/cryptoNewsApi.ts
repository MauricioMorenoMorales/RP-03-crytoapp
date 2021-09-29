import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
	'x-bingapis-sdk': 'true',
	'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
	'x-rapidapi-key': 'd016496cf4mshf87ffef8a6d0a61p1434a3jsne91ea82e08bc',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://bing-news-search1.p.rapidapi.com/news',
	}),
	endpoints: builder => ({
		getCryptoNews: builder.query({
			query: ({ newsCategory, count }) =>
				createRequest(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
				),
		}),
	}),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
