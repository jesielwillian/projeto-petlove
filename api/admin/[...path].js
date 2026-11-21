// Vercel nested catch-all for administrative endpoints.
// Keep the implementation centralized in the root API handler so that
// /api/admin/* and /api/* share the same authentication and Supabase logic.
export { default } from '../[...path].js';
