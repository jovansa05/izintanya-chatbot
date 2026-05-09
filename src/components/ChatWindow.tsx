import { useEffect, useRef } from "react";
import type { Message } from "../types/Message";
import chatbotConfig from "../config/chatbotConfig";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.length === 0 && (
        <div className="message model welcome">
          <strong style={{ textAlign: "left", alignSelf: "flex-start" }}>
            {chatbotConfig.botName}
          </strong>
          <p>{chatbotConfig.welcomeMessage}</p>
        </div>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          <strong
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.role === "user" ? "Calon Orang Sukses" : chatbotConfig.botName}
          </strong>
          <p>{msg.content}</p>
        </div>
      ))}
      {isLoading && (
  <div className="message model">
    <strong style={{ textAlign: "left", alignSelf: "flex-start" }}>
      {chatbotConfig.botName}
    </strong>
    <p style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
      Lagi mikir sebentar
      <span className="typing-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </p>
  </div>
)}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;