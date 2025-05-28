import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role }) => {
    const token = useSelector(state => state.auth.token); // Get token from Redux store
    const user_type = useSelector(state => state.auth.user_type); // Get user_type from Redux store

    console.log("Token in ProtectedRoute:", token); // Debugging
    console.log("UserType in ProtectedRoute:", user_type); // Debugging

    // Redirect to login if token or user_type is missing
    if (!token || !user_type) {
        console.log("Missing token or user_type. Redirecting to /Login.");
        return <Navigate to="/Login" />;
    }

    // Role mismatch logic
    if (role && role !== user_type) {
        console.log("Role mismatch. Redirecting to /Login.");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ children, role }) => {
//     const token = useSelector(state => state.auth.token); // Get token from Redux store
//     const userType = useSelector(state => state.auth.userType); // Get userType from Redux store

//     console.log("Token in ProtectedRoute:", token); // Debugging
//     console.log("UserType in ProtectedRoute:", userType); // Debugging

//     // Redirect to login if token or userType is missing
//     if (!token || !userType) {
//         console.log("Missing token or userType. Redirecting to /Login.");
//         return <Navigate to="/Login" />;
//     }

//     // Role mismatch logic
//     if (role && role !== userType) {
//         console.log("Role mismatch. Redirecting to /Login.");
//         return <Navigate to="/login" />;
//     }

//     return children;
// };

// export default ProtectedRoute;