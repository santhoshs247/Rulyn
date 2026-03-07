import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component, if not I'll use standard input
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useLocation } from "wouter";
import { Plus, Save } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

export default function TeacherContentPage() {
    const { t } = useTranslation();
    const [, setLocation] = useLocation();
    const [formData, setFormData] = useState({
        title: "",
        subject: "Science",
        topic: "",
        difficulty: "Easy",
        coverImage: "📚",
        description: "",
        xp: 50,
        content: [{ text: "", image: "📝" }],
        quiz: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/stories", formData);
            alert(t("storyCreated") || "Story Created!");
            setLocation("/teacher");
        } catch (err) {
            console.error(err);
            alert(t("failedCreateStory") || "Failed to create story");
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{t("contentManagement") || "Content Management"}</h1>
                    <p className="text-muted-foreground">{t("createNewStories") || "Create new stories and lessons"}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("createStoryTitle") || "Create New Story"}</CardTitle>
                    <CardDescription>{t("fillDetails") || "Fill in the details below"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">{t("titleLabel") || "Title"}</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">{t("topicLabel") || "Topic"}</label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    value={formData.topic}
                                    onChange={e => setFormData({ ...formData, topic: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">{t("subjectLabel") || "Subject"}</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option value="Science">{t("science") || "Science"}</option>
                                    <option value="Math">{t("mathematics") || "Math"}</option>
                                    <option value="English">{t("subjectEnglish") || "English"}</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">{t("difficultyLabel") || "Difficulty"}</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.difficulty}
                                    onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                                >
                                    <option value="Easy">{t("easy") || "Easy"}</option>
                                    <option value="Medium">{t("medium") || "Medium"}</option>
                                    <option value="Hard">{t("hard") || "Hard"}</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">{t("descriptionLabel") || "Description"}</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t("storyContentPage1") || "Story Content (Page 1)"}</label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                value={formData.content[0].text}
                                onChange={e => {
                                    const newContent = [...formData.content];
                                    newContent[0].text = e.target.value;
                                    setFormData({ ...formData, content: newContent });
                                }}
                                placeholder="Once upon a time..."
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            <Save className="mr-2 h-4 w-4" /> {t("saveStory") || "Save Story"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
