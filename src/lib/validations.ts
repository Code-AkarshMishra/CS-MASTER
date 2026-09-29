import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(50),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  currentYear: z.number().int().min(1).max(4).default(1),
  currentSemester: z.number().int().min(1).max(8).default(1),
  specialization: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const articleCreateSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3),
  summary: z.string().min(10),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),
  readTimeMinutes: z.number().int().min(1).default(5),
  conceptContent: z.string().min(20),
  subjectId: z.string().min(1),
  unitId: z.string().optional(),
  codeExamples: z.string().optional(),
  diagramAscii: z.string().optional(),
  keyPoints: z.string().optional(),
  commonMistakes: z.string().optional(),
  practiceQuiz: z.string().optional(),
  tags: z.string().optional(),
});

export const resourceCreateSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  type: z.enum([
    "PDF_NOTES",
    "LECTURE_VIDEO",
    "PPT_SLIDES",
    "ASSIGNMENT",
    "LAB_MANUAL",
    "REFERENCE_BOOK",
    "CODE_REPOSITORY",
  ]),
  url: z.string().min(1, "URL is required"),
  fileSize: z.string().optional(),
  subjectId: z.string().min(1),
  unitId: z.string().optional(),
  tags: z.string().optional(),
});

export const pyqCreateSchema = z.object({
  examYear: z.number().int().min(2015).max(2030),
  examType: z.enum(["MID_SEM", "END_SEM", "QUIZ", "SUPPLEMENTARY"]).default("END_SEM"),
  questionPdfUrl: z.string().min(1),
  solutionPdfUrl: z.string().optional(),
  totalMarks: z.number().int().default(60),
  isImportant: z.boolean().default(false),
  subjectId: z.string().min(1),
  keyTopicsCovered: z.string().optional(),
});
