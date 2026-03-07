import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const SettingsContext = createContext();

// Default settings
const defaultSettings = {
    // Profile
    displayName: "Alex Explorer",
    username: "alex_the_learner",
    email: "alex.explorer@school.edu",

    // Notifications
    notifications: {
        achievements: true,
        dailyReminder: true,
        streakAlerts: true,
        quizResults: true,
        teacherMessages: true,
        friendActivity: false
    },

    // Appearance
    theme: 'dark',
    liteMode: false,

    // Sound
    soundEffects: true,

    // Privacy
    profileVisibility: 'friends',
    showOnLeaderboard: true
};

// Custom hook to use settings
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

// Provider component
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('rulyn_settings');
        if (saved) {
            try {
                return { ...defaultSettings, ...JSON.parse(saved) };
            } catch {
                return defaultSettings;
            }
        }
        return defaultSettings;
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('rulyn_settings', JSON.stringify(settings));
    }, [settings]);

    // Update a single setting
    const updateSetting = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Update nested notification settings
    const updateNotification = (key, value) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: value
            }
        }));
    };

    // Save all settings with feedback
    const saveSettings = async () => {
        setIsSaving(true);
        setSaveMessage('');

        // Simulate save delay for UX
        await new Promise(resolve => setTimeout(resolve, 800));

        localStorage.setItem('rulyn_settings', JSON.stringify(settings));

        setIsSaving(false);
        setSaveMessage('Settings saved successfully!');

        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(''), 3000);

        return true;
    };

    // Reset to defaults
    const resetSettings = () => {
        setSettings(defaultSettings);
        localStorage.setItem('rulyn_settings', JSON.stringify(defaultSettings));
    };

    const value = {
        settings,
        updateSetting,
        updateNotification,
        saveSettings,
        resetSettings,
        isSaving,
        saveMessage
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContext;
