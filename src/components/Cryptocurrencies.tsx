import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi.service';

const Cryptocurrencies: React.FC<{ simplified?: boolean }> = ({
	simplified,
}) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState<any>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin: any) =>
			coin.name.toLowerCase().includes(searchTerm),
		);
		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);
	if (isFetching) return <h2>Loading ...</h2>;
	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={event => setSearchTerm(event.target.value)}
					/>
				</div>
			)}
			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((currency: any) => (
					<Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
						<Link to={`/crypto/${currency.id}`}>
							<Card
								title={`${currency.rank}.${currency.name}`}
								extra={
									<img
										className="crytpo-image"
										src={currency.iconUrl}
										height="40px"
										width="40px"
									/>
								}
								hoverable
							>
								<p>Price: {millify(currency.price)}</p>
								<p>Market Cap: {millify(currency.marketCap)}</p>
								<p>Daily Change: {millify(currency.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
