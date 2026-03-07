import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText, Plus, Sparkles, BookOpen, HelpCircle, Clock, Target,
    Trash2, Edit3, Eye, Save, X, GripVertical, Zap, Star,
    Image, Video, MessageSquare, ChevronDown, Check, Play,
    Users, Calendar, Send, CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockStories, mockClassStudents } from "@/lib/mockData";
import { useTranslation } from "../contexts/LanguageContext";

// Content Block Component
const ContentBlock = ({ block, onRemove, onEdit }) => {
    const blockIcons = {
        text: FileText,
        question: HelpCircle,
        image: Image,
        video: Video,
        quiz: Target
    };
    const Icon = blockIcons[block.type] || FileText;

    const difficultyColors = {
        easy: "bg-emerald-500",
        medium: "bg-yellow-500",
        hard: "bg-red-500"
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors"
        >
            <div className="flex items-start gap-3">
                <div className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-5 w-5 text-white/30" />
                </div>
                <div className={`p-2 rounded-lg ${block.type === 'quiz' ? 'bg-purple-500/20' :
                    block.type === 'question' ? 'bg-blue-500/20' :
                        'bg-indigo-500/20'
                    }`}>
                    <Icon className={`h-4 w-4 ${block.type === 'quiz' ? 'text-purple-400' :
                        block.type === 'question' ? 'text-blue-400' :
                            'text-indigo-400'
                        }`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white capitalize">{block.type}</span>
                        {block.difficulty && (
                            <div className={`w-2 h-2 rounded-full ${difficultyColors[block.difficulty]}`} />
                        )}
                    </div>
                    <p className="text-sm text-white/60 truncate">{block.content}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(block)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"
                    >
                        <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onRemove(block.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// Impact Preview Component
const ImpactPreview = ({ blocks, t }) => {
    const estimatedTime = blocks.length * 3; // 3 mins per block
    const engagementScore = Math.min(100, blocks.filter(b => b.type !== 'text').length * 15 + 40);
    const difficultyBalance = {
        easy: blocks.filter(b => b.difficulty === 'easy').length,
        medium: blocks.filter(b => b.difficulty === 'medium').length,
        hard: blocks.filter(b => b.difficulty === 'hard').length
    };

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">{t("impactPreview")}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-white/50" />
                        <span className="text-xs text-white/50">{t("estTime")}</span>
                    </div>
                    <span className="text-xl font-bold text-white">{estimatedTime} min</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-white/50" />
                        <span className="text-xs text-white/50">{t("engagementPulse")}</span>
                    </div>
                    <span className="text-xl font-bold text-white">{engagementScore}%</span>
                </div>
            </div>

            {/* Difficulty Balance */}
            <div className="space-y-2">
                <span className="text-xs text-white/50">{t("difficultyBalance")}</span>
                <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-white/10">
                    {difficultyBalance.easy > 0 && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(difficultyBalance.easy / blocks.length) * 100}%` }}
                            className="bg-emerald-500 h-full"
                        />
                    )}
                    {difficultyBalance.medium > 0 && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(difficultyBalance.medium / blocks.length) * 100}%` }}
                            className="bg-yellow-500 h-full"
                        />
                    )}
                    {difficultyBalance.hard > 0 && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(difficultyBalance.hard / blocks.length) * 100}%` }}
                            className="bg-red-500 h-full"
                        />
                    )}
                </div>
                <div className="flex justify-between text-[10px] text-white/40">
                    <span>Easy: {difficultyBalance.easy}</span>
                    <span>Medium: {difficultyBalance.medium}</span>
                    <span>Hard: {difficultyBalance.hard}</span>
                </div>
            </div>
        </div>
    );
};

const TeacherContentStudio = () => {
    const { t } = useTranslation();
    const [contentTitle, setContentTitle] = useState("");
    const [blocks, setBlocks] = useState([
        { id: 1, type: "text", content: "Introduction to the topic...", difficulty: null },
        { id: 2, type: "question", content: "What do you already know about this subject?", difficulty: "easy" },
        { id: 3, type: "quiz", content: "Multiple choice question about key concepts", difficulty: "medium" }
    ]);
    const [showBlockMenu, setShowBlockMenu] = useState(false);

    const blockTypes = [
        { type: "text", icon: FileText, label: "Text Block", color: "indigo" },
        { type: "question", icon: HelpCircle, label: "Open Question", color: "blue" },
        { type: "quiz", icon: Target, label: "Quiz Question", color: "purple" },
        { type: "image", icon: Image, label: "Image", color: "green" },
        { type: "video", icon: Video, label: "Video", color: "red" }
    ];

    const addBlock = (type) => {
        const newBlock = {
            id: Date.now(),
            type,
            content: `New ${type} block...`,
            difficulty: type === 'quiz' || type === 'question' ? 'medium' : null
        };
        setBlocks([...blocks, newBlock]);
        setShowBlockMenu(false);
    };

    const removeBlock = (id) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const existingContent = [
        { id: 1, title: "Photosynthesis Explained", type: "lesson", blocks: 8, status: "published", engagement: 92 },
        { id: 2, title: "Newton's Laws Quiz", type: "quiz", blocks: 5, status: "published", engagement: 87 },
        { id: 3, title: "Chemical Reactions", type: "lesson", blocks: 12, status: "draft", engagement: 0 }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("studioTitle")}</h1>
                    <p className="text-indigo-300/60">{t("studioSubtitle")}</p>
                </div>
                <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("newContent")}
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Content Builder */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                        <label className="text-sm text-white/60 mb-2 block">{t("contentTitleLabel")}</label>
                        <Input
                            value={contentTitle}
                            onChange={(e) => setContentTitle(e.target.value)}
                            placeholder="e.g., Understanding Photosynthesis"
                            className="text-xl font-semibold h-14 bg-transparent border-0 border-b border-white/10 rounded-none text-white placeholder:text-white/30 focus:ring-0 focus:border-indigo-500"
                        />
                    </div>

                    {/* Blocks */}
                    <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">{t("contentBlocks")}</h3>
                            <Badge className="bg-white/10 text-white/60 border-0">{blocks.length} blocks</Badge>
                        </div>

                        <div className="space-y-3 mb-4">
                            <AnimatePresence>
                                {blocks.map((block) => (
                                    <ContentBlock
                                        key={block.id}
                                        block={block}
                                        onRemove={removeBlock}
                                        onEdit={(b) => console.log("Edit", b)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Add Block Button */}
                        <div className="relative">
                            <Button
                                onClick={() => setShowBlockMenu(!showBlockMenu)}
                                variant="ghost"
                                className="w-full h-12 rounded-xl border-2 border-dashed border-white/20 text-white/50 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {t("addBlock")}
                            </Button>

                            {/* Block Type Menu */}
                            <AnimatePresence>
                                {showBlockMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-slate-800 border border-white/10 shadow-xl grid grid-cols-5 gap-2"
                                    >
                                        {blockTypes.map((bt) => (
                                            <motion.button
                                                key={bt.type}
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => addBlock(bt.type)}
                                                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 flex flex-col items-center gap-1 text-center"
                                            >
                                                <bt.icon className={`h-5 w-5 text-${bt.color}-400`} />
                                                <span className="text-[10px] text-white/60">{bt.label}</span>
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button className="flex-1 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30">
                            <Eye className="h-4 w-4 mr-2" />
                            {t("preview")}
                        </Button>
                        <Button className="flex-1 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600">
                            <Save className="h-4 w-4 mr-2" />
                            {t("savePublish")}
                        </Button>
                    </div>

                    {/* Assign Existing Content */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-orange-500/20">
                                <Send className="h-5 w-5 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">{t("assignToStudents")}</h3>
                                <p className="text-xs text-white/50">{t("assignSubtitle")}</p>
                            </div>
                        </div>

                        {/* Content Selection */}
                        <div className="space-y-3 mb-4">
                            <label className="text-sm text-white/60">{t("selectContent")}</label>
                            <div className="grid gap-2">
                                {mockStories.slice(0, 4).map((story) => (
                                    <motion.div
                                        key={story.id}
                                        whileHover={{ scale: 1.01 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-orange-500/30"
                                    >
                                        <div className="text-2xl">{story.coverImage}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{story.title}</p>
                                            <p className="text-xs text-white/40">{story.subject} • {story.readTime}</p>
                                        </div>
                                        <Badge className="bg-white/10 text-white/60 text-xs">{story.xp} XP</Badge>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-2 mb-4">
                            <label className="text-sm text-white/60">{t("dueDate")}</label>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-white/40" />
                                <Input
                                    type="date"
                                    className="bg-white/5 border-white/10 text-white rounded-xl"
                                    defaultValue="2026-01-18"
                                />
                            </div>
                        </div>

                        {/* Assign to */}
                        <div className="space-y-2 mb-4">
                            <label className="text-sm text-white/60">{t("assignTo")}</label>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 rounded-xl border-white/20 text-white hover:bg-white/10">
                                    <Users className="h-4 w-4 mr-2" />
                                    {t("allStudents")} ({mockClassStudents.length})
                                </Button>
                                <Button variant="outline" className="rounded-xl border-white/20 text-white/60 hover:bg-white/10">
                                    Select...
                                </Button>
                            </div>
                        </div>

                        {/* Assign Button */}
                        <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold">
                            <Send className="h-4 w-4 mr-2" />
                            {t("assignToClass")}
                        </Button>

                        {/* Success message placeholder */}
                        <p className="text-xs text-center text-white/40 mt-3">
                            Students will see this assignment on their dashboard
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Impact Preview */}
                    <ImpactPreview blocks={blocks} t={t} />

                    {/* Existing Content */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-sm font-semibold text-white/80 mb-4">{t("yourContent")}</h3>
                        <div className="space-y-3">
                            {existingContent.map((content) => (
                                <motion.div
                                    key={content.id}
                                    whileHover={{ x: 4 }}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate group-hover:text-indigo-300 transition-colors">
                                                {content.title}
                                            </p>
                                            <p className="text-xs text-white/40">{content.blocks} blocks</p>
                                        </div>
                                        <Badge className={`text-[10px] ${content.status === 'published'
                                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                            }`}>
                                            {content.status}
                                        </Badge>
                                    </div>
                                    {content.engagement > 0 && (
                                        <div className="mt-2 flex items-center gap-1 text-xs text-white/40">
                                            <Zap className="h-3 w-3" />
                                            {content.engagement}% {t("engagementPulse")}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-purple-400 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-purple-300 font-medium">{t("proTip")}</p>
                                <p className="text-xs text-purple-300/60 mt-1">
                                    {t("proTipContent")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherContentStudio;
