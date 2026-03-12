import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import http from "http";
import { Server } from "socket.io";

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });
  const PORT = 3000;

  app.use(express.json());

  // Socket.io connection
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("select_broker", (data) => {
      console.log("Broker selected:", data);
      // Broadcast to all connected clients (brokers will listen for this)
      io.emit("new_lead_notification", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // --- API ROUTES ---

  // Builder API
  app.get("/api/builder/stats", (req, res) => {
    res.json({
      totalInventory: 450,
      availableUnits: 124,
      avgVelocity: "12 units/mo",
      activeBrokers: 85,
      revenue: "₹145Cr"
    });
  });

  // Broker API (including gamification)
  app.get("/api/broker/profile", (req, res) => {
    res.json({
      name: "Vikram Singh",
      tier: "Platinum",
      points: 12450,
      nextTierPoints: 15000,
      badges: ["Fast Closer", "Luxury Specialist", "100% Verified"],
      activeLeads: 12,
      siteVisits: 8,
      pendingPayouts: "₹12.5L",
      conversionRate: "18%"
    });
  });

  app.get("/api/broker/leads", (req, res) => {
    res.json([
      { id: 1, name: 'Rahul Sharma', budget: '1.2Cr', intent: 'High', type: 'End User', lastContact: '2 hrs ago', nextAction: 'Site Visit Scheduled' },
      { id: 2, name: 'Priya Patel', budget: '85L', intent: 'Medium', type: 'Investor', lastContact: '1 day ago', nextAction: 'Send ROI Calculation' },
      { id: 3, name: 'Amit Singh', budget: '2.5Cr', intent: 'High', type: 'End User', lastContact: '3 hrs ago', nextAction: 'Price Negotiation' },
      { id: 4, name: 'Neha Gupta', budget: '1.5Cr', intent: 'Low', type: 'Investor', lastContact: '5 days ago', nextAction: 'Follow up on new launch' },
    ]);
  });

  // Buyer API (AI Broker Butler & Gamification)
  app.get("/api/buyer/dashboard", (req, res) => {
    res.json({
      user: { 
        name: "Rahul Sharma", 
        status: "Active Buyer",
        points: 450,
        tier: "Gold Member",
        nextReward: "Free Legal Consultation (at 500 pts)"
      },
      journey: {
        currentStage: 1, // 0: Discovery, 1: Selection, 2: Visits, 3: Negotiation, 4: Documentation
        stages: ["Discovery", "Broker Selection", "Site Visits", "Negotiation", "Documentation"]
      },
      butler: {
        message: "Based on your requirement for a 3BHK in Sector 45 under ₹1.5Cr, I have analyzed 142 local brokers. Here are the top 3 most likely to close the right deal for you based on their historical performance.",
      },
      matchedBrokers: [
        { id: "BRK-1", name: "Rohan Mehta", specialty: "Sector 45 Specialist", dealsClosed: 74, negotiationWin: "5.2%", rating: 4.9, tags: ["Fast Closer", "Off-market Inventory"] },
        { id: "BRK-2", name: "Aisha Khan", specialty: "Luxury & High-Rise", dealsClosed: 42, negotiationWin: "4.1%", rating: 4.8, tags: ["High Client Satisfaction", "Vastu Expert"] },
        { id: "BRK-3", name: "Dev Sharma", specialty: "Investment Deals", dealsClosed: 112, negotiationWin: "6.5%", rating: 4.7, tags: ["ROI Focused", "Commercial/Resi"] }
      ],
      recentActivity: [
        { id: 1, action: "Completed Profile Preferences", points: "+50", date: "Today" },
        { id: 2, action: "Verified Phone Number", points: "+100", date: "Yesterday" },
        { id: 3, action: "Submitted Area Review", points: "+300", date: "Last Week" }
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
