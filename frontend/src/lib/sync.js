import { api } from "./api";

// Simple offline-sync mechanism
const SYNC_KEY = "rulyn_offline_queue";

export const syncManager = {
    // Add action to queue
    queueAction: (action) => {
        const queue = JSON.parse(localStorage.getItem(SYNC_KEY) || "[]");
        queue.push(action);
        localStorage.setItem(SYNC_KEY, JSON.stringify(queue));

        // Attempt sync if online
        if (navigator.onLine) {
            syncManager.processQueue();
        }
    },

    // Process queue
    processQueue: async () => {
        if (!navigator.onLine) return;

        const queue = JSON.parse(localStorage.getItem(SYNC_KEY) || "[]");
        if (queue.length === 0) return;

        const remaining = [];

        for (const action of queue) {
            try {
                if (action.type === "UPDATE_PROGRESS") {
                    await api.post("/student/progress", action.payload);
                }
                // Add more action types here
            } catch (err) {
                console.error("Sync failed for action", action, err);
                remaining.push(action); // Keep failed actions
            }
        }

        localStorage.setItem(SYNC_KEY, JSON.stringify(remaining));
    }
};

// Listen for online status
window.addEventListener("online", () => {
    console.log("Online! Syncing...");
    syncManager.processQueue();
});
