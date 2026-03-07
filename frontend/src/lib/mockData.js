// Mock data for development/demo purposes

// ============================================
// SHARED DATA - Used by both Teacher and Student
// ============================================

// Assignments created by teachers, visible to students
export const mockAssignments = [
    {
        id: 1,
        title: "Photosynthesis Quiz",
        description: "Complete the quiz on How Plants Make Food",
        type: "quiz",
        storyId: 1,
        teacherId: 1,
        teacherName: "Dr. Sharma",
        dueDate: "2026-01-15",
        assignedDate: "2026-01-10",
        points: 100,
        status: "active", // active, completed, overdue
        assignedTo: "all", // all, or array of student IDs
        completedBy: [2, 5], // student IDs who completed
        class: "Grade 8 Science"
    },
    {
        id: 2,
        title: "Simple Machines Reading",
        description: "Read the story about Simple Machines and answer questions",
        type: "story",
        storyId: 3,
        teacherId: 1,
        teacherName: "Dr. Sharma",
        dueDate: "2026-01-18",
        assignedDate: "2026-01-11",
        points: 75,
        status: "active",
        assignedTo: "all",
        completedBy: [],
        class: "Grade 8 Science"
    },
    {
        id: 3,
        title: "Space Exploration Challenge",
        description: "Complete the Journey Through Space story and quiz",
        type: "story+quiz",
        storyId: 5,
        teacherId: 1,
        teacherName: "Dr. Sharma",
        dueDate: "2026-01-20",
        assignedDate: "2026-01-11",
        points: 150,
        status: "active",
        assignedTo: "all",
        completedBy: [1, 3],
        class: "Grade 8 Science"
    }
];

// Teacher-created custom quizzes
export const mockTeacherQuizzes = [
    {
        id: 101,
        title: "Newton's Laws Quiz",
        description: "Test your understanding of Newton's Three Laws of Motion",
        teacherId: 1,
        teacherName: "Dr. Sharma",
        subject: "Physics",
        difficulty: "medium",
        questions: [
            { question: "What is Newton's First Law about?", options: ["Motion", "Inertia", "Gravity", "Force"], correct: 1 },
            { question: "F = ma represents which law?", options: ["First", "Second", "Third", "None"], correct: 1 },
            { question: "For every action there is an equal and opposite...?", options: ["Action", "Reaction", "Force", "Motion"], correct: 1 }
        ],
        points: 60,
        timeLimit: 10, // minutes
        createdAt: "2026-01-10",
        assignedTo: []
    },
    {
        id: 102,
        title: "Chemical Reactions Basics",
        description: "Understanding reactants, products, and types of reactions",
        teacherId: 1,
        teacherName: "Dr. Sharma",
        subject: "Chemistry",
        difficulty: "hard",
        questions: [
            { question: "What are the starting materials in a reaction called?", options: ["Products", "Reactants", "Catalysts", "Elements"], correct: 1 },
            { question: "What speeds up a reaction without being consumed?", options: ["Reactant", "Product", "Catalyst", "Solvent"], correct: 2 }
        ],
        points: 50,
        timeLimit: 8,
        createdAt: "2026-01-11",
        assignedTo: []
    }
];

