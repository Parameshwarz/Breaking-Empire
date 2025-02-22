import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const empires = pgTable("empires", {
  id: serial("id").primaryKey(),
  revenue: decimal("revenue").notNull().default("0"),
  riskLevel: integer("risk_level").notNull().default(0),
  productionRate: integer("production_rate").notNull().default(0),
  locationLevel: integer("location_level").notNull().default(0),
  wantedLevel: integer("wanted_level").notNull().default(0),
});

export const insertEmpireSchema = createInsertSchema(empires).pick({
  revenue: true,
  riskLevel: true,
  productionRate: true,
  locationLevel: true,
  wantedLevel: true,
});

export type InsertEmpire = z.infer<typeof insertEmpireSchema>;
export type Empire = typeof empires.$inferSelect;
