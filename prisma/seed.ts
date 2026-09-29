import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Database Seed with Official 4-Year B.Tech CSE Curriculum...");

  // 1. Clean existing records safely
  await prisma.auditLog.deleteMany({});
  await prisma.progress.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.pYQ.deleteMany({});
  await prisma.resource.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.unit.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.semester.deleteMany({});
  await prisma.academicYear.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Default Users (Admin & Students)
  const passwordHash = await bcrypt.hash("Engineering@2026", 12);

  const adminUser = await prisma.user.create({
    data: {
      name: "Prof. Rajesh Kumar (HOD CSE)",
      email: "admin@cse.ac.in",
      passwordHash,
      role: "ADMIN",
      emailVerifiedAt: new Date(),
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      currentYear: 4,
      currentSemester: 8,
      streakDays: 45,
      bio: "Department of Computer Science & Engineering - Academic Administrator",
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      name: "Shivam Yadav",
      email: "student@cse.ac.in",
      passwordHash,
      role: "STUDENT",
      emailVerifiedAt: new Date(),
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      currentYear: 2,
      currentSemester: 3,
      specialization: "ML",
      streakDays: 14,
      bio: "2nd Year B.Tech CSE Undergrad | Machine Learning & Full Stack Enthusiast",
    },
  });

  console.log("✅ Users created: Admin (admin@cse.ac.in), Student (student@cse.ac.in)");

  // 3. Create 4 Academic Years
  const yearsData = [
    { yearNumber: 1, title: "1st Year (Foundation & Core Engineering)", description: "Engineering Sciences, Physics, Chemistry, Math & Basic Programming" },
    { yearNumber: 2, title: "2nd Year (Core Computer Science)", description: "Data Structures, Algorithms, OS, COA, Discrete Math, Python & Specializations" },
    { yearNumber: 3, title: "3rd Year (Advanced CSE & Specialization)", description: "DBMS, DAA, OOP, Compiler Design, Computer Networks, Big Data & AI/ML" },
    { yearNumber: 4, title: "4th Year (Industry Electives & Capstone)", description: "Distributed Systems, Cloud, Soft Computing, Research Projects & Capstone" },
  ];

  const yearMap: { [key: number]: number } = {};
  for (const y of yearsData) {
    const yr = await prisma.academicYear.create({
      data: y,
    });
    yearMap[y.yearNumber] = yr.id;
  }

  // 4. Create 8 Semesters matching PDF Credit Scheme
  const semestersData = [
    { semesterNumber: 1, title: "I Semester", academicYearId: yearMap[1], totalCredits: 19.5 },
    { semesterNumber: 2, title: "II Semester", academicYearId: yearMap[1], totalCredits: 20.5 },
    { semesterNumber: 3, title: "III Semester", academicYearId: yearMap[2], totalCredits: 24.0 },
    { semesterNumber: 4, title: "IV Semester", academicYearId: yearMap[2], totalCredits: 21.0 },
    { semesterNumber: 5, title: "V Semester", academicYearId: yearMap[3], totalCredits: 23.0 },
    { semesterNumber: 6, title: "VI Semester", academicYearId: yearMap[3], totalCredits: 21.0 },
    { semesterNumber: 7, title: "VII Semester", academicYearId: yearMap[4], totalCredits: 17.0 },
    { semesterNumber: 8, title: "VIII Semester", academicYearId: yearMap[4], totalCredits: 15.0 },
  ];

  const semMap: { [key: number]: number } = {};
  for (const s of semestersData) {
    const sem = await prisma.semester.create({
      data: s,
    });
    semMap[s.semesterNumber] = sem.id;
  }

  console.log("✅ Academic Years & Semesters initialized with exact credit structures.");

  // 5. Complete Curriculum Matrix from Official PDF
  const subjectsData = [
    // ----------------- YEAR 1 / SEMESTER 1 (Page 1 of PDF) -----------------
    {
      code: "UPH1801",
      title: "Physics",
      slug: "physics-uph1801",
      credits: 5.5,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 3,
      internalMarks: 120, // 40 theory + 80 lab
      externalMarks: 80,  // 60 theory + 20 lab
      totalMarks: 200,
      isElective: false,
      isLab: false,
      department: "Physics",
      semesterId: semMap[1],
      iconName: "Atom",
      description: "Fundamental principles of Quantum Mechanics, Wave Optics, Laser physics, and Fiber Optics with comprehensive laboratory experiments.",
    },
    {
      code: "UMA1003",
      title: "Mathematics-I",
      slug: "mathematics-i-uma1003",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Mathematics",
      semesterId: semMap[1],
      iconName: "Binary",
      description: "Differential and Integral Calculus, Linear Algebra, Matrices, Eigenvalues, and Multivariable Calculus.",
    },
    {
      code: "UEE1801",
      title: "Basic Electrical Engineering",
      slug: "basic-electrical-engineering-uee1801",
      credits: 5.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 2,
      internalMarks: 120,
      externalMarks: 80,
      totalMarks: 200,
      isElective: false,
      isLab: false,
      department: "EE",
      semesterId: semMap[1],
      iconName: "Zap",
      description: "DC/AC Circuit analysis, Magnetic circuits, Single & 3-phase transformers, Electrical machines, and safety installations.",
    },
    {
      code: "UME1801",
      title: "Engineering Graphics and design",
      slug: "engineering-graphics-and-design-ume1801",
      credits: 3.0,
      lectureHours: 1,
      tutorialHours: 0,
      practicalHours: 4,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "ME",
      semesterId: semMap[1],
      iconName: "Compass",
      description: "Orthographic projections, Isometric views, Sections of solids, and CAD tools (AutoCAD/SolidWorks) drafting.",
    },
    {
      code: "UCE1801",
      title: "Environment Science",
      slug: "environment-science-uce1801",
      credits: 2.0,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 20,
      externalMarks: 30,
      totalMarks: 50,
      isElective: false,
      isLab: false,
      department: "Civil",
      semesterId: semMap[1],
      iconName: "Leaf",
      description: "Ecosystems, biodiversity preservation, pollution control technologies, climate change, and environmental legislation.",
    },

    // ----------------- YEAR 1 / SEMESTER 2 (Page 2 of PDF) -----------------
    {
      code: "UCY2801",
      title: "Chemistry",
      slug: "chemistry-ucy2801",
      credits: 5.5,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 3,
      internalMarks: 120,
      externalMarks: 80,
      totalMarks: 200,
      isElective: false,
      isLab: false,
      department: "Chemistry",
      semesterId: semMap[2],
      iconName: "FlaskConical",
      description: "Atomic & molecular structures, Spectroscopic techniques, Thermodynamics, Organic reactions, and electrochemistry.",
    },
    {
      code: "UMA2003",
      title: "Mathematics-II",
      slug: "mathematics-ii-uma2003",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Mathematics",
      semesterId: semMap[2],
      iconName: "Sigma",
      description: "Ordinary & Partial Differential Equations, Vector Calculus, Green's & Stokes' Theorems, and Series Solutions.",
    },
    {
      code: "UCS2802",
      title: "Programming for Problem Solving",
      slug: "programming-for-problem-solving-ucs2802",
      credits: 5.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 2,
      internalMarks: 120,
      externalMarks: 80,
      totalMarks: 200,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[2],
      iconName: "Code",
      description: "Fundamental C programming, memory pointers, dynamic allocation, structures, recursion, and algorithm design.",
    },
    {
      code: "UME2802",
      title: "Workshop Practices",
      slug: "workshop-practices-ume2802",
      credits: 3.0,
      lectureHours: 1,
      tutorialHours: 0,
      practicalHours: 4,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "ME",
      semesterId: semMap[2],
      iconName: "Wrench",
      description: "Hands-on fitting, carpentry, welding, casting, sheet metal, and modern additive manufacturing (3D printing).",
    },
    {
      code: "UEG2801",
      title: "English",
      slug: "english-ueg2801",
      credits: 3.0,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 60,
      externalMarks: 140,
      totalMarks: 200,
      isElective: false,
      isLab: false,
      department: "Humanities",
      semesterId: semMap[2],
      iconName: "FileText",
      description: "Professional technical communication, phonetics, essay and technical report writing, vocabulary and soft skills.",
    },

    // ----------------- YEAR 2 / SEMESTER 3 (Page 3 of PDF) -----------------
    {
      code: "UCS3011",
      title: "Data Structures and Algorithms",
      slug: "data-structures-and-algorithms-ucs3011",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[3],
      iconName: "Network",
      description: "Linear & non-linear data structures: Arrays, Linked Lists, Stacks, Queues, Trees, AVL, Heaps, Graphs, Sorting & Hashing.",
    },
    {
      code: "UCS3209",
      title: "Data Structures and Algorithms Labs",
      slug: "data-structures-and-algorithms-labs-ucs3209",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[3],
      iconName: "Terminal",
      description: "Hands-on implementation of BST, Graph traversal (BFS/DFS), Dijkstra, Dynamic Programming, and sorting algorithms in C++/Java.",
    },
    {
      code: "UCS3012",
      title: "Software Engineering",
      slug: "software-engineering-ucs3012",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[3],
      iconName: "Layers",
      description: "SDLC models, Agile/Scrum methodologies, Requirements engineering, UML architecture, Software testing and CI/CD pipelines.",
    },
    {
      code: "UCS3210",
      title: "Software Engineering Labs",
      slug: "software-engineering-labs-ucs3210",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[3],
      iconName: "GitBranch",
      description: "UML modeling using StarUML, Jira sprint management, automated unit testing with Jest/JUnit, and Git workflow.",
    },
    {
      code: "UMA3007",
      title: "Discrete Mathematics",
      slug: "discrete-mathematics-uma3007",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Mathematics",
      semesterId: semMap[3],
      iconName: "Calculator",
      description: "Set theory, Propositional & Predicate logic, Relations & Functions, Combinatorics, Graph theory, Trees, and Algebraic structures.",
    },
    {
      code: "UEC3001",
      title: "Digital Electronics",
      slug: "digital-electronics-uec3001",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "EC",
      semesterId: semMap[3],
      iconName: "Cpu",
      description: "Boolean algebra, K-Maps, Combinational circuits (Multiplexers, Decoders), Sequential circuits (Flip-Flops, Counters), and Memory ICs.",
    },
    {
      code: "UEC3201",
      title: "Digital Electronics Labs",
      slug: "digital-electronics-labs-uec3201",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "EC",
      semesterId: semMap[3],
      iconName: "CircuitBoard",
      description: "Hardware breadboard simulations & Verilog HDL synthesis of adders, flip-flops, registers, and 7-segment display drivers.",
    },
    {
      code: "UCS3018",
      title: "Python Programming",
      slug: "python-programming-ucs3018",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[3],
      iconName: "TerminalSquare",
      description: "Python data structures, OOPs, Functional programming, NumPy, Pandas, file handling, regex, and API integration.",
    },
    {
      code: "UCS3215",
      title: "Python Programming Lab",
      slug: "python-programming-lab-ucs3215",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[3],
      iconName: "Code2",
      description: "Practical coding assignments on web scraping, data manipulation with Pandas, automation scripts, and Flask REST APIs.",
    },
    {
      code: "UEG3005",
      title: "Effective Technical Communication",
      slug: "effective-technical-communication-ueg3005",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Humanities",
      semesterId: semMap[3],
      iconName: "MessageSquare",
      description: "Technical presentations, Group Discussions, Resume engineering, Research papers, and Cross-cultural corporate communication.",
    },
    // Semester 3 Specializations
    {
      code: "UCS3001BD",
      title: "Computational Mathematics for Data Analytics",
      slug: "computational-mathematics-data-analytics-ucs3001bd",
      credits: 3.0,
      lectureHours: 2,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      specializationStream: "BD",
      department: "CSE",
      semesterId: semMap[3],
      iconName: "BarChart3",
      description: "Specialization (Big Data Analytics): Probability distributions, Hypothesis testing, Matrix decompositions (SVD, PCA), and optimization.",
    },
    {
      code: "UCS3001SE",
      title: "Object Oriented Analysis and Design",
      slug: "object-oriented-analysis-and-design-ucs3001se",
      credits: 3.0,
      lectureHours: 2,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      specializationStream: "SE",
      department: "CSE",
      semesterId: semMap[3],
      iconName: "Boxes",
      description: "Specialization (Software Engineering): GoF Design Patterns, SOLID principles, Domain Driven Design, and architectural modeling.",
    },
    {
      code: "UCS3001IO",
      title: "IOT Development Boards and Sensors",
      slug: "iot-development-boards-and-sensors-ucs3001io",
      credits: 2.0,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      specializationStream: "IOT",
      department: "CSE",
      semesterId: semMap[3],
      iconName: "Radio",
      description: "Specialization (Internet of Things): Arduino, ESP32, Raspberry Pi, GPIO interfacing, Analog/Digital sensors and protocols (I2C, SPI, UART).",
    },
    {
      code: "UCS3001ML",
      title: "Applied Python and Data Science",
      slug: "applied-python-and-data-science-ucs3001ml",
      credits: 3.0,
      lectureHours: 2,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      specializationStream: "ML",
      department: "CSE",
      semesterId: semMap[3],
      iconName: "BrainCircuit",
      description: "Specialization (Machine Learning): Exploratory Data Analysis, Matplotlib/Seaborn visualizations, Scikit-learn feature engineering, and statistical modeling.",
    },
    {
      code: "UCS3002BD",
      title: "Big Data Fundamentals",
      slug: "big-data-fundamentals-ucs3002bd",
      credits: 3.0,
      lectureHours: 2,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      specializationStream: "BD",
      department: "CSE",
      semesterId: semMap[3],
      iconName: "Database",
      description: "Specialization (Big Data Analytics): 5 V's of Big Data, Distributed file systems, CAP theorem, and intro to MapReduce.",
    },
    {
      code: "UCS3002ML",
      title: "Clean Coding",
      slug: "clean-coding-ucs3002ml",
      credits: 3.0,
      lectureHours: 2,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      specializationStream: "ML",
      department: "CSE",
      semesterId: semMap[3],
      iconName: "FileCheck2",
      description: "Specialization (Machine Learning / SE): Writing readable, maintainable Python/C++ code, refactoring code smells, static analysis, and docstrings.",
    },

    // ----------------- YEAR 2 / SEMESTER 4 (Page 4 of PDF) -----------------
    {
      code: "UCS4012",
      title: "Computer Organization and Architecture",
      slug: "computer-organization-and-architecture-ucs4012",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Cpu",
      description: "Instruction set architecture (RISC/CISC), Pipelining, Hazard detection, Cache memory hierarchies, Virtual memory, and DMA.",
    },
    {
      code: "UCS4210",
      title: "Computer Organization and Architecture Labs",
      slug: "computer-organization-and-architecture-labs-ucs4210",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Microchip",
      description: "Assembly language programming (8086/MIPS), memory mapping simulations, and ALU pipeline benchmark studies.",
    },
    {
      code: "UCS4013",
      title: "Operating System",
      slug: "operating-system-ucs4013",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Server",
      description: "Processes, Threads, CPU scheduling algorithms, Synchronization (Semaphores, Mutex), Deadlock avoidance, Paging, and File systems.",
    },
    {
      code: "UCS4211",
      title: "Operating System Labs",
      slug: "operating-system-labs-ucs4211",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Terminal",
      description: "Linux system calls (fork, exec, pipe), POSIX threads (pthread), Banker's algorithm, and page replacement simulations in C.",
    },
    {
      code: "UCS4014",
      title: "Formal Language and Automata Theory",
      slug: "formal-language-and-automata-theory-ucs4014",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Binary",
      description: "Finite Automata (DFA, NFA), Regular Expressions, Context-Free Grammars, Pushdown Automata, Turing Machines, and Halting problem.",
    },
    {
      code: "UCS4019",
      title: "Unix and Shell Programming",
      slug: "unix-and-shell-programming-ucs4019",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Terminal",
      description: "Unix architecture, File permissions, Process management, Bash scripting, Awk, Sed, Grep regex filtering, and cron jobs.",
    },
    {
      code: "UCS4212",
      title: "Unix and Shell Programming Lab",
      slug: "unix-and-shell-programming-lab-ucs4212",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Code",
      description: "Practical Bash automation scripts, text parsing with awk/sed, socket programming, and user management administration.",
    },
    {
      code: "UMG4008",
      title: "Organizational Behavior",
      slug: "organizational-behavior-umg4008",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "MGMT",
      semesterId: semMap[4],
      iconName: "Users",
      description: "Individual behavior, motivation theories, group dynamics, leadership styles, conflict resolution, and organizational culture.",
    },
    {
      code: "ULA4401",
      title: "Constitution of India",
      slug: "constitution-of-india-ula4401",
      credits: 0.0,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 50,
      externalMarks: 50,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Law",
      semesterId: semMap[4],
      iconName: "Scale",
      description: "Fundamental Rights & Duties, Directive Principles, Union & State Executive, Judiciary, and Emergency provisions.",
    },
    {
      code: "UCS4602IV",
      title: "Industrial Visit-I",
      slug: "industrial-visit-i-ucs4602iv",
      credits: 0.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 100,
      externalMarks: 0,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[4],
      iconName: "Building2",
      description: "Industry exposure, tech company visit, enterprise infrastructure inspection, and technical study report.",
    },

    // ----------------- YEAR 3 / SEMESTER 5 (Page 5 of PDF) -----------------
    {
      code: "UCS5012",
      title: "Database Management System",
      slug: "database-management-system-ucs5012",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[5],
      iconName: "Database",
      description: "Relational algebra, SQL, Normalization (1NF to BCNF), Transaction processing, ACID properties, Concurrency control, and NoSQL fundamentals.",
    },
    {
      code: "UCS5208",
      title: "Database Management System Labs",
      slug: "database-management-system-labs-ucs5208",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[5],
      iconName: "Table",
      description: "Complex SQL queries, PL/SQL stored procedures, Triggers, Views, Indexing benchmarks, and MongoDB NoSQL CRUD operations.",
    },
    {
      code: "UCS5013",
      title: "Design and Analysis of Algorithms",
      slug: "design-and-analysis-of-algorithms-ucs5013",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[5],
      iconName: "GitMerge",
      description: "Asymptotic notation, Divide and Conquer, Greedy algorithms, Dynamic Programming, Backtracking, Branch & Bound, NP-Completeness.",
    },
    {
      code: "UCS5209",
      title: "Design and Analysis of Algorithms Labs",
      slug: "design-and-analysis-of-algorithms-labs-ucs5209",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[5],
      iconName: "Cpu",
      description: "Implementation and time complexity analysis of 0/1 Knapsack, Floyd-Warshall, N-Queens problem, TSP, and Huffman coding.",
    },
    {
      code: "UCS5014",
      title: "Object Oriented Programming",
      slug: "object-oriented-programming-ucs5014",
      credits: 3.0,
      lectureHours: 2,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[5],
      iconName: "Box",
      description: "Core Java & C++ OOPs: Encapsulation, Polymorphism, Inheritance, Interfaces, Exception handling, Generics, and Multithreading.",
    },
    {
      code: "UCC5210",
      title: "Object Oriented Programming Labs",
      slug: "object-oriented-programming-labs-ucc5210",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[5],
      iconName: "Code",
      description: "Object-oriented software development projects in Java/C++, Collections framework, Java Streams, and GUI with JavaFX/Swing.",
    },
    {
      code: "UEC5002",
      title: "Signal & System",
      slug: "signal-and-system-uec5002",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "EC",
      semesterId: semMap[5],
      iconName: "Activity",
      description: "Continuous and Discrete time signals, LTI systems, Fourier series, Fourier Transform, Laplace transform, and Z-Transform.",
    },
    {
      code: "UCS5107",
      title: "Ecommerce (Elective-I)",
      slug: "ecommerce-elective-i-ucs5107",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Elective-I",
      department: "CSE",
      semesterId: semMap[5],
      iconName: "ShoppingCart",
      description: "E-commerce architecture, payment gateway security, digital supply chains, CRM integration, and online marketplace mechanics.",
    },
    {
      code: "UCS5110",
      title: "Computer Graphics (Elective-I)",
      slug: "computer-graphics-elective-i-ucs5110",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Elective-I",
      department: "CSE",
      semesterId: semMap[5],
      iconName: "Image",
      description: "Raster scan displays, Line drawing (Bresenham's, DDA), 2D/3D transformations, Clipping (Cohen-Sutherland), and OpenGL shading.",
    },
    {
      code: "UMG5301",
      title: "Principles of Management (Open Elective-I)",
      slug: "principles-of-management-open-elective-i-umg5301",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Open Elective-I",
      department: "MGMT",
      semesterId: semMap[5],
      iconName: "Briefcase",
      description: "Functions of management: Planning, Organizing, Staffing, Leading, and Controlling in modern technology enterprises.",
    },
    {
      code: "ULA5402",
      title: "Essence of Indian Traditional Knowledge",
      slug: "essence-of-indian-traditional-knowledge-ula5402",
      credits: 0.0,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 50,
      externalMarks: 50,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Humanities",
      semesterId: semMap[5],
      iconName: "BookOpen",
      description: "Vedic science, Indian philosophy, ancient metallurgy, astronomical systems, and indigenous technological heritage.",
    },
    {
      code: "UAP5403",
      title: "Aptitude and Reasoning and online Test",
      slug: "aptitude-and-reasoning-uap5403",
      credits: 0.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 100,
      externalMarks: 0,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "Training",
      semesterId: semMap[5],
      iconName: "Award",
      description: "Quantitative aptitude, Logical reasoning, Verbal ability, Data interpretation, and campus placement mock interviews.",
    },

    // ----------------- YEAR 3 / SEMESTER 6 (Page 6 of PDF) -----------------
    {
      code: "UCS6006",
      title: "Compiler Design",
      slug: "compiler-design-ucs6006",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[6],
      iconName: "Layers",
      description: "Phases of a compiler, Lexical analysis (LEX/Flex), Syntax analysis (YACC/Bison, LL/LR parsers), Intermediate code generation, and Code optimization.",
    },
    {
      code: "UCS6205",
      title: "Compiler Design Labs",
      slug: "compiler-design-labs-ucs6205",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[6],
      iconName: "Terminal",
      description: "Building a mini-compiler using Lex and Yacc: Tokenizer, Shift-Reduce Parser, AST generation, and three-address code generator.",
    },
    {
      code: "UCS6007",
      title: "Computer Networks",
      slug: "computer-networks-ucs6007",
      credits: 4.0,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "CSE",
      semesterId: semMap[6],
      iconName: "Globe",
      description: "OSI & TCP/IP models, Data link layer (Sliding window, CSMA/CD), Network layer (IP addressing, Subnetting, Routing: OSPF, BGP), Transport (TCP/UDP), and DNS/HTTP.",
    },
    {
      code: "UCS6206",
      title: "Computer Networks Labs",
      slug: "computer-networks-labs-ucs6206",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[6],
      iconName: "Network",
      description: "Cisco Packet Tracer network topology design, Wireshark packet analysis, Socket programming (TCP Client-Server) in C/Python.",
    },
    {
      code: "UCS6110",
      title: "Artificial Intelligence (Elective-II)",
      slug: "artificial-intelligence-elective-ii-ucs6110",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Elective-II",
      department: "CSE",
      semesterId: semMap[6],
      iconName: "Bot",
      description: "State space search, A* & Heuristic search, Minimax & Alpha-Beta pruning, Knowledge representation, Expert systems, and Natural Language Processing.",
    },
    {
      code: "UCS6113",
      title: "Cryptography and Network Security (Elective-III)",
      slug: "cryptography-and-network-security-elective-iii-ucs6113",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Elective-III",
      department: "CSE",
      semesterId: semMap[6],
      iconName: "Lock",
      description: "Symmetric key cryptography (AES, DES), Asymmetric key cryptography (RSA, ECC), Digital signatures, SHA hashing, SSL/TLS, and Firewalls.",
    },
    {
      code: "USS6402",
      title: "Soft-Skill and Interpersonal Communication",
      slug: "soft-skill-and-interpersonal-communication-uss6402",
      credits: 2.0,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 100,
      externalMarks: 0,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Humanities",
      semesterId: semMap[6],
      iconName: "Sparkles",
      description: "Corporate etiquette, emotional intelligence, conflict negotiation, public speaking, leadership skills, and team management.",
    },
    {
      code: "UCS6702PJ",
      title: "Project-I",
      slug: "project-i-ucs6702pj",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 4,
      internalMarks: 100,
      externalMarks: 0,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[6],
      iconName: "FolderGit2",
      description: "Minor capstone project development, SRS documentation, system architecture design, and working prototype demo.",
    },
    {
      code: "UCS6703SM",
      title: "Seminar",
      slug: "seminar-ucs6703sm",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 100,
      externalMarks: 0,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[6],
      iconName: "Presentation",
      description: "Research paper review, technical presentation on emerging CS trends (Web3, Generative AI, Quantum Computing), and peer evaluation.",
    },

    // ----------------- YEAR 4 / SEMESTER 7 (Page 7 of PDF) -----------------
    {
      code: "UCS7105",
      title: "Distributed System (Elective-IV)",
      slug: "distributed-system-elective-iv-ucs7105",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Elective-IV",
      department: "CSE",
      semesterId: semMap[7],
      iconName: "Share2",
      description: "Distributed architectures, RPC/RMI, Logical clocks (Lamport, Vector), Consensus algorithms (Paxos, Raft), Distributed transactions, and Fault tolerance.",
    },
    {
      code: "UCS7106",
      title: "Data Mining and Data Warehousing (Elective-V)",
      slug: "data-mining-data-warehousing-elective-v-ucs7106",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Elective-V",
      department: "CSE",
      semesterId: semMap[7],
      iconName: "Boxes",
      description: "OLAP vs OLTP, Star & Snowflake schemas, Association rule mining (Apriori), Clustering (K-Means, DBSCAN), and Decision Trees.",
    },
    {
      code: "UCS7301",
      title: "MOOC: Block chain Architecture (Open Elective-II)",
      slug: "mooc-blockchain-architecture-open-elective-ii-ucs7301",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Open Elective-II",
      department: "CSE",
      semesterId: semMap[7],
      iconName: "Link2",
      description: "Blockchain fundamentals, Proof of Work / Proof of Stake, Smart Contracts with Solidity, Ethereum EVM, and Decentralized Apps (DApps).",
    },
    {
      code: "UBS7012",
      title: "Biology",
      slug: "biology-ubs7012",
      credits: 2.0,
      lectureHours: 2,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: false,
      isLab: false,
      department: "Science",
      semesterId: semMap[7],
      iconName: "Dna",
      description: "Biomolecules, Genetics, Information transfer in biological systems, Bio-inspired computing, and Neural network biological models.",
    },
    {
      code: "UCS7702PJ",
      title: "Project-II",
      slug: "project-ii-ucs7702pj",
      credits: 5.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 10,
      internalMarks: 100,
      externalMarks: 0,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[7],
      iconName: "FolderKanban",
      description: "Major capstone engineering project - Phase 1: High-level design, database normalization, system implementation, and mid-term evaluation.",
    },
    {
      code: "UCS7601ST",
      title: "Summer Training",
      slug: "summer-training-ucs7601st",
      credits: 1.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 2,
      internalMarks: 100,
      externalMarks: 0,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[7],
      iconName: "Briefcase",
      description: "6 to 8 weeks internship experience in software engineering industry or research laboratory with completion certificate and viva-voce.",
    },

    // ----------------- YEAR 4 / SEMESTER 8 (Page 8 of PDF) -----------------
    {
      code: "UCS8101",
      title: "Embedded System (Elective-VI)",
      slug: "embedded-system-elective-vi-ucs8101",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Elective-VI",
      department: "CSE",
      semesterId: semMap[8],
      iconName: "Cpu",
      description: "ARM Cortex architecture, Real-Time Operating Systems (FreeRTOS), Task scheduling, Inter-process communication, and Device drivers.",
    },
    {
      code: "UCS8301",
      title: "Green Computing (Open Elective-IV)",
      slug: "green-computing-open-elective-iv-ucs8301",
      credits: 3.0,
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 0,
      internalMarks: 40,
      externalMarks: 60,
      totalMarks: 100,
      isElective: true,
      electiveCategory: "Open Elective-IV",
      department: "CSE",
      semesterId: semMap[8],
      iconName: "Leaf",
      description: "Energy-efficient data centers, Carbon footprint minimization in cloud computing, Green metrics, and sustainable computing strategies.",
    },
    {
      code: "UCS8702PJ",
      title: "Project-III",
      slug: "project-iii-ucs8702pj",
      credits: 6.0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 12,
      internalMarks: 80,
      externalMarks: 20,
      totalMarks: 100,
      isElective: false,
      isLab: true,
      department: "CSE",
      semesterId: semMap[8],
      iconName: "Rocket",
      description: "Final Capstone Major Project: Complete production deployment, comprehensive thesis submission, external university viva, and research publication.",
    },
  ];

  console.log(`⏳ Seeding ${subjectsData.length} Subjects directly from the PDF curriculum...`);

  const createdSubjects: { [code: string]: any } = {};

  for (const s of subjectsData) {
    const sub = await prisma.subject.create({
      data: s,
    });
    createdSubjects[s.code] = sub;
  }

  console.log("✅ All subjects successfully mapped and created in the database.");

  // 6. Create Units for Flagship Subject (Data Structures & Algorithms - UCS3011)
  const dsaSubject = createdSubjects["UCS3011"];
  if (dsaSubject) {
    const u1 = await prisma.unit.create({
      data: {
        subjectId: dsaSubject.id,
        unitNumber: 1,
        title: "Unit 1: Arrays, Strings, and Linked Lists",
        description: "Asymptotic complexity, dynamic arrays, singly & doubly linked lists, circular lists, memory allocation.",
        topics: JSON.stringify([
          "Time & Space Complexity Analysis (Big-O, Big-Omega, Big-Theta)",
          "Dynamic Arrays and Memory Layout",
          "Singly Linked List (Insertion, Deletion, Reversal)",
          "Doubly Linked List and Circular Linked List",
          "Fast and Slow Pointer Technique (Floyd's Cycle Detection)",
        ]),
      },
    });

    const u2 = await prisma.unit.create({
      data: {
        subjectId: dsaSubject.id,
        unitNumber: 2,
        title: "Unit 2: Stacks and Queues",
        description: "LIFO & FIFO structures, monotonic stacks, circular queues, deque, and algorithmic applications.",
        topics: JSON.stringify([
          "Stack Implementation using Arrays & Linked Lists",
          "Infix to Postfix Conversion & Postfix Evaluation",
          "Queue Implementation & Circular Queue",
          "Double-Ended Queue (Deque)",
          "Monotonic Stack (Next Greater Element)",
        ]),
      },
    });

    const u3 = await prisma.unit.create({
      data: {
        subjectId: dsaSubject.id,
        unitNumber: 3,
        title: "Unit 3: Trees and Binary Search Trees",
        description: "Hierarchical data structures, Tree traversals, AVL self-balancing trees, B-Trees.",
        topics: JSON.stringify([
          "Binary Trees & Properties",
          "Preorder, Inorder, Postorder & Level-order Traversals",
          "Binary Search Trees (BST) Insertion, Deletion, Search",
          "AVL Trees (LL, RR, LR, RL Rotations)",
          "Heap Data Structure & Priority Queues",
        ]),
      },
    });

    const u4 = await prisma.unit.create({
      data: {
        subjectId: dsaSubject.id,
        unitNumber: 4,
        title: "Unit 4: Graphs and Algorithms",
        description: "Graph representations, BFS, DFS, Shortest Path algorithms, Minimum Spanning Trees.",
        topics: JSON.stringify([
          "Adjacency Matrix & Adjacency List",
          "Breadth First Search (BFS) & Depth First Search (DFS)",
          "Dijkstra's Shortest Path Algorithm",
          "Bellman-Ford Algorithm & Floyd-Warshall",
          "Kruskal's and Prim's MST (Disjoint Set Union)",
        ]),
      },
    });

    const u5 = await prisma.unit.create({
      data: {
        subjectId: dsaSubject.id,
        unitNumber: 5,
        title: "Unit 5: Searching, Sorting, and Hashing",
        description: "Comparative sorting, linear time sorting, Hash functions, collision resolution.",
        topics: JSON.stringify([
          "QuickSort & MergeSort Analysis",
          "HeapSort & Counting Sort",
          "Hash Tables & Hash Functions",
          "Collision Resolution (Separate Chaining & Open Addressing)",
        ]),
      },
    });

    // 7. Seed GFG-Style Technical Articles with Syntax-Highlighted Code & Interactive Quiz
    const article1 = await prisma.article.create({
      data: {
        title: "Singly Linked List: Implementation, Insertion, and Deletion",
        slug: "singly-linked-list-insertion-deletion",
        summary: "A complete guide to understanding dynamic node structures, pointer manipulation, and implementing Singly Linked Lists with O(1) head insertion and O(N) traversal.",
        difficulty: "BEGINNER",
        readTimeMinutes: 8,
        order: 1,
        subjectId: dsaSubject.id,
        unitId: u1.id,
        tags: "Linked List, Data Structures, Pointers, Memory Allocation",
        conceptContent: `### What is a Linked List?
A **Linked List** is a linear data structure where elements are not stored at contiguous memory locations. Instead, elements are linked using pointers or references. Each node in a singly linked list contains:
1. **Data**: The value stored in the node.
2. **Next Pointer**: A reference to the subsequent node in the sequence.

\`\`\`text
[ Head: Node 1 ] -> [ Node 2 ] -> [ Node 3 ] -> NULL
  Data | Next        Data | Next    Data | NULL
\`\`\`

---

### Key Advantages Over Standard Arrays
- **Dynamic Size**: Easily grow and shrink at runtime without pre-allocating large memory blocks.
- **Efficient Insertions/Deletions**: Adding or deleting an element at the beginning takes **$O(1)$** time, compared to $O(N)$ for contiguous arrays due to shifting.
- **No Memory Wastage**: Nodes are allocated on the heap only when needed.

---

### Core Operations and Time Complexities
| Operation | Time Complexity | Space Complexity |
|---|---|---|
| Insertion at Head | $O(1)$ | $O(1)$ |
| Insertion at Tail | $O(N)$ or $O(1)$ with tail ptr | $O(1)$ |
| Deletion at Head | $O(1)$ | $O(1)$ |
| Search by Value | $O(N)$ | $O(1)$ |`,
        codeExamples: JSON.stringify([
          {
            language: "cpp",
            title: "C++ Implementation of Singly Linked List",
            code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
public:
    LinkedList() : head(nullptr) {}

    // Insert at front - O(1)
    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    // Print all nodes - O(N)
    void display() {
        Node* curr = head;
        while (curr != nullptr) {
            cout << curr->data << " -> ";
            curr = curr->next;
        }
        cout << "NULL\\n";
    }
};

int main() {
    LinkedList list;
    list.insertAtHead(30);
    list.insertAtHead(20);
    list.insertAtHead(10);
    list.display(); // Output: 10 -> 20 -> 30 -> NULL
    return 0;
}`,
            explanation: "Node structure with constructor, constant-time head insertion, and linear iterative display."
          },
          {
            language: "python",
            title: "Python Implementation",
            code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def display(self):
        curr = self.head
        elements = []
        while curr:
            elements.append(str(curr.data))
            curr = curr.next
        print(" -> ".join(elements) + " -> None")

# Testing the linked list
ll = LinkedList()
ll.insert_at_head(300)
ll.insert_at_head(200)
ll.insert_at_head(100)
ll.display()`,
            explanation: "Clean pythonic linked list with dynamic attribute binding."
          }
        ]),
        diagramAscii: `
[ Head ]
   │
   ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Data: 10     │ ───► │ Data: 20     │ ───► │ Data: 30     │ ───► NULL
│ Next: 0x10A8 │      │ Next: 0x10C0 │      │ Next: NULL   │
└──────────────┘      └──────────────┘      └──────────────┘
`,
        keyPoints: JSON.stringify([
          "Linked lists allocate memory dynamically node-by-node on the heap.",
          "Head pointer is the only entry point into a singly linked list.",
          "Reversing a singly linked list takes O(N) time using 3 pointers (prev, curr, next).",
          "Floyd's Cycle Finding Algorithm uses slow (1 step) and fast (2 steps) pointers."
        ]),
        commonMistakes: JSON.stringify([
          "Losing reference to the remaining list before updating the current node's next pointer.",
          "Not handling NULL head edge case when deleting from an empty list.",
          "Memory leaks in C++ by not calling 'delete' on removed heap nodes.",
          "NullPointerException / Segmentation Fault when accessing node.next on a null node."
        ]),
        practiceQuiz: JSON.stringify([
          {
            question: "What is the time complexity to insert a new node at the beginning of a singly linked list with N nodes?",
            options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
            answerIndex: 0,
            explanation: "Inserting at the head only requires changing two pointers: the new node's next pointer to current head, and head pointer to new node. No traversal is required."
          },
          {
            question: "Which algorithm is used to detect loops or cycles in a linked list with O(1) auxiliary space?",
            options: ["Dijkstra's Algorithm", "Floyd's Tortoise and Hare Algorithm", "Kruskal's Algorithm", "Binary Search"],
            answerIndex: 1,
            explanation: "Floyd's Cycle-Finding Algorithm uses two pointers moving at different speeds (1 step and 2 steps) to detect loops in O(N) time and O(1) space."
          }
        ]),
      },
    });

    const article2 = await prisma.article.create({
      data: {
        title: "Dijkstra's Shortest Path Algorithm Explained with Priority Queue",
        slug: "dijkstras-shortest-path-algorithm",
        summary: "Master Dijkstra's greedy shortest path algorithm for weighted graphs with non-negative edge weights using Min-Heaps in O((V + E) log V) time.",
        difficulty: "INTERMEDIATE",
        readTimeMinutes: 10,
        order: 2,
        subjectId: dsaSubject.id,
        unitId: u4.id,
        tags: "Graphs, Greedy, Dijkstra, Shortest Path, Min Heap",
        conceptContent: `### Problem Formulation
Given a weighted graph $G = (V, E)$ and a source vertex $S$, find the shortest distance from $S$ to all other vertices in the graph. All edge weights must be non-negative ($w(u, v) \\ge 0$).

### Core Greedy Strategy
1. Initialize distance array \`dist[]\` with $\\infty$, except \`dist[S] = 0\`.
2. Insert \`(0, S)\` into a **Min-Heap (Priority Queue)**.
3. While the priority queue is not empty:
   - Extract the node $u$ with minimum tentative distance.
   - For each adjacent neighbor $v$ of $u$ with edge weight $w$:
     - If $\\text{dist}[u] + w < \\text{dist}[v]$:
       - Update $\\text{dist}[v] = \\text{dist}[u] + w$.
       - Push $(\\text{dist}[v], v)$ into the Min-Heap.`,
        codeExamples: JSON.stringify([
          {
            language: "cpp",
            title: "Dijkstra's Algorithm with std::priority_queue",
            code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii; // {distance, vertex}

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int src) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, 1e9);

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
            explanation: "Optimized implementation running in O((V + E) log V) time using C++ standard Min-Heap."
          }
        ]),
        diagramAscii: `
      (1) ─── 4 ───► (2)
     ▲ │              │ ▲
   2/  │              │  \\3
   /   │1            2│   \\
 (0)   ▼              ▼    (4)
   \\   (3) ─── 5 ───► (5)  /
   7\\                      /2
     ▼────────────────────►
`,
        keyPoints: JSON.stringify([
          "Dijkstra does NOT work correctly with negative weight edges (Use Bellman-Ford instead).",
          "Time complexity with Min-Heap is O((V + E) log V).",
          "Greedy property: once a node is finalized from the priority queue, its computed shortest distance is optimal."
        ]),
        commonMistakes: JSON.stringify([
          "Attempting to use Dijkstra on graphs with negative cycles.",
          "Using a standard FIFO queue instead of a Priority Queue.",
          "Forgetting to skip stale entries in the priority queue (d > dist[u])."
        ]),
        practiceQuiz: JSON.stringify([
          {
            question: "Why does Dijkstra's algorithm fail on graphs containing negative edge weights?",
            options: [
              "It goes into an infinite loop always",
              "Greedy choice assumes shortest distance once finalized cannot be improved by subsequent negative edges",
              "Priority Queue cannot store negative numbers",
              "It causes memory overflow"
            ],
            answerIndex: 1,
            explanation: "Dijkstra marks vertices as visited assuming distances can only grow. A negative weight can retroactively decrease the distance to an already settled node."
          }
        ])
      }
    });

    // 8. Seed Resources (Notes, Lectures, PPTs) for DSA
    await prisma.resource.createMany({
      data: [
        {
          title: "Complete DSA Hand-Written Comprehensive Notes (All 5 Units)",
          description: "Prof. Rajesh Kumar's complete handwritten lecture notes with proofs, diagrammatic walkthroughs, and solved university questions.",
          type: "PDF_NOTES",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          fileSize: "8.4 MB",
          downloadCount: 342,
          subjectId: dsaSubject.id,
          unitId: u1.id,
          tags: "Handwritten, Complete Syllabus, Unit 1-5",
        },
        {
          title: "NPTEL / MIT 6.006 Lecture Series: Advanced Graph Algorithms",
          description: "Official video lecture playlist covering Shortest Path, Disjoint Sets, and Minimum Spanning Trees.",
          type: "LECTURE_VIDEO",
          url: "https://www.youtube.com/watch?v=09_LlHjoEiY",
          fileSize: "45 mins",
          downloadCount: 890,
          subjectId: dsaSubject.id,
          unitId: u4.id,
          tags: "Video, NPTEL, Graph Algorithms",
        },
        {
          title: "Data Structures Laboratory Manual (C & C++ Code Repository)",
          description: "Prescribed 14 lab experiment programs with problem statements, algorithms, source code, and sample test cases.",
          type: "LAB_MANUAL",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          fileSize: "3.1 MB",
          downloadCount: 512,
          subjectId: dsaSubject.id,
          unitId: u2.id,
          tags: "Lab Manual, C++, Programs",
        },
        {
          title: "Introduction to Algorithms (CLRS) - Reference Resource Guide",
          description: "Core textbook study guide with selected chapter exercises and solutions.",
          type: "REFERENCE_BOOK",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          fileSize: "14.2 MB",
          downloadCount: 1205,
          subjectId: dsaSubject.id,
          unitId: u3.id,
          tags: "CLRS, Reference, MIT Press",
        },
      ],
    });

    // 9. Seed Previous Year Questions (PYQs)
    await prisma.pYQ.createMany({
      data: [
        {
          examYear: 2024,
          examType: "END_SEM",
          questionPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          solutionPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          totalMarks: 60,
          durationMinutes: 180,
          isImportant: true,
          downloadCount: 780,
          keyTopicsCovered: "AVL Tree Rotations, Dijkstra Algorithm, Floyd Warshall, Monotonic Stack, QuickSort Partitioning",
          subjectId: dsaSubject.id,
        },
        {
          examYear: 2023,
          examType: "END_SEM",
          questionPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          solutionPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          totalMarks: 60,
          durationMinutes: 180,
          isImportant: true,
          downloadCount: 640,
          keyTopicsCovered: "B-Tree Insertion, Infix to Postfix, Kruskal MST, Graph BFS/DFS traversal",
          subjectId: dsaSubject.id,
        },
        {
          examYear: 2024,
          examType: "MID_SEM",
          questionPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          solutionPdfUrl: null,
          totalMarks: 30,
          durationMinutes: 90,
          isImportant: false,
          downloadCount: 420,
          keyTopicsCovered: "Linked List Reversal, Circular Queue, Time Complexity recurrence relations",
          subjectId: dsaSubject.id,
        },
      ],
    });

    // 10. Seed Student Progress and Bookmark
    await prisma.progress.create({
      data: {
        userId: studentUser.id,
        articleId: article1.id,
        isCompleted: true,
        lastReadAt: new Date(),
      },
    });

    await prisma.bookmark.create({
      data: {
        userId: studentUser.id,
        itemType: "SUBJECT",
        subjectId: dsaSubject.id,
      },
    });
  }

  // Also seed units and sample reading articles for DBMS (UCS5012) & Operating Systems (UCS4013)
  const osSubject = createdSubjects["UCS4013"];
  if (osSubject) {
    const osU1 = await prisma.unit.create({
      data: {
        subjectId: osSubject.id,
        unitNumber: 1,
        title: "Unit 1: Introduction and Process Management",
        description: "Operating system structures, system calls, process state transitions, PCB, context switching.",
        topics: JSON.stringify([
          "OS Architecture: Monolithic vs Microkernel",
          "Process Control Block (PCB) & State Model",
          "CPU Scheduling: FCFS, SJF, Round Robin, Multi-Level Feedback Queue",
          "Inter-Process Communication (Pipes, Shared Memory, Message Queues)",
        ]),
      },
    });

    const osU2 = await prisma.unit.create({
      data: {
        subjectId: osSubject.id,
        unitNumber: 2,
        title: "Unit 2: Process Synchronization and Deadlocks",
        description: "Critical Section problem, Peterson's algorithm, Semaphores, Dining Philosophers, Banker's Algorithm.",
        topics: JSON.stringify([
          "Race Conditions and Mutual Exclusion",
          "Semaphores (Counting and Binary) & Mutex Locks",
          "Classic Sync Problems: Producer-Consumer, Readers-Writers",
          "Deadlock Characterization (Coffman Conditions)",
          "Banker's Algorithm for Deadlock Avoidance",
        ]),
      },
    });

    await prisma.article.create({
      data: {
        title: "Process Synchronization: Semaphores, Mutex, and the Producer-Consumer Problem",
        slug: "process-synchronization-semaphores-producer-consumer",
        summary: "Detailed guide to solving concurrency race conditions using Mutex and POSIX Semaphores with C implementation.",
        difficulty: "INTERMEDIATE",
        readTimeMinutes: 9,
        order: 1,
        subjectId: osSubject.id,
        unitId: osU2.id,
        tags: "OS, Concurrency, Semaphores, Deadlock, Synchronization",
        conceptContent: `### What is a Race Condition?
A **race condition** occurs when two or more concurrent processes or threads access shared data simultaneously and the final result depends on the non-deterministic interleaving of execution.

### The Critical Section Problem
A critical section is a piece of code that accesses shared resources (such as common variables, files, or tables). To prevent data corruption, a valid synchronization solution must satisfy three criteria:
1. **Mutual Exclusion**: If process $P_i$ is executing in its critical section, no other processes can be executing in their critical sections.
2. **Progress**: If no process is executing in its critical section and some processes wish to enter, only those processes not executing in their remainder sections can participate in deciding who enters next.
3. **Bounded Waiting**: There must be a bound on the number of times other processes are allowed to enter their critical sections after a process has made a request.`,
        codeExamples: JSON.stringify([
          {
            language: "c",
            title: "Producer-Consumer Solution with POSIX Semaphores",
            code: `#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 5
int buffer[BUFFER_SIZE];
int in = 0, out = 0;

sem_t empty;
sem_t full;
pthread_mutex_t mutex;

void* producer(void* arg) {
    int item = 1;
    while (item <= 5) {
        sem_wait(&empty);
        pthread_mutex_lock(&mutex);

        buffer[in] = item;
        printf("Producer produced: %d at index %d\\n", item, in);
        in = (in + 1) % BUFFER_SIZE;

        pthread_mutex_unlock(&mutex);
        sem_post(&full);
        item++;
        sleep(1);
    }
    return NULL;
}`,
            explanation: "Standard POSIX thread semaphore solution guaranteeing bounded buffer mutual exclusion without deadlocks."
          }
        ]),
        keyPoints: JSON.stringify([
          "Counting semaphores manage finite pools of identical resources.",
          "Binary semaphores act as locks (0 or 1 state).",
          "Failure to pair sem_wait() and sem_post() results in system deadlocks."
        ]),
        commonMistakes: JSON.stringify([
          "Reversing the order of sem_wait(&empty) and pthread_mutex_lock(&mutex) causing deadlock.",
          "Forgetting to initialize semaphores with sem_init()."
        ]),
        practiceQuiz: JSON.stringify([
          {
            question: "Which Coffman condition is eliminated to prevent deadlocks in Banker's algorithm?",
            options: ["Circular Wait", "Mutual Exclusion", "No Preemption", "Hold and Wait"],
            answerIndex: 0,
            explanation: "Banker's Algorithm operates by ensuring the system always remains in a 'Safe State', thus guaranteeing that a Circular Wait condition will never materialize."
          }
        ])
      }
    });

    await prisma.resource.create({
      data: {
        title: "Operating System Comprehensive Unit-wise Notes (Galvin Summary)",
        description: "Concise summary notes covering Scheduling, Paging, Virtual Memory, and File Systems.",
        type: "PDF_NOTES",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileSize: "6.7 MB",
        downloadCount: 420,
        subjectId: osSubject.id,
        unitId: osU1.id,
        tags: "OS, Galvin, Complete Notes",
      }
    });

    await prisma.pYQ.create({
      data: {
        examYear: 2024,
        examType: "END_SEM",
        questionPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        solutionPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        totalMarks: 60,
        durationMinutes: 180,
        isImportant: true,
        downloadCount: 512,
        keyTopicsCovered: "Banker's Algorithm numerical, Page replacement (LRU, FIFO, Optimal), Round Robin scheduling",
        subjectId: osSubject.id,
      }
    });
  }

  console.log("🎉 Database Seed Completed Successfully with Official Curriculum!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
