const dotenv = require('dotenv')

try {
  dotenv.config({ path: process.cwd() + '/.env' })
} catch (e) {
  console.log(e)
}

// CORS
const ADMIN_CORS = process.env.ADMIN_CORS || 'https://admin.localvocal.id'
const STORE_CORS = process.env.STORE_CORS || 'https://localvocal.id,https://www.localvocal.id,http://localhost:8000'

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/medusa-store'
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

// Minio
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9090'
const MINIO_BUCKET = process.env.MINIO_BUCKET || ''
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || ''
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || ''

// Meilisearch
const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || 'http://127.0.0.1:7700'
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || ''

const plugins = [
  'medusa-fulfillment-manual',
  'medusa-payment-manual',
  {
    resolve: 'medusa-file-minio',
    options: {
      endpoint: MINIO_ENDPOINT,
      bucket: MINIO_BUCKET,
      access_key_id: MINIO_ACCESS_KEY,
      secret_access_key: MINIO_SECRET_KEY,
    },
  },
  {
    resolve: 'medusa-plugin-meilisearch',
    options: {
      config: {
        host: MEILISEARCH_HOST,
        apiKey: MEILISEARCH_API_KEY,
      },
      settings: {
        products: {
          searchableAttributes: ['title', 'description', 'variant_sku'],
          displayedAttributes: ['title', 'description', 'variant_sku', 'thumbnail', 'handle'],
        },
      },
    },
  },
]

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: 'postgres',
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
}
