import { empires, type Empire, type InsertEmpire } from "@shared/schema";

export interface IStorage {
  getEmpire(id: number): Promise<Empire | undefined>;
  createEmpire(empire: InsertEmpire): Promise<Empire>;
  updateEmpire(id: number, empire: Partial<InsertEmpire>): Promise<Empire>;
}

export class MemStorage implements IStorage {
  private empires: Map<number, Empire>;
  currentId: number;

  constructor() {
    this.empires = new Map();
    this.currentId = 1;
  }

  async getEmpire(id: number): Promise<Empire | undefined> {
    return this.empires.get(id);
  }

  async createEmpire(insertEmpire: InsertEmpire): Promise<Empire> {
    const id = this.currentId++;
    const empire: Empire = { ...insertEmpire, id };
    this.empires.set(id, empire);
    return empire;
  }

  async updateEmpire(id: number, updates: Partial<InsertEmpire>): Promise<Empire> {
    const empire = await this.getEmpire(id);
    if (!empire) throw new Error("Empire not found");
    
    const updatedEmpire = { ...empire, ...updates };
    this.empires.set(id, updatedEmpire);
    return updatedEmpire;
  }
}

export const storage = new MemStorage();
