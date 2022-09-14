import { useState } from "react";
import { useAuth } from '../../contexts/Auth';
import { useRouter } from 'next/router';



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
        <div className="pb-2 mx-auto bg-white shadow-xl rounded-2xl md:w-1/2">
            <h1>Hi ...</h1>

             {
             isLoggedIn && <button className="bg-slate-600 " onClick={handleLogout}>LogOut</button>
             }  
        </div>
    );
}

export default App;

