import { useState } from "react";
import { useAuth } from '../../contexts/Auth';
import { useRouter } from 'next/router';

import {PatientProfile } from '../../components/ProfileComponents/Patient/PatientProfile'


function App() {
    
    const { logout,isAuth } = useAuth();
    const router = useRouter();
    const isLoggedIn = isAuth()
    
    function handleLogout(e) {  
        e.preventDefault();
        logout()
        router.push('login');
    }
    return (
            <>
                <PatientProfile/>
            </>
    );
}

export default App;

