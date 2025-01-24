import ButtonOne from "../Buttons/Buttonone";

const NavBar = () => {
    return ( 
        <>
            <div className="container mx-auto border bg-orange-500 rounded-md  dark:text-white px-10 shadow-md py-3">
                <div className="flex justify-between items-center">
                    <div className="brand">
                        <h4 className="text-xl font-bold italic">Recipy</h4>
                    </div>
                    <div className="butt">
                        <ButtonOne url={"/login"} text={"Get Started"}/>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default NavBar;