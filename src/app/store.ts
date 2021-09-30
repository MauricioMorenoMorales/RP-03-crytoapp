import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi.service';
import { cryptoNewsApi } from '../services/cryptoNewsApi.service';

export default configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
		[cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
	},
});
