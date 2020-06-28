import React from 'react';
import MediaQuery from 'react-responsive';

import UserBoardDesktop from '../components/UserBoardDesktop';
import UserBoardMobile from '../components/UserBoardMobile';
import MessageContentDesktop from '../components/MessageContentDesktop';
import MessageContentMobile from '../components/MessageContentMobile';
import '../css/MessageChat.css'

class MessageChat extends React.Component {
    render() {
        return (
            <div className="message-chat-container row">
                <MediaQuery minWidth={725} >
                    <UserBoardDesktop/>
                    <MessageContentDesktop/>
                </MediaQuery>
                <MediaQuery maxWidth={725}>
                    <UserBoardMobile/>
                    <MessageContentMobile/>
                </MediaQuery>
            </div>
        )
    }
}

export default MessageChat