// useRoleBasedAccess.js
import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalStore } from '../App';


const useRoleBasedAccess = (permittedRoles) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {authUser, notify} = useContext(GlobalStore)

    function getUserRole(){
        return authUser.role
    }

    useEffect(() => {
        // Assuming you have a way to get the user's role (replace this with your actual logic)
        const userRole = getUserRole();

        // Check if the user's role is not in the permitted roles
        if (!permittedRoles.includes(userRole)) {
            // Redirect to the base route
            navigate('/beers');
            notify({
                title: "Access Denied!",
                body: "You do not have access to that page",
                timeout: 7000,
            })
        } // eslint-disable-next-line
    }, [permittedRoles, navigate, location]);


    // You can also return the user's role if needed
    // return getUserRole();
};

export default useRoleBasedAccess;
