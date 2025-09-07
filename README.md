# FlowAI 🤖

**AI Powered SaaS Platform built with PERN stack**  
FlowAI offers a suite of AI tools including article & blog generation, image creation & editing, code & resume review, and a community gallery. Features vary by pricing plan, with **Clerk** for authentication & billing, **Cloudinary** for image hosting, and a smooth **Tailwind CSS** interface. The platform is deployed on **Vercel**.

---

## 🚀 Features

- **AI Article & Blog Generation**: Generate high quality content quickly.
- **Image Creation & Editing**: Generate and edit images using AI tools.
- **Code & Resume Review**: AI powered suggestions and corrections.
- **Community Gallery**: Browse and interact with user generated content.
- **Multiple Pricing Plans**: Features vary based on subscription tier.
- **Authentication & Billing**: Managed with **Clerk**.
- **Cloud Image Hosting**: Images hosted securely on **Cloudinary**.
- **Responsive Design**: Works smoothly on mobile, tablet, and desktop screens.
- **Beautiful UI**: Designed with **Tailwind CSS** for a modern look.

---

## 🛠 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication & Billing**: Clerk
- **AI Tools**: Gemini API, ClipDrop API
- **Image Hosting**: Cloudinary
- **Deployment**: Vercel

---

## 📦 Environment Variables

### Server

Create a `.env` file in the `server` folder:

```env
DATABASE_URL='postgresql://username:password@host:port/dbname?sslmode=require'
CLERK_PUBLISHABLE_KEY=pk_test_***************
CLERK_SECRET_KEY=sk_test_***************
GEMINI_API_KEY=***************
CLIPDROP_API_KEY=***************
CLOUDINARY_CLOUD_NAME=***************
CLOUDINARY_API_KEY=***************
CLOUDINARY_API_SECRET=***************
```

### Client

Create a `.env` file in the `client` folder:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_***************
VITE_BASE_URL=http://localhost:4000
```

---

💻 Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/asadrehman1/FlowAI.git
# "Server"
cd server
npm install
npm run server

# "Client"
cd client
npm install
npm run dev
```

[Open http://localhost:5173](http://localhost:5173) to view the app.

---

## 📈 How It Works

1. **User Signs Up**: Create a new account using Clerk.
2. **User Logs In**: Authenticate with Clerk.
3. **User Selects a Pricing Plan**: Choose a subscription plan.
4. **User Generates Content**: Generate content using AI tools.
5. **User Edits Images**: Edit images using AI tools.
6. **User Reviews Code/Resume**: Review code or resume using AI tools.
7. **User Browses the Gallery**: Browse and interact with user generated content.
8. **User Logs Out**: Log out of the application.

---

## 📝 Author

**Asad Rehman** — [GitHub](https://github.com/asadrehman1)

---

## ⚡ License

MIT © 2025 Asad Rehman
