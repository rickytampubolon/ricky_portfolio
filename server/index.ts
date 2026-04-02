import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { trackPageView, trackClick, getStats } from "./analytics.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── Contact form API ──────────────────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body ?? {};
    if (!firstName || !lastName || !email) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: "rickytampubolon97@gmail.com",
        replyTo: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${firstName} ${lastName}`,
        text: `From: ${firstName} ${lastName} <${email}>\n\n${message ?? ""}`,
        html: `<p><strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p><p>${(message ?? "").replace(/\n/g, "<br>")}</p>`,
      });

      res.json({ ok: true });
    } catch (err) {
      console.error("Email send error:", err);
      res.status(500).json({ error: "Failed to send email." });
    }
  });

  // ── Analytics API ─────────────────────────────────────────────
  app.post("/api/analytics/track", (req, res) => {
    const { type, path: pagePath, label } = req.body ?? {};
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
      req.socket.remoteAddress ??
      "unknown";

    if (type === "pageview" && typeof pagePath === "string") {
      trackPageView(pagePath, ip);
    } else if (type === "click" && typeof label === "string") {
      trackClick(label, ip);
    }
    res.json({ ok: true });
  });

  app.get("/api/analytics/stats", (req, res) => {
    const secret = req.query.secret as string | undefined;
    const dashboardSecret = process.env.DASHBOARD_SECRET;

    if (!dashboardSecret || !secret || secret !== dashboardSecret) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    res.json(getStats());
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
