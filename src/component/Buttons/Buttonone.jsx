import { Link } from "react-router-dom";

const ButtonOne = ({url,text}) => {
    return ( 
        <>
            <Link to={url}>
                <button className="border px-4 py-2 bg-white rounded-md text-black hover:bg-slate-100 transition-all">{text}</button>
            </Link>
        </>
     );
}
 
export default ButtonOne;