import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebasee';

export default function useAuth() {

    const [currentUser, setCurrentUser] = useState(null);  

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(false);
            }
        });
        
    }, [])
    return { currentUser };
}