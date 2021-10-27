import { Switch, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Typography, Space } from 'antd';
import './App.css';

import {
	Navbar,
	Exchanges,
	Homepage,
	Cryptocurrencies,
	News,
	CryptoDetails,
} from './components';

const App: React.FC = () => {
	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="routes">
						<Switch>
							<Route exact path="/" component={Homepage} />
							<Route exact path="/exchanges" component={Exchanges} />
							<Route
								exact
								path="/cryptocurrencies"
								component={Cryptocurrencies}
							/>
							<Route exact path="/crypto/:coinId" component={CryptoDetails} />
							<Route exact path="/news" component={News} />
						</Switch>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title
						level={5}
						style={{ color: 'white', textAlign: 'center' }}
					>
						Cryptoverse <br />
						All rights reserved
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link>
						<Link to="/exchanges">Exchanges</Link>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default App;
