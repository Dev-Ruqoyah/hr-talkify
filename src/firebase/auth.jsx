import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
export const doCreateUserEmailAndPassword = async (email, password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

export const doSignInWithEmailAndPassword = async(email,password)=>{
    return signInWithEmailAndPassword(auth,password)
}
export const doSignInWithGoogle = async()=>{
    const provider = new GoogleAuthProvider()
    const result = signInWithPopup(auth,provider)
    return result
}

export const doSignOut =()=>{
    return auth.signOut()
}