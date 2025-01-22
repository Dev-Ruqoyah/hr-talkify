import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Chat = () => {
  const { currentUser } = useAuth();
  let userName = currentUser.displayName || "User";
  let firstname = userName.split(" ")[0].toLowerCase();

  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Messages updated:", message);
  }, [message]);

  const generateRecipe = async () => {
    const inputValue = input.trim();
    if (inputValue === "") return;
  
    const userMessage = {
      text: inputValue,
      sender: "user",
      id: `req${Math.floor(Math.random() * 1000000)}`,
    };
  
    setMessage((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
  
    try {
      const response = await fetch("https://api.deepai.org/api/text-generator ", {
        method: "POST",
        headers: {
          "Api-key": import.meta.env. VITE_HUGGINGFACE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `Generate a recipe idea for: ${input}`,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.generated_text) {
        const botMessage = {
          text: data.generated_text.trim(),
          sender: "bot",
          id: `res${Math.floor(Math.random() * 1000000)}`,
        };
        setMessage((prev) => [...prev, botMessage]);
      } else {
        console.error("No valid response from Hugging Face:", data);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown =(e) =>{
    if(e.key === "Enter"){
        generateRecipe()
    }
  }
  

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-slate-300 text-white text-center py-4 text-xl font-semibold">
        RecipeAI Chat
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map(({ text, sender, id }) => (
          <div
            className={`max-w-md shadow rounded-lg p-3 ${
              sender === "user"
                ? "bg-slate-400 text-white ml-auto"
                : "mr-auto bg-gray-200 text-black"
            }`}
            key={id}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          placeholder="Enter your ingredients"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`ml-4 px-4 py-2 rounded-lg ${
            loading ? "bg-gray-400" : "bg-slate-500 hover:bg-slate-700"
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
