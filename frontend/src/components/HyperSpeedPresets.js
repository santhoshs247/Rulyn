// Hyperspeed effect presets with different color schemes and speeds

export const hyperspeedPresets = {
    default: {
        particleCount: 150,
        particleSpeed: 15,
        particleColor: '#ffffff',
        lineWidth: 2,
        glowIntensity: 0.7,
        backgroundColor: '#000000'
    },

    // Blue tech theme
    one: {
        particleCount: 200,
        particleSpeed: 20,
        particleColor: '#00bfff',
        lineWidth: 2.5,
        glowIntensity: 0.9,
        backgroundColor: '#0a0e27'
    },

    // Purple cosmic theme
    two: {
        particleCount: 180,
        particleSpeed: 18,
        particleColor: '#9370db',
        secondaryColor: '#ff69b4',
        lineWidth: 2,
        glowIntensity: 0.8,
        backgroundColor: '#0d0221'
    },

    // Golden educational theme (perfect for Rulyn!)
    three: {
        particleCount: 220,
        particleSpeed: 16,
        particleColor: '#ffd700',
        secondaryColor: '#ff6b35',
        tertiaryColor: '#00d4ff',
        lineWidth: 2.5,
        glowIntensity: 1,
        backgroundColor: '#1a1a2e'
    },

    // Rainbow learning theme
    rainbow: {
        particleCount: 250,
        particleSpeed: 14,
        particleColor: 'rainbow', // Special flag for rainbow mode
        lineWidth: 2,
        glowIntensity: 0.85,
        backgroundColor: '#0a0a1a'
    },

    // Matrix green theme
    matrix: {
        particleCount: 300,
        particleSpeed: 22,
        particleColor: '#00ff41',
        lineWidth: 1.5,
        glowIntensity: 0.9,
        backgroundColor: '#000000'
    },

    // Light theme - Orange & Blue for Rulyn
    light: {
        particleCount: 200,
        particleSpeed: 14,
        particleColor: '#f97316',
        secondaryColor: '#0ea5e9',
        tertiaryColor: '#a855f7',
        lineWidth: 2.5,
        glowIntensity: 0.6,
        backgroundColor: '#fffbf5'
    },

    // Sunrise warm theme
    sunrise: {
        particleCount: 180,
        particleSpeed: 12,
        particleColor: '#fb923c',
        secondaryColor: '#f472b6',
        tertiaryColor: '#38bdf8',
        lineWidth: 3,
        glowIntensity: 0.5,
        backgroundColor: '#fff7ed'
    }
};
