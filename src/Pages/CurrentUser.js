import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebasee';

export default function useAuth() {

    const [currentUser, setCurrentUser] = useState(null); 
    const [currentUserID, setCurrentUserID] = useState(null); 

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setCurrentUserID(user.uid);
            } else {
                setCurrentUser(false);
            }
        });
        
    }, [])
    return { currentUser, currentUserID };
}