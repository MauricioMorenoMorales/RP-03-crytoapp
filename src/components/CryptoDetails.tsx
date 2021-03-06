import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';

import LineChart from './LineChart';

import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from '../services/cryptoApi.service';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails: React.FC = () => {
	const { coinId } = useParams<{ coinId: string }>();
	const [timePeriod, setTimePeriod] = useState('7d');
	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistoryData, isFetching: isFetchingCoinHistoryData } =
		useGetCryptoHistoryQuery({ coinId, timePeriod });
	let cryptoDetails = data?.data?.coin;

	const time = ['24h', '7d', '30d', '1y', '5y'];

	// prettier-ignore
	const stats = cryptoDetails
		? [
				{
					title: 'Price to USD',
					value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
					icon: <DollarCircleOutlined />,
				},
				{ title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
				{
					title: '24h Volume',
					value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
					icon: <ThunderboltOutlined />,
				},
				{
					title: 'Market Cap',
					value: `$ ${
						cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
					}`,
					icon: <DollarCircleOutlined />,
				},
				{
					title: 'All-time-high(daily avg.)',
					value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
					icon: <TrophyOutlined />,
				},
			]
		: [
				{
					title: 'No data available',
					value: `Error fetching the data`,
					icon: 'img',
				},
			];

	// prettier-ignore
	const genericStats = cryptoDetails
		? [
				{
					title: 'Number Of Markets',
					value: cryptoDetails.numberOfMarkets,
					icon: <FundOutlined />,
				},
				{
					title: 'Number Of Exchanges',
					value: cryptoDetails.numberOfExchanges,
					icon: <MoneyCollectOutlined />,
				},
				{
					title: 'Aprroved Supply',
					value: cryptoDetails.approvedSupply ? (
						<CheckOutlined />
					) : (
						<StopOutlined />
					),
					icon: <ExclamationCircleOutlined />,
				},
				{
					title: 'Total Supply',
					value: `$ ${millify(cryptoDetails.totalSupply)}`,
					icon: <ExclamationCircleOutlined />,
				},
				{
					title: 'Circulating Supply',
					value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
					icon: <ExclamationCircleOutlined />,
				},
			]
		: [
				{
					title: 'No data available',
					value: `Error fetching the data`,
					icon: 'img',
				},
			];

	if (isFetching) return <h2>Loading....</h2>;

	return (
		<Col className="coin-detail-container">
			<Col className="coin-heading-container">
				<Title level={2} className="coin-name">
					{cryptoDetails.name} ({cryptoDetails.slug}) Price
				</Title>
				<p>
					{cryptoDetails.name} live price in US dollars. View value statistics,
					market cap and supply.
				</p>
			</Col>
			<Select
				defaultValue="7d"
				className="select-timeperiod"
				placeholder="Select Time Period"
				onChange={value => setTimePeriod(value)}
			>
				{time.map(date => (
					<Option key={date} value={date}>
						{date}
					</Option>
				))}
			</Select>
			<LineChart
				coinHistory={coinHistoryData}
				currentPrice={millify(cryptoDetails.price)}
				coinName={cryptoDetails.name}
			/>
			<Col className="stats-container">
				<Col className="coin-value-statistics">
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							{cryptoDetails.name} Value Statistics
						</Title>
						<p>
							An overview showing the stats of {cryptoDetails.name} , such as
							the base and quote currency, the rank, and trading volume.
						</p>
					</Col>
					{stats.map(({ icon, title, value }, index) => (
						<Col className="coin-stats" key={index}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
				<Col className="other-stats-info">
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							Other Statistics
						</Title>
						<p>An overview showing the stats of all cryptocurrencies</p>
					</Col>
					{genericStats.map(({ icon, title, value }, index) => (
						<Col className="coin-stats" key={index}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
			<Col className="coin-desc-link">
				<Row className="coin-desc">
					<Title level={3} className="coin-details-heaindg">
						What is {cryptoDetails.name}
						{HTMLReactParser(cryptoDetails.description)}
					</Title>
				</Row>
				<Col className="coin-links">
					<Title level={3} className="coin-details-heading">
						{cryptoDetails.name} Links
					</Title>
					{cryptoDetails.links.map((link: any) => (
						<Row className="coin-link" key={link.name}>
							<Title level={5} className="link-name">
								{link.type}
							</Title>
							<a href={link.url} target="_blank" rel="noreferrer">
								{link.name}
							</a>
						</Row>
					))}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
