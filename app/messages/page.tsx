"use client";

import { useState } from "react";
import {
  Search,
  Send,
  ArrowLeft,
  CheckCheck,
  Check,
} from "lucide-react";

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
};

type Message = {
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
};

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sara Mohamed",
    avatar: "SM",
    lastMessage: "Great! I'll pick it up tomorrow at 3 PM",
    timestamp: "2m",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Omar Khaled",
    avatar: "OK",
    lastMessage: "Is the item still available?",
    timestamp: "1h",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Layla Ibrahim",
    avatar: "LI",
    lastMessage: "Thank you! The book was very helpful",
    timestamp: "1d",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Ahmed Ali",
    avatar: "AA",
    lastMessage: "Can we extend the rental period?",
    timestamp: "2d",
    unread: 1,
    online: false,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "other",
    content: "Hi! I'm interested in renting your calculator",
    timestamp: "10:30",
    status: "read",
  },
  {
    id: "2",
    sender: "me",
    content: "Hello! Sure, it's available. When do you need it?",
    timestamp: "10:32",
    status: "read",
  },
  {
    id: "3",
    sender: "other",
    content: "I need it for next week. Is that okay?",
    timestamp: "10:35",
    status: "read",
  },
  {
    id: "4",
    sender: "me",
    content: "Yes, that works! The rental is 50 EGP per week.",
    timestamp: "10:36",
    status: "read",
  },
  {
    id: "5",
    sender: "other",
    content: "Perfect! Where can I pick it up?",
    timestamp: "10:40",
    status: "read",
  },
  {
    id: "6",
    sender: "me",
    content: "Main Campus, Building 5. I'm usually there around 3 PM",
    timestamp: "10:42",
    status: "delivered",
  },
  {
    id: "7",
    sender: "other",
    content: "Great! I'll pick it up tomorrow at 3 PM",
    timestamp: "Now",
    status: "sent",
  },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Conversation>(
    mockConversations[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages] = useState<Message[]>(mockMessages);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Messages</h1>
        <p className="text-[#2C2C2C]/60">
          {mockConversations.reduce((sum, c) => sum + c.unread, 0)} unread messages
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden h-[calc(100vh-16rem)] flex">
        {/* Conversations List */}
        <div
          className={`${
            showMobileChat ? "hidden md:block" : "block"
          } w-full md:w-80 border-r border-gray-200 flex flex-col`}
        >
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6]"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedChat(conv);
                  setShowMobileChat(true);
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat.id === conv.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conv.timestamp}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span className="ml-2 bg-[#1DA5A6] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`${
            showMobileChat ? "flex" : "hidden md:flex"
          } flex-1 flex-col`}
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileChat(false)}
                className="md:hidden"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                {selectedChat.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedChat.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedChat.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-[#1DA5A6] text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span
                      className={`text-xs ${
                        msg.sender === "me"
                          ? "text-white/80"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                    {msg.sender === "me" && (
                      <>
                        {msg.status === "sent" && (
                          <Check className="w-3 h-3 text-white/80" />
                        )}
                        {msg.status === "delivered" && (
                          <CheckCheck className="w-3 h-3 text-white/80" />
                        )}
                        {msg.status === "read" && (
                          <CheckCheck className="w-3 h-3 text-blue-300" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 h-10 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="w-10 h-10 bg-[#1DA5A6] text-white rounded-lg flex items-center justify-center hover:bg-[#1DA5A6]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}