// Stories data
export const mockStories = [
    {
        id: 1,
        title: "How Plants Make Food",
        topic: "Photosynthesis",
        subject: "Science",
        description: "Discover the amazing process of photosynthesis! Learn how plants use sunlight, water, and carbon dioxide to create their own food.",
        coverImage: "🌱",
        grade: "Grade 3-5",
        difficulty: "Easy",
        readTime: "5 min",
        xp: 50,
        content: [
            { image: "☀️", text: "Plants need sunlight to make their food. The sun provides energy that powers a special process inside leaves." },
            { image: "💧", text: "Plants drink water through their roots. This water travels up through the stem to reach every leaf." },
            { image: "🍃", text: "Leaves have tiny holes called stomata. They breathe in carbon dioxide from the air around us." },
            { image: "🧪", text: "Inside the leaves, chlorophyll (the green stuff!) mixes sunlight, water, and CO2 together." },
            { image: "🍬", text: "This creates glucose - a type of sugar that gives the plant energy to grow big and strong!" },
            { image: "🌳", text: "Plants also release oxygen as a gift to us. That's the air we breathe! Thank you, plants!" }
        ],
        quiz: [
            { question: "What do plants need from the sun?", options: ["Water", "Energy", "Soil", "Wind"], correct: 1 },
            { question: "Where do plants get water from?", options: ["Leaves", "Flowers", "Roots", "Stems"], correct: 2 },
            { question: "What gas do plants breathe in?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], correct: 2 },
            { question: "What makes leaves green?", options: ["Water", "Sunlight", "Chlorophyll", "Sugar"], correct: 2 },
            { question: "What do plants release that we breathe?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Water"], correct: 1 }
        ]
    },
    {
        id: 2,
        title: "Introduction to Coding",
        topic: "Programming Basics",
        subject: "Technology",
        description: "Start your coding journey! Learn what code is and how computers understand our instructions.",
        coverImage: "💻",
        grade: "Grade 3-5",
        difficulty: "Easy",
        readTime: "6 min",
        xp: 60,
        content: [
            { image: "🤖", text: "Computers are amazing machines, but they need instructions to know what to do. Those instructions are called code!" },
            { image: "📝", text: "Code is like a recipe. Just like a recipe tells you how to bake a cake, code tells a computer what steps to follow." },
            { image: "🔢", text: "Computers only understand 1s and 0s! But don't worry, we use special languages that are easier for humans to write." },
            { image: "🎮", text: "Everything you love - games, apps, websites - are all made with code! Programmers write the instructions." },
            { image: "🐛", text: "Sometimes code doesn't work perfectly. We call these mistakes 'bugs' and fixing them is called 'debugging'!" },
            { image: "🚀", text: "You can learn to code too! Start with simple commands and soon you'll be creating your own programs!" }
        ],
        quiz: [
            { question: "What is code?", options: ["A secret language", "Instructions for computers", "A type of game", "A math problem"], correct: 1 },
            { question: "What do computers understand?", options: ["English words", "Pictures", "1s and 0s", "Emotions"], correct: 2 },
            { question: "What is a 'bug' in programming?", options: ["An insect", "A feature", "A mistake in code", "A computer virus"], correct: 2 },
            { question: "What are video games made with?", options: ["Magic", "Code", "Paper", "Paint"], correct: 1 }
        ]
    },
    {
        id: 3,
        title: "Building Simple Machines",
        topic: "Mechanical Engineering",
        subject: "Engineering",
        description: "Explore the six simple machines that make work easier! From levers to pulleys, discover how they help us every day.",
        coverImage: "⚙️",
        grade: "Grade 4-6",
        difficulty: "Medium",
        readTime: "7 min",
        xp: 75,
        content: [
            { image: "🔧", text: "Simple machines help us do work with less effort. They've been used by humans for thousands of years!" },
            { image: "🎚️", text: "A LEVER is like a seesaw. Push down on one end, and the other end goes up! It helps lift heavy things." },
            { image: "🎡", text: "A WHEEL AND AXLE makes moving things easier. Think of a car's wheels or a doorknob!" },
            { image: "⛰️", text: "An INCLINED PLANE (ramp) lets you move things up without lifting straight up. Much easier!" },
            { image: "🔩", text: "A SCREW is like a ramp wrapped around a pole. It holds things together super tight!" },
            { image: "🏗️", text: "A PULLEY uses a rope and wheel to lift heavy loads. Cranes use them to build skyscrapers!" },
            { image: "🪓", text: "A WEDGE has two inclined planes. It can split things apart - like an axe cutting wood!" }
        ],
        quiz: [
            { question: "How many simple machines are there?", options: ["3", "4", "5", "6"], correct: 3 },
            { question: "What is a lever like?", options: ["A wheel", "A seesaw", "A screw", "A ramp"], correct: 1 },
            { question: "What simple machine is a ramp?", options: ["Lever", "Pulley", "Inclined plane", "Wedge"], correct: 2 },
            { question: "What do cranes use to lift heavy things?", options: ["Levers", "Pulleys", "Wedges", "Screws"], correct: 1 }
        ]
    },
    {
        id: 4,
        title: "The Magic of Fractions",
        topic: "Fractions",
        subject: "Mathematics",
        description: "Fractions aren't scary! Learn how to divide things into equal parts and understand what numerators and denominators mean.",
        coverImage: "🍕",
        grade: "Grade 3-5",
        difficulty: "Medium",
        readTime: "6 min",
        xp: 65,
        content: [
            { image: "🍕", text: "Imagine you have a pizza. If you cut it into 4 equal pieces, each piece is 1/4 (one-fourth) of the pizza!" },
            { image: "📊", text: "A fraction has two parts: the NUMERATOR (top number) tells how many pieces you have." },
            { image: "📉", text: "The DENOMINATOR (bottom number) tells how many equal pieces the whole thing is divided into." },
            { image: "🥧", text: "If you eat 2 slices of a pie cut into 8 pieces, you ate 2/8 of the pie. That's the same as 1/4!" },
            { image: "⚖️", text: "Two fractions can look different but be equal! 1/2 = 2/4 = 4/8. These are called equivalent fractions." },
            { image: "🎂", text: "Fractions are everywhere - cutting cake, sharing toys, even in music! You're already a fraction expert!" }
        ],
        quiz: [
            { question: "In 3/4, what is the numerator?", options: ["3", "4", "7", "1"], correct: 0 },
            { question: "What does the denominator tell us?", options: ["How many you have", "How many total parts", "The answer", "The whole number"], correct: 1 },
            { question: "Which fraction equals 1/2?", options: ["1/4", "2/4", "3/4", "1/3"], correct: 1 },
            { question: "If a pizza has 8 slices and you eat 4, what fraction did you eat?", options: ["4/8", "8/4", "1/8", "4/4"], correct: 0 }
        ]
    },
    {
        id: 5,
        title: "Journey Through Space",
        topic: "Solar System",
        subject: "Science",
        description: "Blast off on an adventure through our solar system! Meet the planets and learn amazing facts about space.",
        coverImage: "🚀",
        grade: "Grade 2-4",
        difficulty: "Easy",
        readTime: "8 min",
        xp: 80,
        content: [
            { image: "☀️", text: "Our solar system has a star at its center - the SUN! It's so big that 1 million Earths could fit inside it!" },
            { image: "🌍", text: "Earth is our home planet. It's the third planet from the Sun and the only one we know has life!" },
            { image: "🔴", text: "Mars is called the Red Planet. Scientists send robots there to explore and look for signs of water!" },
            { image: "🪐", text: "Jupiter is the BIGGEST planet! It has a giant storm called the Great Red Spot that's bigger than Earth!" },
            { image: "💫", text: "Saturn has beautiful rings made of ice and rock. You can see them with a small telescope!" },
            { image: "🌙", text: "Our Moon lights up the night sky. It takes about 27 days to travel around Earth once." },
            { image: "⭐", text: "Beyond our solar system are billions of other stars, and many of them have planets too!" }
        ],
        quiz: [
            { question: "What is at the center of our solar system?", options: ["Earth", "Moon", "Sun", "Jupiter"], correct: 2 },
            { question: "Which planet is called the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
            { question: "Which planet is the biggest?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], correct: 2 },
            { question: "What are Saturn's rings made of?", options: ["Gas", "Fire", "Ice and rock", "Clouds"], correct: 2 }
        ]
    },
    {
        id: 6,
        title: "Internet Safety for Kids",
        topic: "Digital Citizenship",
        subject: "Technology",
        description: "Learn how to stay safe online! Discover tips for protecting your privacy and being a good digital citizen.",
        coverImage: "🛡️",
        grade: "Grade 3-6",
        difficulty: "Easy",
        readTime: "5 min",
        xp: 55,
        content: [
            { image: "🔐", text: "Your password is like a secret key. Never share it with anyone except your parents or guardians!" },
            { image: "👤", text: "Keep personal info private online. Don't share your real name, address, school, or phone number with strangers." },
            { image: "🚨", text: "If something online makes you feel uncomfortable or scared, tell a trusted adult right away!" },
            { image: "💬", text: "Be kind online! Treat others the way you want to be treated. Cyberbullying hurts just like regular bullying." },
            { image: "🤔", text: "Not everything online is true. Ask an adult to help you check if information is real or fake." },
            { image: "⏰", text: "Take breaks from screens! Play outside, read books, and spend time with family and friends in person too." }
        ],
        quiz: [
            { question: "Who can you share your password with?", options: ["Best friend", "Nobody", "Parents/guardians", "Everyone"], correct: 2 },
            { question: "What should you do if something online scares you?", options: ["Ignore it", "Tell a trusted adult", "Share it with friends", "Delete your account"], correct: 1 },
            { question: "Is everything on the internet true?", options: ["Yes", "No", "Only videos", "Only on social media"], correct: 1 }
        ]
    }
];

// Student data
export const mockStudentData = {
    id: 1,
    name: "Explorer",
    email: "student@rulyn.edu",
    grade: 8,
    classId: 1,
    teacherId: 1,
    xp: 3420,
    level: 12,
    streak: 12,
    completedStories: [1],
    completedQuizzes: [1],
    badges: ["first_steps", "science_whiz", "streak_master"],
    dailyProgress: {
        storiesCompleted: 2,
        quizzesTaken: 1,
        minutesLearned: 12
    },
    assignments: {
        pending: [2, 3], // assignment IDs
        completed: [1]
    }
};

// All students in a class (for teacher view)
export const mockClassStudents = [
    { id: 1, name: "Priya Kumar", avatar: "👧", email: "priya@school.edu", grade: 8, xp: 2450, streak: 12, storiesRead: 24, quizzesTaken: 18, avgScore: 92, status: "active", lastActive: "2 hours ago" },
    { id: 2, name: "Arjun Mehta", avatar: "👦", email: "arjun@school.edu", grade: 8, xp: 3200, streak: 30, storiesRead: 32, quizzesTaken: 25, avgScore: 95, status: "active", lastActive: "1 hour ago" },
    { id: 3, name: "Sneha Patel", avatar: "👧", email: "sneha@school.edu", grade: 8, xp: 1800, streak: 5, storiesRead: 18, quizzesTaken: 12, avgScore: 78, status: "needs-support", lastActive: "3 days ago" },
    { id: 4, name: "Rahul Sharma", avatar: "👦", email: "rahul@school.edu", grade: 8, xp: 2100, streak: 8, storiesRead: 20, quizzesTaken: 15, avgScore: 85, status: "active", lastActive: "5 hours ago" },
    { id: 5, name: "Anita Devi", avatar: "👧", email: "anita@school.edu", grade: 8, xp: 2800, streak: 15, storiesRead: 28, quizzesTaken: 22, avgScore: 90, status: "rising", lastActive: "30 mins ago" },
    { id: 6, name: "Vikram Bose", avatar: "👦", email: "vikram@school.edu", grade: 8, xp: 1200, streak: 0, storiesRead: 10, quizzesTaken: 6, avgScore: 65, status: "inactive", lastActive: "1 week ago" },
    { id: 7, name: "Maya Roy", avatar: "👧", email: "maya@school.edu", grade: 8, xp: 2650, streak: 18, storiesRead: 26, quizzesTaken: 20, avgScore: 88, status: "rising", lastActive: "2 hours ago" },
    { id: 8, name: "Kiran Thakur", avatar: "👦", email: "kiran@school.edu", grade: 8, xp: 1950, streak: 7, storiesRead: 19, quizzesTaken: 14, avgScore: 82, status: "active", lastActive: "4 hours ago" }
];

// Teacher data
export const mockTeacherData = {
    id: 1,
    name: "Dr. Sharma",
    email: "sharma@school.edu",
    subject: "Science",
    classes: ["Grade 8 Science", "Grade 9 Science"],
    school: "RULYN Academy",
    schoolCode: "RULYN-001",
    totalStudents: 156,
    assignmentsCreated: 24,
    avgClassScore: 87
};

// Analytics data for teachers
export const mockTeacherAnalytics = {
    weeklyEngagement: [65, 72, 58, 85, 92, 78, 88, 95, 82, 76, 90, 85, 70, 88],
    conceptMastery: [
        { name: "Photosynthesis", understanding: 92, students: 32 },
        { name: "Cell Division", understanding: 78, students: 28 },
        { name: "Newton's Laws", understanding: 65, students: 30 },
        { name: "Chemical Reactions", understanding: 45, students: 25 }
    ],
    subjectProgress: {
        science: 87,
        math: 92,
        reading: 78,
        quizzes: 85
    },
    recentActivity: [
        { type: "quiz_completed", student: "Priya Kumar", detail: "Photosynthesis Quiz - 95%", time: "2 hours ago" },
        { type: "story_read", student: "Arjun Mehta", detail: "Completed 'Journey Through Space'", time: "3 hours ago" },
        { type: "milestone", student: "Maya Roy", detail: "Reached 500 XP milestone", time: "5 hours ago" },
        { type: "streak", student: "Anita Devi", detail: "15-day learning streak!", time: "Yesterday" }
    ]
};

// Helper functions
export const getAssignmentsForStudent = (studentId) => {
    return mockAssignments.filter(a =>
        a.assignedTo === "all" ||
        (Array.isArray(a.assignedTo) && a.assignedTo.includes(studentId))
    );
};

export const getPendingAssignments = (studentId) => {
    return getAssignmentsForStudent(studentId).filter(a =>
        !a.completedBy.includes(studentId) && a.status === "active"
    );
};

export const getCompletedAssignments = (studentId) => {
    return getAssignmentsForStudent(studentId).filter(a =>
        a.completedBy.includes(studentId)
    );
};

export const getStoryById = (storyId) => {
    return mockStories.find(s => s.id === storyId);
};
