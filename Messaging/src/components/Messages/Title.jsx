import React from 'react';
import { MessageTitle, TitleContainer } from '../styles';
import UserList from './UserList';
import { GoKebabHorizontal } from 'react-icons/go';
import useFetch from '../hooks/useFetch';

export default function Title({
	isNewMessage,
	setIsNewMessage,
	selectedUser,
	selectedChannel,
	setIsModalShow,
	setIsChannelInfo,
}) {
	const handleChannelInfo = () => {
		setIsModalShow(true);
		setIsChannelInfo(true);
	};

	const { status, data } = useFetch('http://206.189.91.54/api/v1/users');

	return (
		<MessageTitle>
			{isNewMessage ? (
				<UserList allUsers={data} status={status} setIsNewMessage={setIsNewMessage} />
			) : (
				<TitleContainer>
					<h2>
						{selectedUser
							? selectedUser.email
							: selectedChannel
							? selectedChannel.name
							: 'Never hesitate to start a good conversation.'}
					</h2>
					{selectedChannel && <GoKebabHorizontal onClick={handleChannelInfo} />}
				</TitleContainer>
			)}
		</MessageTitle>
	);
}
