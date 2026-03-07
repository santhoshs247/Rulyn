import { useRegisterSW } from 'virtual:pwa-register/react'
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useState, useEffect } from "react";

export default function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r)
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    return (
        <div className="Container">
            {(offlineReady || needRefresh) && (
                <div className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-zinc-800 border shadow-lg rounded-lg flex flex-col gap-2 max-w-sm animate-in slide-in-from-bottom">
                    <div className="text-sm font-medium">
                        {offlineReady ?
                            <span>App ready to work offline</span> :
                            <span>New content available, click on reload button to update.</span>
                        }
                    </div>
                    <div className="flex gap-2">
                        {needRefresh && <Button size="sm" onClick={() => updateServiceWorker(true)}>Reload</Button>}
                        <Button size="sm" variant="outline" onClick={close}>Close</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
