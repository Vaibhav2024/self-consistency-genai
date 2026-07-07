import "dotenv/config";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";

const openaiClient = new OpenAI();
const geminiClient = new GoogleGenAI();
const githubClient = new OpenAI({
    baseURL
})

