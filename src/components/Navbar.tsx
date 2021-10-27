import { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
	HomeOutlined,
	MoneyCollectOutlined,
	BulbOutlined,
	FundOutlined,
	MenuOutlined,
} from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState<boolean>(false);
	const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = (): void => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		screenSize! < 768 ? setActiveMenu(false) : setActiveMenu(true);
	}, []);

	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={icon} size="large" />
				<Typography.Title level={2} className="logo">
					<Link to="/">Cryptoverse</Link>
				</Typography.Title>
				<Button
					className="menu-control-container"
					onClick={() => setActiveMenu(!activeMenu)}
				>
					<MenuOutlined />
				</Button>
			</div>
			{activeMenu && (
				<Menu theme="dark">
					<Menu.Item icon={<HomeOutlined />}>
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item icon={<FundOutlined />}>
						<Link to="/cryptocurrencies">CrytoCurrencies</Link>
					</Menu.Item>
					<Menu.Item icon={<MoneyCollectOutlined />}>
						<Link to="/exchanges">Exchanges</Link>
					</Menu.Item>
					<Menu.Item icon={<BulbOutlined />}>
						<Link to="/news">News</Link>
					</Menu.Item>
				</Menu>
			)}
		</div>
	);
};

export default Navbar;
