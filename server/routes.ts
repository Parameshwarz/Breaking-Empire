import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmpireSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/empire", async (req, res) => {
    try {
      const empireData = insertEmpireSchema.parse(req.body);
      const empire = await storage.createEmpire(empireData);
      res.json(empire);
    } catch (error) {
      res.status(400).json({ error: "Invalid empire data" });
    }
  });

  app.get("/api/empire/:id", async (req, res) => {
    const empire = await storage.getEmpire(Number(req.params.id));
    if (!empire) {
      res.status(404).json({ error: "Empire not found" });
      return;
    }
    res.json(empire);
  });

  app.patch("/api/empire/:id", async (req, res) => {
    try {
      const updates = insertEmpireSchema.partial().parse(req.body);
      const empire = await storage.updateEmpire(Number(req.params.id), updates);
      res.json(empire);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
