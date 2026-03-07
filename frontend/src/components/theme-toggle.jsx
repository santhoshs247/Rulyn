import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    // Initial check
    useEffect(() => {
        if (document.documentElement.classList.contains("dark")) {
            setTheme("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground w-8 h-8 rounded-full">
            {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
    );
}
