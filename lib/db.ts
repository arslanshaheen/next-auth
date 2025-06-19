// lib/db.ts
import { PrismaClient } from '@prisma/client';

// Declare the global type — this is ONLY for TypeScript, not real JS
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Runtime: attach instance to globalThis
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
