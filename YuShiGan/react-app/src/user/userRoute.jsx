import React from 'react';
import { Navigate } from 'react-router-dom';

// This component wraps routes that require an admin role
const UserRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token || role !== 'user') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default UserRoute;
