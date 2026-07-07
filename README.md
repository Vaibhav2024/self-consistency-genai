# Structured Multi-LLM Consensus Engine

A command-line interface (CLI) application that leverages parallel model queries (GPT-4o-Mini and Gemini 2.5 Flash) and an LLM-based judge model to evaluate, select, and output the highest quality response. The evaluation is strictly validated against a custom JSON schema and supports multi-turn interactive chat history.

## Table of Contents
- [How it Works](#how-it-works)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Configuration](#installation--configuration)
- [Usage](#usage)
- [Architecture Details](#architecture-details)

---

## How it Works

When you enter a prompt:
1. **Parallel Execution**: The engine queries both OpenAI's `gpt-4o-mini` and Google's `gemini-2.5-flash` concurrently to generate candidate responses.
2. **Objective Evaluation**: The candidate responses, along with the original prompt, are fed to a separate instance of `gpt-4o-mini` acting as an expert judge.
3. **Structured Selection**: The judge evaluates candidate text quality based on thoroughness, correctness, and natural tone, returning the selected winner, the reasoning, and the winning text in a strictly formatted JSON structure.
4. **History Preservation**: The winning answer is appended to the chat history, enabling contextually aware multi-turn conversations.

---

## Key Features

- **Concurrent API Requests**: Minimizes latency by executing OpenAI and Gemini API calls in parallel using `Promise.all`.
- **Structured JSON Schema Output**: Employs OpenAI's new Responses API structure with strict schema enforcement (avoiding Zod format compatibility issues).
- **Session Chat History**: Remembers context from previous turns to support continuous conversation.
- **Easy CLI Interface**: A clean terminal interface that lets you ask questions and view full judge reasoning.

---

## Project Structure

- [index.js](file:///c:/Users/patil/Desktop/self_consistency_genai/index.js) - The main CLI application logic, parallel processing, and evaluation pipeline.
- [package.json](file:///c:/Users/patil/Desktop/self_consistency_genai/package.json) - Node.js project manifest, dependencies, and configuration.
- [.env](file:///c:/Users/patil/Desktop/self_consistency_genai/.env) - Environment configuration file for storing API credentials.

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **API Keys**:
  - OpenAI API Key
  - Google Gemini API Key

---

## Installation & Configuration

1. **Install Dependencies**:
   Navigate to the project root directory and install required npm packages:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory (or update the existing one) with your credentials:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > [!WARNING]
   > Never commit your active `.env` file to a public version control system. Ensure `.env` is listed in your `.gitignore`.

---

## Usage

Start the interactive CLI session:
```bash
node index.js
```

### Example Interactive Flow:
```text
=========Structured Multi-LLM Engine Started============
Ask your question (or type "exit" to quit): What is the speed of light?

Parallel processing started
Received all responses successfully

Output given by LLMs
[A] GPT-4o-Mini Preview:
The speed of light in a vacuum is approximately 299,792,458 meters per second...

[B] Gemini Flash Preview:
The speed of light is about 186,282 miles per second (299,792 km/s)...

================ 🏆 WINNING SELECTION ================

👑 Selected Winner: Gemini Flash

🧠 Judge Reasoning: Gemini Flash provided the answer in both metric and imperial units which is more helpful for a general audience.

📄 Content:
The speed of light is about 186,282 miles per second (299,792 km/s)...

======================================================= 
```

To quit the engine, type `exit`.

---

## Architecture Details

- **Dependencies**:
  - `@google/genai` - Official Google GenAI SDK for Gemini.
  - `openai` - Official OpenAI Node.js SDK.
  - `dotenv` - Loads configuration values from the `.env` file.
  - `zod` - Installed as a dependency (though plain JSON schemas are favored in [index.js](file:///c:/Users/patil/Desktop/self_consistency_genai/index.js) for reliability with OpenAI strict schemas).
- **JSON Validation**: Uses `EvaluationJsonSchema` structure to ensure the judge returns a predictable format containing `winner`, `reasoning`, and `winning_text`.
