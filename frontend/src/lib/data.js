export const stories = [
    {
        id: 1,
        title: "The Village Water Mystery",
        subject: "Science",
        topic: "Water Cycle",
        difficulty: "Easy",
        coverImage: "🌊",
        description: "Help Raju understand where the rain comes from and how it fills the village pond.",
        xp: 50,
        content: [
            {
                text: "Raju was sitting by the village pond. It was a hot summer day, and the water level was very low. 'Where did all the water go?' he wondered.",
                image: "☀️"
            },
            {
                text: "His grandfather smiled. 'It hasn't gone forever, Raju. It just changed form! The sun's heat turned the water into vapor. This is called Evaporation.'",
                image: "💨"
            },
            {
                text: "Raju looked up at the sky. 'So the water is up there?' 'Yes,' said Grandfather. 'When it cools down, it will turn back into clouds. That's Condensation.'",
                image: "☁️"
            }
        ],
        quiz: [
            {
                question: "What turned the water into vapor?",
                options: ["The Moon", "The Sun", " The Wind", "The Fish"],
                correct: 1
            }
        ]
    },
    {
        id: 2,
        title: "Lighting Up the Dark",
        subject: "Physics",
        topic: "Electricity",
        difficulty: "Medium",
        coverImage: "💡",
        description: "Learn how a simple circuit works to light up a bulb in a rural home.",
        xp: 75,
        content: [
            {
                text: "It was Diwali, but the electricity was out. Meena wanted to light a small bulb for her rangoli.",
                image: "🪔"
            },
            {
                text: "She found a battery, a small bulb, and two wires. 'I need to make a closed loop,' she remembered from class.",
                image: "🔋"
            }
        ],
        quiz: []
    }
];

export const userStats = {
    xp: 120,
    level: 2,
    streak: 3,
    completedStories: [1],
    badges: ["First Steps", "Science Whiz"]
};
