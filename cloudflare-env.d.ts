declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    APP_ORIGIN?: string;
    PAGES_ORIGIN?: string;
    BUCKET?: R2Bucket;
  }
}

