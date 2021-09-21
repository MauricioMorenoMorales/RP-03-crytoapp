import { Switch, Route, Link } from 'react-router-dom';
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
							//! si hay un bug en la navegación entonces revisa aquí ershiwu
							sanshijiu
							<Route exact path="/" component={Homepage} />
							<Route exact path="/exchanges" component={Exchanges} />
							<Route
								exact
								path="/criptocurrencies"
								component={Cryptocurrencies}
							/>
							<Route exact path="/crypto/:coinId" component={CryptoDetails} />
							<Route exact path="/news" component={News} />
						</Switch>
					</div>
				</Layout>
			</div>
			<div className="footer"></div>
		</div>
	);
};

export default App;
