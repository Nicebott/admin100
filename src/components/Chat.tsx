import React, { useState, useEffect, useRef } from 'react';
import { ref, push, onValue, DataSnapshot, get } from "firebase/database";
import { db } from '../firebase';
import { MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: number;
  username: string;
  isAdmin: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatRef = ref(db, 'chat');

    onValue(chatRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          ...value,
        }));
        setMessages(messageList);
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setShowPasswordInput(username.toLowerCase() === 'admin');
  }, [username]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const chatRef = ref(db, 'chat');
      push(chatRef, {
        text: newMessage,
        timestamp: Date.now(),
        username: username,
        isAdmin: isAdmin
      });
      setNewMessage('');
    }
  };

  const handleSetUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== '') {
      if (username.toLowerCase() === 'admin') {
        const adminRef = ref(db, 'user/admin');
        const snapshot = await get(adminRef);
        if (snapshot.exists()) {
          const adminData = snapshot.val();
          if (password === adminData.password) {
            setIsAdmin(true);
            setIsUsernameSet(true);
          } else {
            alert('Contraseña de administrador incorrecta');
            return;
          }
        } else {
          alert('No se encontraron datos de administrador');
          return;
        }
      } else {
        setIsUsernameSet(true);
      }
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const renderChatContent = () => {
    if (!isUsernameSet) {
      return (
        <form onSubmit={handleSetUsername} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md px-2 py-1 mb-2"
            placeholder="Ingresa tu nombre..."
          />
          {showPasswordInput && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-2 py-1 mb-2"
              placeholder="Contraseña de administrador"
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Ingresar al chat
          </button>
        </form>
      );
    }

    return (
      <>
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <p className="text-sm">
                <span className={`font-bold ${message.isAdmin ? 'text-blue-600' : ''}`}>
                  {message.username}
                  {message.isAdmin && ' ✓'}:
                </span>{' '}
                {message.text}
              </p>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow border rounded-l-md px-2 py-1"
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-r-md"
          >
            Enviar
          </button>
        </form>
      </>
    );
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
      >
        <MessageCircle size={24} />
      </button>
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 bg-white shadow-md rounded-lg p-4 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl z-40">
          <h2 className="text-xl font-bold mb-4">Chat en tiempo real</h2>
          {renderChatContent()}
        </div>
      )}
    </>
  );
};

export default Chat;