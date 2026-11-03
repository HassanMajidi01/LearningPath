import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON parsing middleware
  app.use(express.json());

  // API Route: Get sheets configuration
  app.get("/api/sheets-config", (req, res) => {
    // We now have a pre-configured Google Sheets URL, so the server is always connected
    res.json({ isConnected: true });
  });

  // API Route: Secure sync proxy to Google Sheets
  app.post("/api/sync", async (req, res) => {
    // Use the environment variable if defined, otherwise fall back to the user's provided URL
    const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL || "https://script.google.com/macros/s/AKfycbyaN0gVdjoeUkDJzSyv1SXwacJbLVdJ5Y-NXhISZeT8Z6WQI5o8Ns73yWhYVWPMFpyi6g/exec";
    
    if (!webAppUrl) {
      return res.status(400).json({
        success: false,
        error: "اتصال به گوگل شیت در سمت سرور پیکربندی نشده است."
      });
    }

    try {
      console.log(`[Backend Sync] Forwarding action "${req.body.action}" to Google Sheets Web App...`);
      
      const response = await fetch(webAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });

      const text = await response.text();
      try {
        const json = JSON.parse(text);
        res.json(json);
      } catch (e) {
        // If Google Sheets returns non-JSON or success with redirection status
        res.json({ success: true, raw: text });
      }
    } catch (err: any) {
      console.error("[Backend Sync Error]:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development or Static Assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
