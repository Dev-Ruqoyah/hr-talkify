import { useEffect, useState } from "react";
import NavBar from "../../component/NavBar/NavBar";
import ButtonOne from "../../component/Buttons/Buttonone";
import dish from '../../assets/dish.webp'

const Home = () => {
  const [showDish, setShowDish] = useState(false);
  useEffect(()=>{
    const timer = setTimeout(()=>[
        setShowDish(true)
    ],4000)
    return ()=>clearTimeout(timer)
  },[])
  return (
    <>
      <div className="container mx-auto px-10 dark:bg-black h-screen dark:text-white ">
        <div className="py-3">
          <NavBar />
        </div>
        <div className="grid md:grid-cols-2  md:h-[80vh]">
          <div className="flex mb-5 flex-col items-center justify-center gap-2">
            <h2 className="text-4xl font-bold">Welcome to Recipe AI</h2>
            <p className="">
              Enter the ingredients you have, and let our AI create delicious
              recipes for you!
            </p>
            <ButtonOne text={"Get Started"} url={"/login"}/>
          </div>
          <div className="flex flex-col items-center justify-center h-full bg-slate-300 rounded-md">
            {/* Ingredients List */}
            {!showDish && (
              <ul className="animate-fade-in space-y-2 text-lg font-medium text-gray-700" aria-live="polite">
                <li>🍝 Spaghetti pasta</li>
                <li>🍅 Tomatoes</li>
                <li>🧀 Grated Parmesan cheese</li>
                <li>🧄 Garlic</li>
                <li>🌶️ Spices</li>
              </ul>
            )}

            {/* Dish Image */}
            {showDish && (
              <img
                src={dish}
                alt="Final Dish"
                className="animate-scale-up w-2/3 h-2/3 object-cover rounded-md shadow-lg"
              />
             
            )}
            <p className="text-center w-2/3 text-black italic font-light ">Don't know what to cook with the ingredients in your kitchen? Our AI-powered Recipe
            Generator takes your available ingredients and generates creative recipes for you to try</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
