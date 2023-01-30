const dotenv = require('dotenv')

try {
  dotenv.config({ path: process.cwd() + '/.env' })
} catch (e) {
  console.log(e)
}

// CORS
const ADMIN_CORS = process.env.ADMIN_CORS || 'https://admin.localvocal.id'
const STORE_CORS = process.env.STORE_CORS || 'https://localvocal.id,https://www.localvocal.id,http://localhost:8000'

// Database URL
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/medusa-store'
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

// Minio
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9090'
const MINIO_BUCKET = process.env.MINIO_BUCKET || ''
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || ''
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || ''

// Meilisearch
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY || ''

// Sendgrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ''
const SENDGRID_FROM = process.env.SENDGRID_FROM || ''

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
    resolve: 'medusa-plugin-algolia',
    options: {
      application_id: ALGOLIA_APP_ID,
      admin_api_key: ALGOLIA_ADMIN_API_KEY,
      settings: {
        products: {
          searchableAttributes: ['title', 'description'],
          attributesToRetrieve: ['id', 'title', 'description', 'handle', 'thumbnail', 'variants', 'variant_sku', 'options', 'collection_title', 'collection_handle', 'images'],
        },
      },
    },
  },
  {
    resolve: 'medusa-plugin-sendgrid',
    options: {
      api_key: SENDGRID_API_KEY,
      from: SENDGRID_FROM,
      order_placed_template: 'd-84885a0e0e4e4dc0bbcf40a50e8e3a51',
      order_shipped_template: 'd-1785877c08234b4282976f4f6b12eb0c',
      claim_shipment_created_template: 'd-4254ce8052244bdca1abda496d509017',
      user_password_reset_template: 'd-63169d34111a49458aef10f7bebb6d24',
      customer_password_reset_template: 'd-011f2461536f408683f88be285b9ad10',
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
