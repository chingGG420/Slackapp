// Sidebar.jsx
import React, { useContext } from 'react';
import { SidebarStyles, ComposeContainer, LogoutButton } from '../styles';
import { RxPencil1 } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import Channels from './SideChannel';
import DMs from './DMs';
import { UserContext } from '../../contexts/User';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sidebar({ setIsNewMessage, setIsModalShow }) {
  const { handleLogout } = useContext(UserContext);

  const handleNewMessage = () => {
    setIsNewMessage((prevState) => !prevState);
  };

  const handleLogoutClick = () => {
    handleLogout();

    // Show a toast notification
    toast.success('Successfully signed out!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
    });
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
