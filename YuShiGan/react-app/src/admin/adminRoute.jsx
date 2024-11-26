import React from 'react';
import { Navigate } from 'react-router-dom';

// This component wraps routes that require an admin role
const AdminRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token || role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
