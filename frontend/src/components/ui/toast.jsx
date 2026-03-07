import * as React from "react"
import { cn } from "@/lib/utils"

// Simple mock for Toast to satisfy imports, mostly unused or replaced by alert() in our simple logic
const Toast = ({ className, ...props }) => (
    <div className={cn("fixed bottom-4 right-4 p-4 rounded-md shadow-lg bg-white dark:bg-zinc-800 border", className)} {...props} />
)

export { Toast }
