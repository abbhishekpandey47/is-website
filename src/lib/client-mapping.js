/**
 * Client ↔ Company Mapping Layer
 *
 * Maps between company names (as stored in the DB / engagement tracker)
 * and ThreadFlow client concepts (slugs, config, etc.).
 *
 * The company name in the engagement tracker DB is the source of truth.
 * ThreadFlow config (monthly limit, color, etc.) is stored in localStorage
 * and linked by company ID.
 */

/**
 * Create a URL-safe slug from a company name.
 * "Customer.io" → "customer-io"
 * "Www Qodo"    → "www-qodo"
 */
export function slugify(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Find a company by name (case-insensitive).
 * @param {string} companyName
 * @param {Array} companies — array of { id, name }
 * @returns {{ id, name, slug } | null}
 */
export function getClientByCompany(companyName, companies) {
  if (!companyName || !companies) return null;
  const lower = companyName.toLowerCase();
  const found = companies.find((c) => c.name.toLowerCase() === lower);
  if (!found) return null;
  return { ...found, slug: slugify(found.name) };
}

/**
 * Find a company by its slug.
 * @param {string} slug
 * @param {Array} companies — array of { id, name }
 * @returns {{ id, name, slug } | null}
 */
export function getCompanyBySlug(slug, companies) {
  if (!slug || !companies) return null;
  const found = companies.find((c) => slugify(c.name) === slug);
  if (!found) return null;
  return { ...found, slug };
}

/**
 * Get all companies with their slugs attached.
 * @param {Array} companies — array of { id, name }
 * @returns {Array<{ id, name, slug }>}
 */
export function getAllClients(companies) {
  if (!companies) return [];
  return companies.map((c) => ({
    ...c,
    slug: slugify(c.name),
  }));
}
