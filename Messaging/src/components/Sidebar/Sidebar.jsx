// Sidebar.jsx
import React, { useContext } from 'react';
import { SidebarStyles, ComposeContainer, LogoutButton } from '../styles';
import { RxPencil1 } from "react-icons/rx";
import { MdLogout } from 'react-icons/md';
import Channels from './SideChannel';
import DMs from './DMs';
import { UserContext } from '../../contexts/User';

export default function Sidebar({ setIsNewMessage, setIsModalShow }) {
	const { handleLogout } = useContext(UserContext); // Use useContext to get the handleLogout function

	const handleNewMessage = () => {
		setIsNewMessage(prevState => !prevState);
	};

	const handleLogoutClick = () => {
		handleLogout();
	};

	return (
		<SidebarStyles>
			<div>
				<h1>BackRooms</h1>
				<ComposeContainer onClick={handleNewMessage} title="Compose">
							<RxPencil1 /> Compose
				</ComposeContainer>
				<Channels setIsModalShow={setIsModalShow} />
				<DMs />
			</div>
			<LogoutButton onClick={handleLogoutClick}>
				<MdLogout />
				<span>Sign Out</span>
			</LogoutButton>
		</SidebarStyles>
	);
}
