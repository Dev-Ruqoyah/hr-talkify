import { useAuth } from "../../context/AuthContext";

const Chat = () => {
    const {currentUser} = useAuth()
    console.log(currentUser);
    
    return ( <>
        <h3>{currentUser.displayName? currentUser.displayName:currentUser.email}</h3>

        
    </> );
}
 
export default Chat;