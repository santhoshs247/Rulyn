import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] w-full flex items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">404 Page Not Found</h1>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        The page you are looking for does not exist.
                    </p>

                    <Link href="/">
                        <a className="inline-block mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                            Back to Home
                        </a>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
