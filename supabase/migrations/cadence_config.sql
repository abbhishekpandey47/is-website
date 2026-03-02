-- Cadence Config table
-- Stores monthly engagement targets per company for ThreadFlow Cadence Planner.

CREATE TABLE IF NOT EXISTS cadence_config (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name  text UNIQUE NOT NULL,
  monthly_limit integer NOT NULL DEFAULT 35,
  alert_threshold integer NOT NULL DEFAULT 75,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Seed with every company from the companies table (default limit = 35)
INSERT INTO cadence_config (company_name, monthly_limit, alert_threshold)
SELECT name, 35, 75
FROM companies
WHERE name IS NOT NULL AND name <> ''
ON CONFLICT (company_name) DO NOTHING;

-- Auto-update `updated_at` on row changes
CREATE OR REPLACE FUNCTION update_cadence_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cadence_config_updated_at
  BEFORE UPDATE ON cadence_config
  FOR EACH ROW
  EXECUTE FUNCTION update_cadence_config_updated_at();
