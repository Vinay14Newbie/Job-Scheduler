# Job Scheduler & Automation System

> A minimal Job Scheduler & Automation Dashboard — frontend (React + Tailwind), backend (Node.js + Express), and MySQL (Prisma). This repo implements creating jobs, running them (simulated background processing), tracking their status, and triggering an outbound webhook on completion.

---

## Table of Contents

- Project overview
- Tech stack
- Quick start
- Environment variables
- Backend setup & migrations
- Frontend setup
- API documentation
- Database schema
- Webhook behavior
- Development & testing
- Production notes
- AI usage (placeholder)
- Repo structure
- Helpful git/commit tips

---

## Project overview

This project demonstrates a simple automation engine where users can:

- Create jobs with a `taskName`, `payload`, and `priority`.
- Start a job via `POST /run-job/:id`. The job moves: `pending` → `running` → `completed` (3s simulated processing).
- Track jobs in a dashboard with filters (status, priority).
- Trigger an outbound webhook when a job completes; webhook request/response is logged to the server console.

---

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, Prisma (ORM)
- Database: MySQL (compatible with SQLite if you prefer for local testing)
- HTTP client (backend): axios

---

## Quick start (local)

Prerequisites:

- Node.js (>=16)
- npm or yarn
- MySQL server (or use a local SQLite if you change `DATABASE_URL` accordingly)

1. Clone the repository

```bash
git clone <https://github.com/Vinay14Newbie/Job-Scheduler>
cd Job_Scheduler
```

2. Backend

```bash
cd backend
npm install

# generate Prisma client
npx prisma generate

# apply migrations (dev)
npx prisma migrate dev --name init

# start backend
npm run dev  # or node src/server.js depending on package.json scripts
```

3. Frontend

```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173 (or the printed URL)
```

Notes: adjust ports as needed. The frontend expects the backend at `http://localhost:3000/api` by default (see `frontend/src/apis/jobApi.js`).

---

## Environment variables

Create a `.env` file in `backend/` containing at least:

```
DATABASE_URL="mysql://user:password@localhost:3306/job_scheduler"
PORT=3000
WEBHOOK_URL=https://webhook.site/<your-id>   # optional default webhook target for completions
```

Replace these values for your environment. The app also reads `PORT` and `WEBHOOK_URL` from `backend/src/config/serverConfig.js`.

---

## Backend setup & migrations

- Prisma schema: `backend/prisma/schema.prisma`.
- Use `npx prisma migrate dev` to create and apply schema migrations locally.
- Use `npx prisma generate` after changing schema.

Common commands:

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name <migration_name>
```

---

## Frontend setup

- Uses Vite + React. Tailwind is pre-configured.
- Start with `npm run dev` inside `frontend/`.

---

## API documentation

Base URL: `http://localhost:3000/api`

1. Create job

- POST `/jobs`
- Body (JSON):

```json
{
  "taskName": "Read a book",
  "payload": { "notes": "Read chapter 1" },
  "priority": "Low",
  "webhookUrl": "https://webhook.site/<id>"  # optional per-job webhook
}
```

Response: 201 created job object

2. List jobs (with filters)

- GET `/jobs`
- Query params: `status` (pending|running|completed), `priority` (Low|Medium|High)

Example: `GET /jobs?status=pending&priority=High`

3. Get job details

- GET `/jobs/:id`

4. Run job (simulate background processing)

- POST `/run-job/:id`

Behavior:

- Immediately sets job `status` to `running` and returns `{ message: "Job execution started" }`.
- In background, waits 3 seconds, then updates job `status` to `completed` and sets `completedAt`.
- After completion, the server performs an outbound POST to the configured webhook (either `WEBHOOK_URL` env or per-job `webhookUrl` if the app is configured that way) and logs the request/response.

5. Delete job

- DELETE `/jobs/:id`

6. (Optional) Webhook test endpoint

- POST `/webhook-test` — if implemented this endpoint can accept a `webhookUrl` in the body and trigger a webhook manually. (Check `backend/src/controllers/jobController.js` for current behavior.)

---

## Database schema (Prisma)

Primary model in `backend/prisma/schema.prisma`:

```prisma
model Job {
  id          Int      @id @default(autoincrement())
  taskName    String
  payload     Json?
  priority    String
  status      String   @default("pending")
  webhookUrl  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  completedAt DateTime?
}
```

This model stores the core job data. `payload` is a JSON column to hold arbitrary metadata.

---

## Webhook behavior

- When a job status changes to `completed`, the server performs an outbound `POST` to the configured webhook URL with payload:

```json
{
  "event": "JOB_COMPLETED",
  "data": {
    "id": 1,
    "taskName": "...",
    "priority": "...",
    "payload": {
      /* job payload */
    },
    "completedAt": "2026-02-08T..."
  }
}
```

- By default the app logs webhook request and response to the server console. If you want persistent logs, consider storing webhook logs in the database (optional enhancement).

Testing tips:

- Use https://webhook.site to obtain a unique test URL and set it in `WEBHOOK_URL` or in the job `webhookUrl` field when creating a job.

---

## Development & testing

Manual test flow:

1. Create a job using the UI or `POST /jobs`.
2. Click the "Run" button in the UI (or call `POST /run-job/:id`).
3. The UI should show `running` immediately; after ~3 seconds it should show `completed`.
4. Check backend console for the webhook POST and its response.

Automated tests: none included. Add integration tests (supertest) or unit tests as needed.

---

## Production notes & recommendations

- This project uses in-process timers (`setTimeout`) to simulate background jobs — not suitable for production.
- For production readiness, replace with a job queue (BullMQ, Bee-Queue, or RabbitMQ) and background workers. This enables retry logic, persistence, horizontal scaling, and visibility.
- Secure the API (auth, rate limiting, input validation).
- Use structured logging and monitoring (e.g., Winston, Grafana).

---

## AI usage (required by assignment)

- Tools used: ChatGPT, GitHub Copilot, etc.
- Prompts / transcripts:

```
- "Help me design the backend architecture for a Node.js job scheduler using Express and Prisma."
- "Suggest a clean folder structure for a job scheduling backend."
- "How should I structure controllers, services, and routes for this project?"
- "Design a Prisma schema for a job scheduler with jobs, tasks, priorities, and status."
- "How do I add a new model for webhook logs in Prisma?"
- "Explain how Prisma migrations work and how to apply them safely."
- "Help me design REST APIs for creating, updating, deleting, and executing jobs."
- "Write an API endpoint to mark a job as completed."
- "How should API responses and error handling be structured in Express?"
- "How can I trigger job execution and update job status in a Node.js backend?"
- "What is the best way to mark a job as completed and record timestamps?"
- "Explain how outbound webhooks work in backend systems."
- "Write code to send a POST webhook request when a job is completed."
- "What fields should be included in a webhook payload for job completion?"
- "How do I log webhook requests and responses during development?"
- "Where should webhook logs be stored — database or console?"
- "Implement webhook logging using console logs for development."
- "Help me debug Prisma migration errors and runtime issues."
- "Explain common Prisma client initialization errors."
- "How do I safely roll back or downgrade Prisma versions?"
- "Help me debug Prisma migration errors and runtime issues."

```

- What AI helped with: UI design, backend logic, debugging, README drafting, etc.

_Please replace the placeholders above with your prompts and details before submission._

---

## Repo structure

```
frontend/
  src/
    Components/
    pages/
    apis/jobApi.js
  package.json

backend/
  src/
    controllers/
    services/
    repositories/
    routers/
    config/
    server.js
  prisma/
    schema.prisma
  package.json
``
```
