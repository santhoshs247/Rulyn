import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Need to check if Table component exists, if not I'll use standard HTML table with styling
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useTranslation } from "../contexts/LanguageContext";

export default function TeacherStudentsPage() {
    const { t } = useTranslation();
    const { data: students, isLoading } = useQuery({
        queryKey: ['students'],
        queryFn: () => api.get('/students')
    });

    if (isLoading) return <div className="flex h-[50vh] justify-center items-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{t("sidebarStudents") || "Students"}</h1>
                    <p className="text-muted-foreground">{t("manageStudentProgress") || "Manage and monitor student progress"}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("classList") || "Class List"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">{t("nameLabel") || "Name"}</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">{t("grade") || "Grade"}</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">{t("xpLabel") || "XP"}</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">{t("streak") || "Streak"}</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">{t("badgesLabel") || "Badges"}</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">{t("storiesReadLabel") || "Stories Read"}</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {students && students.length > 0 ? students.map((s) => (
                                    <tr key={s._id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{s.name}</td>
                                        <td className="p-4 align-middle">{s.grade}</td>
                                        <td className="p-4 align-middle font-bold text-yellow-600">{s.xp}</td>
                                        <td className="p-4 align-middle">{s.streak} 🔥</td>
                                        <td className="p-4 align-middle">
                                            {s.badges.length > 0 ? <Badge variant="outline">{s.badges.length} {t("badgesLabel") || "Badges"}</Badge> : <span className="text-muted-foreground">-</span>}
                                        </td>
                                        <td className="p-4 align-middle">{s.completedStories.length}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center text-muted-foreground">{t("noStudentsFound") || "No students found yet."}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
