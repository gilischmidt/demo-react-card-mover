import React from "react";
import {useSelector} from "react-redux";
import {PanTool} from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function UserList() {
    const users = useSelector((state) => state.users.connectedUsers);
    const currentUser = useSelector((state) => state.session.currentUser);

    const renderUserIcon = user => {
        if (user.isMovingCard === true) {
            return (<PanTool/>)
        } else {
            return (<AccountCircleIcon/>);
        }
    };

    return (
        <div style={{
            background: '#f7f7f7',
            borderRight: '1px solid #ececec',
            height: 'calc(100% - 10px)',
            padding: 5
        }}>
            <h4 style={{
                margin: 5,
                marginBottom: 10
            }}> Connected users:</h4>

            <ul style={{
                listStyleType: 'none',
                padding: 10,
            }}>

                {users.map((user, index) => (
                    <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 10,
                        borderBottom: '1px solid #c9c9c9',
                        borderLeft: user.isMovingCard ? '4px solid black' : 'none'
                    }}>
                        {renderUserIcon(user)}

                        <span style={{
                            marginLeft: 5,
                            fontWeight: user.id === currentUser.id ? 'bold' : 'initial'
                        }}>{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;
