import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Connection string from environment variable
const connectionString = process.env.DATABASE_URL!;

// Database client instance
// If you are using Supabase Transaction pooler, set prepare: false
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
