import React, { useState, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../../contexts/User';

import { FlexContainer, MessageContainer } from '../styles';
import Sidebar from '../Sidebar/Sidebar';
import Messages from '../Messages/Chats';
import TopBar from '../Topbar/TopBar';
import Title from '../Messages/Title';
import Modal from '../modal/Modals';
import NewChannel from '../modal/NewChannel';
import ChannelInfo from '../modal/Channel';

export default function Dashboard() {
	const {
		user: { isLoggedIn },
	} = useContext(UserContext);
	const [selectedChannel, setSelectedChannel] = useState({});
	const [isNewMessage, setIsNewMessage] = useState(false);
	const [isModalShow, setIsModalShow] = useState(false);
	const [isChannelInfo, setIsChannelInfo] = useState(false);

	if (!isLoggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<TopBar />
			<FlexContainer>
				<Sidebar setIsNewMessage={setIsNewMessage} setIsModalShow={setIsModalShow} />
				<Routes>
					<Route
						path="/:id"
						element={
							<Messages
								isNewMessage={isNewMessage}
								setIsNewMessage={setIsNewMessage}
								setIsModalShow={setIsModalShow}
								setIsChannelInfo={setIsChannelInfo}
								selectedChannel={selectedChannel}
								setSelectedChannel={setSelectedChannel}
							/>
						}
					/>
					<Route
						path="/"
						element={
							<MessageContainer>
								<Title isNewMessage={isNewMessage} setIsNewMessage={setIsNewMessage} />
							</MessageContainer>
						}
					/>
				</Routes>
				<Modal
					isModalShow={isModalShow}
					setIsModalShow={setIsModalShow}
					setIsChannelInfo={setIsChannelInfo}>
					{isChannelInfo ? <ChannelInfo selectedChannel={selectedChannel} /> : <NewChannel />}
				</Modal>
			</FlexContainer>
		</>
	);
}