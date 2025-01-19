import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../../firebase/firebase";
import { useContext } from "react";

const AuthContext = createContext()
export function useAuth(){
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const[currentUser,setCurrentUser] = useState(null)
    const[userLoggedIn,setUserLoggedIn] = useState(false)
    const[loading,setIsloading] = useState(true)

    const initializeUser =  async (user) => {
        if(user){
            setCurrentUser({...user})
            setUserLoggedIn(true)
        }else{
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setIsloading(false)
        
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeUser)
        return unsubscribe;
    },[])
    const value = {
        currentUser,
        userLoggedIn,
        loading
    }
    return ( 
        <>
            <AuthContext.Provider value={value}>
                {!loading && children}

            </AuthContext.Provider>
        </>
     );
}
 
export default AuthProvider;