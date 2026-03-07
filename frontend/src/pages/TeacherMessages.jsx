import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle, Search, Send, Paperclip, MoreVertical, Check, CheckCheck,
    Users, User, Star, Clock, Image, Smile, Phone, Video, X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockClassStudents } from "@/lib/mockData";
import { useTranslation } from "../contexts/LanguageContext";

const TeacherMessages = () => {
    const { t } = useTranslation();
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Mock conversations
    const conversations = [
        {
            id: 1,
            type: "student",
            name: "Priya Kumar",
            avatar: "👧",
            lastMessage: "Thank you for the extra help with photosynthesis!",
            time: "2 min ago",
            unread: 2,
            online: true
        },
        {
            id: 2,
            type: "student",
            name: "Arjun Mehta",
            avatar: "👦",
            lastMessage: "I have a question about the quiz",
            time: "1 hour ago",
            unread: 0,
            online: true
        },
        {
            id: 3,
            type: "parent",
            name: "Mrs. Patel (Sneha's Parent)",
            avatar: "👩",
            lastMessage: "How is Sneha doing in class?",
            time: "Yesterday",
            unread: 1,
            online: false
        },
        {
            id: 4,
            type: "group",
            name: "Grade 8 Science Class",
            avatar: "👥",
            lastMessage: "Reminder: Quiz tomorrow at 11 AM",
            time: "Yesterday",
            unread: 0,
            online: false,
            members: 32
        },
        {
            id: 5,
            type: "student",
            name: "Rahul Sharma",
            avatar: "👦",
            lastMessage: "Got it, I'll submit by tomorrow",
            time: "2 days ago",
            unread: 0,
            online: false
        }
    ];

    // Mock messages for selected chat
    const mockMessages = [
        { id: 1, sender: "student", text: "Hello Dr. Sharma! I had a question about today's lesson.", time: "10:30 AM" },
        { id: 2, sender: "teacher", text: "Of course! What would you like to know?", time: "10:32 AM" },
        { id: 3, sender: "student", text: "I'm confused about how chlorophyll absorbs light. Can you explain again?", time: "10:33 AM" },
        { id: 4, sender: "teacher", text: "Great question! Chlorophyll is a green pigment that absorbs red and blue light, but reflects green light - that's why plants look green!", time: "10:35 AM" },
        { id: 5, sender: "teacher", text: "It captures light energy and uses it to convert CO2 and water into glucose. Think of it like a tiny solar panel inside each leaf! 🌿", time: "10:36 AM" },
        { id: 6, sender: "student", text: "Oh that makes so much sense now! Thank you for the extra help with photosynthesis!", time: "10:38 AM" }
    ];

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendMessage = () => {
        if (message.trim()) {
            // In a real app, this would send the message
            console.log("Sending:", message);
            setMessage("");
        }
    };

    return (
        <div className="h-[calc(100vh-120px)] flex rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            {/* Conversations List */}
            <div className={`w-full md:w-80 border-r border-white/10 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white mb-3">{t("messagesTitle")}</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                            placeholder={t("searchConversations")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex p-2 gap-2 border-b border-white/10">
                    <Button variant="ghost" size="sm" className="flex-1 rounded-lg text-white bg-white/10">{t("all")}</Button>
                    <Button variant="ghost" size="sm" className="flex-1 rounded-lg text-white/60">{t("teacherStatStudents")}</Button>
                    <Button variant="ghost" size="sm" className="flex-1 rounded-lg text-white/60">{t("parents")}</Button>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map((conv) => (
                        <motion.div
                            key={conv.id}
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                            onClick={() => setSelectedChat(conv)}
                            className={`p-4 cursor-pointer border-b border-white/5 ${selectedChat?.id === conv.id ? 'bg-indigo-500/10' : ''
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
                                        {conv.avatar}
                                    </div>
                                    {conv.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-white truncate">{conv.name}</p>
                                        <span className="text-[10px] text-white/40">{conv.time}</span>
                                    </div>
                                    <p className="text-xs text-white/50 truncate mt-0.5">{conv.lastMessage}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {conv.type === "group" && (
                                            <Badge className="bg-white/10 text-white/60 text-[10px] border-0">
                                                <Users className="h-2 w-2 mr-1" /> {conv.members}
                                            </Badge>
                                        )}
                                        {conv.type === "parent" && (
                                            <Badge className="bg-purple-500/20 text-purple-300 text-[10px] border-0">{t("parents")}</Badge>
                                        )}
                                    </div>
                                </div>
                                {conv.unread > 0 && (
                                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <span className="text-[10px] text-white font-bold">{conv.unread}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSelectedChat(null)}
                                    className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white/60"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
                                    {selectedChat.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{selectedChat.name}</p>
                                    <p className="text-xs text-white/40">
                                        {selectedChat.online ? t("online") : t("lastSeen")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:text-white">
                                    <Phone className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:text-white">
                                    <Video className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:text-white">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {mockMessages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'teacher'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                        : 'bg-white/10 text-white'
                                        }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'teacher' ? 'text-white/60' : 'text-white/40'
                                            }`}>
                                            <span className="text-[10px]">{msg.time}</span>
                                            {msg.sender === 'teacher' && <CheckCheck className="h-3 w-3" />}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:text-white">
                                    <Paperclip className="h-5 w-5" />
                                </Button>
                                <Input
                                    placeholder={t("typeMessage")}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                                />
                                <Button variant="ghost" size="icon" className="rounded-full text-white/60 hover:text-white">
                                    <Smile className="h-5 w-5" />
                                </Button>
                                <Button
                                    onClick={sendMessage}
                                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-3"
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* No Chat Selected */
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-10 w-10 text-white/30" />
                            </div>
                            <p className="text-white/50">{t("selectConversation")}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherMessages;
