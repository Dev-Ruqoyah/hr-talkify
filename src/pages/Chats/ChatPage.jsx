import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { doSignOut } from "../../firebase/auth";
import axios from "axios";
import { Link, Links, Navigate, useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";

const Chat = () => {
  const { currentUser } = useAuth();
  const { inputs, addInputs, addMessages, messages } = useChat();
  const navigate = useNavigate();
  let userName = currentUser?.displayName || "User";
  let firstname = userName.split(" ")[0].toLowerCase();

  // const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   console.log(inputs);
  // }, [input]);

  const generateRecipe = async () => {
    const inputValue = input.trim();
    addInputs(inputValue);

    if (inputValue === "") return;

    const userMessage = {
      text: inputValue,
      sender: "user",
      id: `req${Math.floor(Math.random() * 1000000)}`,
      date: new Date()
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(/\s/g, " "), // remove the space before AM/PM
    };

    // setMessage((prev) => [...prev, userMessage]);
    addMessages(userMessage);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue
          .split(",")[0]
          .trim()}`
      );
      console.log(response);

      if (response.status === 200 && response.data.meals) {
        const meals = response.data.meals.map((meal) => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
          idMeal: meal.idMeal,
        }));

        const botMessage = {
          meals, // Add meals array here
          sender: "bot",
          id: `res${Math.floor(Math.random() * 1000000)}`,
          date: new Date()
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(/\s/g, " "),
        };
        // setMessage((prev) => [...prev, botMessage]);
        addMessages(botMessage);
      } else {
        const botMessage = {
          text: "No meals found for the given ingredients.",
          sender: "bot",
          id: `res${Math.floor(Math.random() * 1000000)}`,
          date: new Date()
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(/\s/g, " "),
        };
        // setMessage((prev) => [...prev, botMessage]);
        addMessages(botMessage);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      const botMessage = {
        text: "An error occurred while fetching recipes. Please try again later.",
        sender: "bot",
        id: `err${Math.floor(Math.random() * 1000000)}`,
        date: new Date()
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace(/\s/g, " "),
      };
      // setMessage((prev) => [...prev, botMessage]);
      addMessages(botMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateRecipe();
    }
  };
  const showModalFunc = () => {
    setShowModal(!showModal);
    console.log("clicked");
  };

  return (
    <div className="flex flex-col h-screen bg-orange-200">
      {/* Header */}
      <div className="bg-orange-300 relative flex justify-between px-4 text-white text-center py-2 text-xl font-semibold">
        <p>RecipeAI Chat</p>
        <div
          className="h-10 w-10 rounded-full flex justify-center items-center bg-orange-800 cursor-pointer border"
          onClick={showModalFunc}
        >
          <p className="text-center">{firstname.split("")[0].toUpperCase()}</p>
        </div>
      </div>
      <div
        className={`box absolute right-4 top-14 bg-white h-32 w-44 rounded-lg ${
          showModal ? "block" : "hidden"
        }`}
      >
        <ul className="p-2">
          <li>
            <small className="text-[12px] font-semibold">
              {currentUser.displayName}
            </small>
          </li>

          <li className="text-wrap text-clip truncate w-full">
            <small className="text-[12px]">{currentUser.email}</small>
          </li>

          <li
            className="cursor-pointer text-red-600 font-semibold"
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
          >
            <small>LogOut</small>
          </li>
        </ul>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(({ text, sender, id, meals, date }) => (
          <div
            className={`max-w-md flex flex-col shadow rounded-lg p-3 ${
              sender === "user"
                ? "bg-orange-400 text-white ml-auto"
                : "mr-auto bg-orange-800 text-orange-400"
            }`}
            key={id}
          >
            {/* User Message */}
            {text && <p>{text}</p>}

            {/* Meals List */}
            {meals && (
              <div className="grid grid-cols-1 gap-4 mt-2">
                {meals.map((meal) => (
                  <Link
                    key={meal.idMeal}
                    to={`/meal-detail/${meal.name}/${meal.idMeal}`}
                  >
                    <div className="flex flex-col items-center bg-white rounded-lg shadow p-2">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                      <p className="mt-2 text-center font-medium">
                        {meal.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <small className="ml-auto text-sm text-orange-200">
              <span className="text-[13px]">{`${date}`}</span>
            </small>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          placeholder="Enter your ingredients"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`ml-4 px-4 py-2 rounded-lg ${
            loading ? "bg-orange-400" : "bg-orange-500 hover:bg-orange-700"
          } text-white`}
          onClick={generateRecipe}
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
