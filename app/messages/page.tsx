"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Send,
  ArrowLeft,
  CheckCheck,
  Check,
  MessageCircle,
} from "lucide-react";
import { getConversations, getMessages, sendMessage } from "@/lib/data/messages";

type ConversationData = {
  id: string;
  created_at: string;
  updated_at: string;
  other_user: { id: string; full_name: string; avatar_url: string | null } | null;
  last_message: { content: string; created_at: string; sender_id: string } | null;
  unread_count: number;
};

type MessageData = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: string;
  created_at: string;
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getConversations();
      setConversations(data as ConversationData[]);
      if (data.length > 0) {
        setSelectedConvId((data[0] as ConversationData).id);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (selectedConvId) {
      getMessages(selectedConvId).then(({ messages: msgs, currentUserId: uid }) => {
        setMessages(msgs as MessageData[]);
        setCurrentUserId(uid);
      });
    }
  }, [selectedConvId]);

  const filteredConversations = conversations.filter((conv) =>
    (conv.other_user?.full_name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find((c) => c.id === selectedConvId);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedConvId) {
      const result = await sendMessage(selectedConvId, newMessage.trim());
      if (result.success && result.data) {
        setMessages((prev) => [...prev, result.data as MessageData]);
        setNewMessage("");
      }
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Now";
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread_count, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Messages</h1>
        <p className="text-[#2C2C2C]/60">{totalUnread} unread messages</p>
      </div>

      {conversations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <MessageCircle className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No Messages Yet</h3>
          <p className="text-[#2C2C2C]/60">Start a conversation by renting an item or listing yours!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden h-[calc(100vh-16rem)] flex">
          <div className={`${showMobileChat ? "hidden md:block" : "block"} w-full md:w-80 border-r border-gray-200 flex flex-col`}>
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..." className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6]" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div key={conv.id} onClick={() => { setSelectedConvId(conv.id); setShowMobileChat(true); }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConvId === conv.id ? "bg-blue-50" : ""}`}>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(conv.other_user?.full_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{conv.other_user?.full_name || "Unknown"}</h3>
                        <span className="text-xs text-gray-500">{conv.last_message ? formatTime(conv.last_message.created_at) : ""}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 truncate">{conv.last_message?.content || "No messages"}</p>
                        {conv.unread_count > 0 && (
                          <span className="ml-2 bg-[#1DA5A6] text-white text-xs font-semibold px-2 py-0.5 rounded-full">{conv.unread_count}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${showMobileChat ? "flex" : "hidden md:flex"} flex-1 flex-col`}>
            {selectedConv ? (
              <>
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowMobileChat(false)} className="md:hidden">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(selectedConv.other_user?.full_name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConv.other_user?.full_name || "Unknown"}</h3>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender_id === currentUserId ? "bg-[#1DA5A6] text-white" : "bg-white text-gray-900"}`}>
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className={`text-xs ${msg.sender_id === currentUserId ? "text-white/80" : "text-gray-500"}`}>
                            {formatTime(msg.created_at)}
                          </span>
                          {msg.sender_id === currentUserId && (
                            <>
                              {msg.status === "sent" && <Check className="w-3 h-3 text-white/80" />}
                              {msg.status === "delivered" && <CheckCheck className="w-3 h-3 text-white/80" />}
                              {msg.status === "read" && <CheckCheck className="w-3 h-3 text-blue-300" />}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 h-10 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6]" />
                    <button onClick={handleSendMessage} disabled={!newMessage.trim()}
                      className="w-10 h-10 bg-[#1DA5A6] text-white rounded-lg flex items-center justify-center hover:bg-[#1DA5A6]/90 disabled:opacity-50 disabled:cursor-not-allowed">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Select a conversation</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
