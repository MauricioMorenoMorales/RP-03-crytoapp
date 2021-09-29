import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
	'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News: React.FC<{ simplified?: boolean }> = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState<any>('Cryptocurrency');
	const { data } = useGetCryptosQuery(100);
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory: newsCategory,
		count: simplified ? 6 : 16,
	});
	if (!cryptoNews?.value) return <h2>Loading...</h2>;
	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a Crypto"
						optionFilterProp="children"
						onChange={value => setNewsCategory(value)}
						filterOption={(input, option) =>
							option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{data?.data?.coins.map((coin: any) => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			{cryptoNews.value.map((news: any, index: any) => (
				<Col xs={24} sm={12} lg={8} key={index}>
					<Card hoverable className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title level={5} className="news-title">
									{news.name}
								</Title>
								<img
									style={{
										maxWidth: '200px',
										maxHeight: '200px',
										borderRadius: '5px',
									}}
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt="news"
								/>
							</div>
							<p>
								{news.description > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail?.contentUrl ||
											demoImage
										}
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
