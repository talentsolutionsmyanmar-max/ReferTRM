-- Create leads table for CV imports
CREATE TABLE IF NOT EXISTS "leads" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "current_position" TEXT,
    "skills" TEXT,
    "status" TEXT DEFAULT 'active',
    "source" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS "leads_email_idx" ON "leads"("email");
CREATE INDEX IF NOT EXISTS "leads_status_idx" ON "leads"("status");
