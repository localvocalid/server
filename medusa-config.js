const dotenv = require('dotenv')

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'production':
		ENV_FILE_NAME = '.env.production';
		break;
	case 'staging':
		ENV_FILE_NAME = '.env.staging';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	case 'development':
	default:
		ENV_FILE_NAME = '.env';
		break;
}

try {
	dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "https://admin.localvocal.id";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "https://localvocal.id,https://www.localvocal.id";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || "http://127.0.0.1:7700"
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || ""

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-plugin-meilisearch`,
    options: {
      // config object passed when creating an instance
      // of the MeiliSearch client
      config: {
        host: MEILISEARCH_HOST,
        apiKey: MEILISEARCH_API_KEY,
      },
      settings: {
        // index name
        products: {
          // MeiliSearch's setting options to be set on a particular index
          searchableAttributes: ["title", "description", "variant_sku"],
          displayedAttributes: [
            "title", 
            "description", 
            "variant_sku", 
            "thumbnail", 
            "handle",
          ],
        },
      },
    },
  },
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
};
