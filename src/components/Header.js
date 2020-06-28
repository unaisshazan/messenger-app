import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <Link to="/">
                    <h1 className="brand-name">
                        Talkie Chit-Chat
                    </h1>
                </Link>
            </nav>
        )
    }
}

export default Header;