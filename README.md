# 🧠 Snippet Generator – AI-Powered Code Snippets

This is a full-stack application that allows users to **create**, **list**, and **retrieve** code snippets. Snippets are generated using the Gemini API (Google's Generative AI). The backend is built with **Node.js**, **Express**, and **MongoDB**, and the frontend is powered by **React** and **Remix**.

Both the backend and frontend are containerized using Docker, and communicate over a shared network.

---

## 🚀 Features

- **Create Snippets** using the Gemini AI model.
- **List All Snippets** from the database.
- **Get Snippet By ID** for detailed view.
- Containerized with **Docker** for ease of deployment.
- Simple and clean RESTful API.

---

## 🧱 Project Structure

```
.
├── backend/
│   ├── src/
│   └── .env
├── frontend/
│   ├── app/
│   └── .env
├── docker-compose.yml
└── README.md
```

---

## 🧰 Requirements

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

---

## ⚙️ Environment Variables

The backend uses environment variables defined in the `.env` file:

```
PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key
MONGO_URI=mongodb://localhost:27017/mydatabase
MONGO_URI_TEST=mongodb://localhost:27017/testdatabase
```

To use the Gemini API:

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account.
3. Generate an API key.
4. Place the key in the backend `.env` file as shown above.

The frontend uses environment variables defined in the `.env` file:

```
VITE_API_URL=http://localhost:3000
PORT=3030
```

---

## 🐳 How to Run Locally (with Docker)

1. Clone this repository:

```bash
git clone https://github.com/sam20fonsa1098/snippet-generator.git
cd snippet-generator
```

2. Create the required `.env` files in both `backend/` and `frontend/` folders.

3. Run with Docker Compose:

```bash
docker-compose up --build
```

4. The backend will be available at: `http://localhost:3000`  
   The frontend will be available at: `http://localhost:3030` (or as configured)

---

## 🧪 Running Tests

You can run backend tests with:

```bash
cd backend
npm install (if you haven't already installed the dependencies locally)
npm run test
```

Frontend tests:

```bash
cd frontend
npm install (if you haven't already installed the dependencies locally)
npm run test
```

---

## 📈 Potential Improvements

### 1. **Pagination for Snippets List**

Currently, all snippets are fetched at once. Implementing **pagination** would:

- Improve performance on large datasets
- Avoid overwhelming the frontend
- Reduce memory usage on both client and server

### 2. **Asynchronous Processing with Message Queues**

Snippet creation currently depends on a **real-time response from the Gemini API**. If the API is down, slow, or exceeds quota, it can break the user experience.

Using a message queue like **Amazon SQS** (or RabbitMQ) would:

- Decouple user actions from AI generation
- Make snippet creation **asynchronous**
- Allow retries and fallback mechanisms
- Support **Dead Letter Queues** (DLQs) for debugging failures

### 3. **Monetization & Abuse Prevention**

To prevent misuse and reduce costs related to AI usage:

- Only **authenticated and subscribed users** can create new snippets.
- All users can **view** and **retrieve** snippets by ID.
- Consider using API usage limits (rate-limiting, quotas).
- Implement **tiered subscriptions** based on snippet generation quotas.

### 4. **Leverage Static Site Generation (SSG) for Popular Snippets**

With **Remix**, we can pre-build pages for popular snippets using **SSG** and serve them from the **edge/CDN**.

- Reduced backend load
- Faster response time for end-users
- Better SEO
