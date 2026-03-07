/**
 * Rulyn Database Seed
 * Seeds: 1 teacher, 1 class, 8 students, 6 stories, 3 assignments, 4 schedule events, 5 conversations
 * 
 * Run: node prisma/seed.js
 * Or:  npm run db:seed
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Rulyn database...\n');

  // ── 1. Create Demo Teacher ─────────────────────────────────
  const passwordHash = await bcrypt.hash('rulyn2026', 10);
  const teacher = await prisma.teacher.upsert({
    where: { email: 'sharma@rulyn.edu' },
    update: {},
    create: {
      name:         'Dr. Priya Sharma',
      email:        'sharma@rulyn.edu',
      password_hash: passwordHash,
      subject:      'Science',
      school:       'RULYN Academy',
      school_code:  'RULYN001',
      phone:        '+91 98765 43210',
      language_preference: 'english',
    },
  });
  console.log(`✅ Teacher: ${teacher.name} (${teacher.email}) / password: rulyn2026`);

  // ── 2. Create Class ────────────────────────────────────────
  const classRecord = await prisma.class.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name:        'Grade 8 Science',
      teacher_id:  teacher.id,
      school_code: 'RULYN001',
    },
  });
  console.log(`✅ Class: ${classRecord.name}`);

  // ── 3. Create Demo Students ────────────────────────────────
  const studentsData = [
    { id: 'demo_student_1', name: 'Priya Kumar',   email: 'priya@demo.com',   xp: 2450, streak: 12 },
    { id: 'demo_student_2', name: 'Arjun Mehta',   email: 'arjun@demo.com',   xp: 3200, streak: 30 },
    { id: 'demo_student_3', name: 'Sneha Patel',   email: 'sneha@demo.com',   xp: 1800, streak: 5  },
    { id: 'demo_student_4', name: 'Rahul Sharma',  email: 'rahul@demo.com',   xp: 2100, streak: 8  },
    { id: 'demo_student_5', name: 'Anita Devi',    email: 'anita@demo.com',   xp: 2800, streak: 15 },
    { id: 'demo_student_6', name: 'Vikram Bose',   email: 'vikram@demo.com',  xp: 1200, streak: 0  },
    { id: 'demo_student_7', name: 'Maya Roy',      email: 'maya@demo.com',    xp: 2650, streak: 18 },
    { id: 'demo_student_8', name: 'Kiran Thakur',  email: 'kiran@demo.com',   xp: 1950, streak: 7  },
  ];

  for (const s of studentsData) {
    await prisma.student.upsert({
      where:  { id: s.id },
      update: {},
      create: {
        ...s, grade: 8, class_id: classRecord.id,
        level: Math.floor(s.xp / 500) + 1,
        last_active: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000),
      },
    });
  }
  console.log(`✅ Students: ${studentsData.length} students created`);

  // ── 4. Create 6 Built-in Stories ──────────────────────────
  const stories = [
    {
      title:       'How Plants Make Food',
      topic:       'Photosynthesis',
      subject:     'Science',
      description: 'Discover the magical process that powers all life on Earth!',
      cover_image: '🌱',
      grade_range: 'Grade 3-5',
      difficulty:  'Easy',
      read_time:   '5 min',
      xp:          50,
      content: [
        { image: '☀️', text: 'Plants are amazing living factories. They take in sunlight, water, and carbon dioxide to make their own food through a process called photosynthesis.' },
        { image: '🌿', text: 'Chlorophyll is the green pigment inside plant leaves. It absorbs red and blue light from the sun while reflecting green light — that\'s why plants look green!' },
        { image: '💧', text: 'Roots absorb water from the soil. This water travels up through the stem to the leaves where photosynthesis happens.' },
        { image: '🔬', text: 'Inside the leaf, chloroplasts act like tiny solar panels. They convert light energy into chemical energy stored as glucose (sugar).' },
        { image: '🌍', text: 'As a bonus, plants release oxygen during photosynthesis — the very oxygen we breathe! This is why forests are called the "lungs of the Earth".' },
      ],
      quiz: [
        { question: 'What is the green pigment in plants called?', options: ['Melanin', 'Chlorophyll', 'Carotene', 'Hemoglobin'], correct: 1 },
        { question: 'What do plants take in to perform photosynthesis?', options: ['Oxygen and Water', 'Sunlight, Water, and CO2', 'Nitrogen and Glucose', 'Carbon and Sunlight'], correct: 1 },
        { question: 'What do plants release during photosynthesis?', options: ['Carbon Dioxide', 'Nitrogen', 'Oxygen', 'Water vapor'], correct: 2 },
        { question: 'Where does photosynthesis primarily occur?', options: ['Roots', 'Stem', 'Leaves', 'Flowers'], correct: 2 },
        { question: 'What is the food produced by plants during photosynthesis?', options: ['Starch', 'Glucose', 'Fructose', 'Protein'], correct: 1 },
      ],
    },
    {
      title:       'The Force is With You',
      topic:       "Newton's Laws of Motion",
      subject:     'Science',
      description: "Understand the forces that govern how objects move.",
      cover_image: '⚡',
      grade_range: 'Grade 6-8',
      difficulty:  'Medium',
      read_time:   '7 min',
      xp:          75,
      content: [
        { image: '🍎', text: "Newton's First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. This is called inertia." },
        { image: '🚀', text: "Newton's Second Law: Force equals mass times acceleration (F = ma). The harder you push something, the faster it accelerates. Heavier objects need more force to accelerate." },
        { image: '🎾', text: "Newton's Third Law: For every action, there is an equal and opposite reaction. When you jump off a boat, the boat moves backward while you move forward." },
        { image: '🌙', text: "Newton discovered gravity when he observed that the moon orbits Earth because Earth's gravity pulls it, just as it pulled the famous apple!" },
        { image: '🏎️', text: 'These three laws explain everything from how cars brake to how rockets launch into space. They form the foundation of classical mechanics.' },
      ],
      quiz: [
        { question: "What does Newton's First Law describe?", options: ['F = ma', 'Inertia', 'Gravity', 'Acceleration'], correct: 1 },
        { question: "In Newton's second law, F = ma. What does 'a' stand for?", options: ['Area', 'Amplitude', 'Acceleration', 'Average'], correct: 2 },
        { question: 'When you push a wall, the wall pushes back with equal force. Which law is this?', options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravity'], correct: 2 },
        { question: 'What is inertia?', options: ['A type of force', 'Resistance to change in motion', 'F = ma', 'Gravitational pull'], correct: 1 },
      ],
    },
    {
      title:       'Journey Inside a Cell',
      topic:       'Cell Biology',
      subject:     'Science',
      description: 'Explore the smallest unit of life — the cell!',
      cover_image: '🔬',
      grade_range: 'Grade 6-8',
      difficulty:  'Medium',
      read_time:   '8 min',
      xp:          80,
      content: [
        { image: '🔬', text: 'Every living thing is made of cells — the basic unit of life. The human body contains around 37 trillion cells!' },
        { image: '🧬', text: 'The nucleus is the control center of the cell. It contains DNA, which carries the genetic instructions for all the cell\'s activities.' },
        { image: '⚡', text: 'Mitochondria are the powerhouses of the cell. They produce ATP energy through cellular respiration using oxygen and glucose.' },
        { image: '🏭', text: 'Ribosomes build proteins. The endoplasmic reticulum (ER) transports materials. The Golgi apparatus packages and ships proteins.' },
        { image: '🧱', text: 'Plant cells have a rigid cell wall and chloroplasts. Animal cells have a flexible cell membrane and centrioles for cell division.' },
      ],
      quiz: [
        { question: 'What is the control center of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Vacuole'], correct: 1 },
        { question: 'What do mitochondria produce?', options: ['DNA', 'Proteins', 'ATP energy', 'Chlorophyll'], correct: 2 },
        { question: 'Which organelle builds proteins?', options: ['Nucleus', 'Golgi Apparatus', 'Ribosome', 'Lysosome'], correct: 2 },
        { question: 'What do plant cells have that animal cells do not?', options: ['Nucleus', 'Mitochondria', 'Cell wall and Chloroplasts', 'Ribosomes'], correct: 2 },
      ],
    },
    {
      title:       'Chemical Reactions Around Us',
      topic:       'Chemistry Basics',
      subject:     'Science',
      description: 'Discover how atoms combine to create new substances!',
      cover_image: '⚗️',
      grade_range: 'Grade 6-8',
      difficulty:  'Hard',
      read_time:   '10 min',
      xp:          100,
      content: [
        { image: '⚗️', text: 'A chemical reaction occurs when substances (reactants) are transformed into new substances (products). Atoms rearrange but are never created or destroyed.' },
        { image: '🔥', text: 'Combustion is a reaction where a fuel combines with oxygen to produce heat and light. When wood burns, carbon and hydrogen in wood react with oxygen to form CO2 and water.' },
        { image: '🍋', text: "Acids and bases are everywhere! Lemon juice is acidic (low pH), while baking soda is basic (high pH). When they mix, a neutralization reaction occurs — that's why lemon + baking soda bubbles!" },
        { image: '🦀', text: 'Oxidation (rusting) happens when iron reacts with oxygen and water. This is why iron objects left in rain turn reddish-brown over time.' },
        { image: '⚡', text: 'Catalysts speed up reactions without being consumed. Enzymes in our bodies are biological catalysts that help digest food and power our cells.' },
      ],
      quiz: [
        { question: 'In a chemical reaction, what happens to atoms?', options: ['They are destroyed', 'They are created', 'They rearrange', 'They disappear'], correct: 2 },
        { question: 'What is combustion?', options: ['Mixing acids and bases', 'A fuel reacting with oxygen to produce heat', 'Iron reacting with water', 'Breaking atoms apart'], correct: 1 },
        { question: 'What is a catalyst?', options: ['A reactant that gets consumed', 'A substance that speeds up reactions without being consumed', 'A product of a reaction', 'A type of acid'], correct: 1 },
        { question: 'What causes iron to rust?', options: ['Heat', 'Reaction with oxygen and water', 'Combustion', 'Neutralization'], correct: 1 },
        { question: 'What type of substances speed up reactions in our bodies?', options: ['Acids', 'Combustion products', 'Enzymes (biological catalysts)', 'Bases'], correct: 2 },
      ],
    },
    {
      title:       'Numbers Tell Stories',
      topic:       'Data and Statistics',
      subject:     'Mathematics',
      description: 'Learn how data shapes our understanding of the world.',
      cover_image: '📊',
      grade_range: 'Grade 5-7',
      difficulty:  'Easy',
      read_time:   '6 min',
      xp:          60,
      content: [
        { image: '📊', text: 'Data is everywhere! Every time a company counts sales or a doctor records temperatures, they create data. Math helps us make sense of it.' },
        { image: '📈', text: 'The mean (average) is calculated by adding all values and dividing by the count. The median is the middle value. The mode is the most frequent value.' },
        { image: '📉', text: 'A bar chart compares categories. A pie chart shows parts of a whole. A line graph shows how values change over time. Choosing the right graph matters!' },
        { image: '🎯', text: 'Probability tells us how likely something is to happen. If you flip a coin, there\'s a 50% (or 1/2) chance it lands on heads.' },
        { image: '🌍', text: 'Statistics are used everywhere: weather forecasts, sports scores, election predictions, and even Netflix recommendations!' },
      ],
      quiz: [
        { question: "How do you calculate the mean?", options: ['Find the middle value', 'Find the most frequent value', 'Add all values and divide by count', 'Multiply all values'], correct: 2 },
        { question: 'What does the median represent?', options: ['Average', 'Middle value', 'Most frequent', 'Total sum'], correct: 1 },
        { question: 'Which chart is best for showing change over time?', options: ['Bar chart', 'Pie chart', 'Line graph', 'Scatter plot'], correct: 2 },
        { question: 'If you roll a fair die, what is the probability of getting a 6?', options: ['1/3', '1/2', '1/6', '1/4'], correct: 2 },
      ],
    },
    {
      title:       'How the Internet Works',
      topic:       'Computer Networks',
      subject:     'Technology',
      description: 'Understand the invisible web that connects the world.',
      cover_image: '🌐',
      grade_range: 'Grade 6-9',
      difficulty:  'Medium',
      read_time:   '8 min',
      xp:          80,
      content: [
        { image: '🌐', text: 'The internet is a global network of millions of computers connected together. It was originally created in 1969 as ARPANET, a project by the US military.' },
        { image: '📦', text: 'Data travels as "packets" — small chunks of information. Your email is broken into hundreds of packets, sent separately, and reassembled at the destination.' },
        { image: '📡', text: 'IP addresses are unique labels for every device (like a home address). DNS (Domain Name System) converts website names like "google.com" into IP addresses.' },
        { image: '🔒', text: 'HTTPS keeps your data encrypted and secure. The padlock icon in your browser means your connection is protected from hackers.' },
        { image: '☁️', text: 'Cloud computing stores your data on remote servers instead of your local device. When you use Google Drive or iCloud, you\'re using the cloud.' },
      ],
      quiz: [
        { question: 'How does data travel across the internet?', options: ['As one large file', 'As small packets', 'Through satellite only', 'As radio waves'], correct: 1 },
        { question: 'What does DNS do?', options: ['Encrypts data', 'Assigns IP addresses', 'Converts domain names to IP addresses', 'Speeds up downloads'], correct: 2 },
        { question: 'What does HTTPS provide?', options: ['Faster internet', 'Encrypted secure connection', 'Free data', 'More bandwidth'], correct: 1 },
        { question: 'What is cloud computing?', options: ['Storing data in the sky', 'Storing data on remote servers', 'A type of processor', 'A programming language'], correct: 1 },
      ],
    },
  ];

  for (const storyData of stories) {
    const existing = await prisma.story.findFirst({ where: { title: storyData.title } });
    if (!existing) {
      await prisma.story.create({ data: storyData });
    }
  }
  console.log(`✅ Stories: ${stories.length} stories seeded`);

  // ── 5. Create Demo Assignments ─────────────────────────────
  const firstStory = await prisma.story.findFirst({ where: { title: 'How Plants Make Food' } });
  const secondStory = await prisma.story.findFirst({ where: { title: 'The Force is With You' } });

  if (firstStory && secondStory) {
    const now = new Date();
    const daysFromNow = (d) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000);

    await prisma.assignment.createMany({
      skipDuplicates: true,
      data: [
        {
          title: 'Photosynthesis Quiz',
          description: 'Read the story and complete the quiz',
          type: 'story+quiz',
          story_id: firstStory.id,
          teacher_id: teacher.id,
          class_id: classRecord.id,
          due_date: daysFromNow(7),
          points: 100,
        },
        {
          title: "Newton's Laws Assignment",
          description: 'Complete the story and test your understanding',
          type: 'story',
          story_id: secondStory.id,
          teacher_id: teacher.id,
          class_id: classRecord.id,
          due_date: daysFromNow(14),
          points: 75,
        },
        {
          title: 'Weekly Science Review',
          description: 'Review this week\'s topics and take the quiz',
          type: 'quiz',
          story_id: firstStory.id,
          teacher_id: teacher.id,
          class_id: classRecord.id,
          due_date: daysFromNow(3),
          points: 50,
        },
      ],
    });
    console.log('✅ Assignments: 3 demo assignments created');
  }

  // ── 6. Create Schedule Events ──────────────────────────────
  await prisma.scheduleEvent.createMany({
    skipDuplicates: false,
    data: [
      { teacher_id: teacher.id, title: 'Photosynthesis Lesson',         type: 'lesson',   date: '2026-03-10', time: '10:00 AM', duration: '45 min', class_name: 'Grade 8 Science', color: 'from-blue-500 to-indigo-600' },
      { teacher_id: teacher.id, title: "Newton's Laws Quiz",            type: 'quiz',     date: '2026-03-12', time: '11:00 AM', duration: '30 min', class_name: 'Grade 8 Science', color: 'from-purple-500 to-pink-600' },
      { teacher_id: teacher.id, title: 'Live Science Q&A Session',      type: 'live',     date: '2026-03-14', time: '2:00 PM',  duration: '60 min', class_name: 'Grade 8 Science', color: 'from-emerald-500 to-green-600' },
      { teacher_id: teacher.id, title: 'Assignment Due: Photosynthesis',type: 'deadline', date: '2026-03-18', time: '11:59 PM', duration: '-',      class_name: 'Grade 8 Science', color: 'from-orange-500 to-red-600' },
    ],
  });
  console.log('✅ Schedule: 4 events created');

  // ── 7. Create Demo Conversations ───────────────────────────
  const convData = [
    { type: 'student', participant_name: 'Priya Kumar', participant_avatar: '👧', is_group: false },
    { type: 'student', participant_name: 'Arjun Mehta', participant_avatar: '👦', is_group: false },
    { type: 'parent',  participant_name: "Mrs. Patel (Sneha's Parent)", participant_avatar: '👩', is_group: false },
    { type: 'group',   participant_name: 'Grade 8 Science Class', participant_avatar: '👥', is_group: true, group_size: 32 },
    { type: 'student', participant_name: 'Rahul Sharma', participant_avatar: '👦', is_group: false },
  ];

  for (const c of convData) {
    const conv = await prisma.conversation.create({ data: { ...c, teacher_id: teacher.id } });
    await prisma.message.createMany({
      data: [
        { conversation_id: conv.id, sender_type: 'student', sender_id: 'demo_student_1', text: 'Hello Dr. Sharma! I had a question about today\'s lesson.', sent_at: new Date(Date.now() - 10 * 60000) },
        { conversation_id: conv.id, sender_type: 'teacher', sender_id: String(teacher.id), text: 'Of course! What would you like to know?', sent_at: new Date(Date.now() - 8 * 60000), read: true },
        { conversation_id: conv.id, sender_type: 'student', sender_id: 'demo_student_1', text: 'Thank you for the extra help with photosynthesis!', sent_at: new Date(Date.now() - 2 * 60000) },
      ],
    });
  }
  console.log('✅ Conversations: 5 conversations with messages created');

  // ── 8. Seed some story progress + quiz submissions ─────────
  const story1 = await prisma.story.findFirst({ where: { title: 'How Plants Make Food' } });
  if (story1) {
    await prisma.storyProgress.upsert({
      where: { story_id_student_id: { story_id: story1.id, student_id: 'demo_student_1' } },
      create: { story_id: story1.id, student_id: 'demo_student_1', completed: true, progress_pct: 100, completed_at: new Date() },
      update: {},
    });
    await prisma.quizSubmission.create({
      data: { story_id: story1.id, student_id: 'demo_student_1', score: 4, max_score: 5, percentage: 80, xp_earned: 40, answers: [1, 1, 2, 2, 1] },
    });

    // Award first_steps badge to student 1
    await prisma.badge.upsert({
      where: { student_id_badge_key: { student_id: 'demo_student_1', badge_key: 'first_steps' } },
      create: { student_id: 'demo_student_1', badge_key: 'first_steps' },
      update: {},
    });
    await prisma.badge.upsert({
      where: { student_id_badge_key: { student_id: 'demo_student_1', badge_key: 'streak_master' } },
      create: { student_id: 'demo_student_1', badge_key: 'streak_master' },
      update: {},
    });
  }
  console.log('✅ Story progress & badges seeded for demo students');

  console.log('\n🎉 Database seeded successfully!');
  console.log('─────────────────────────────────────────');
  console.log('  Teacher login:  sharma@rulyn.edu');
  console.log('  Password:       rulyn2026');
  console.log('─────────────────────────────────────────\n');
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
