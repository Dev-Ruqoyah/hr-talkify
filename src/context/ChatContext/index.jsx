import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("chat-messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const [inputs, setInputs] = useState(() => {
    const storedInput = localStorage.getItem("chat-inputs");
    return storedInput ? JSON.parse(storedInput) : [];
  });

  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chat-inputs", JSON.stringify(inputs));
  }, [inputs]);
  const addMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };
  const addInputs = (input) => {
    setInputs((prev) => [...prev, input]);
  };
  return (
    <>
      <ChatContext.Provider
        value={{ messages, addMessages, inputs, addInputs }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("UseChat must be used within chat context");
  return context;
}
