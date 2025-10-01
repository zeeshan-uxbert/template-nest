import { config } from 'dotenv';
import * as mysql from 'mysql2/promise';
import { Client } from 'pg';

config();

async function initDatabase() {
  const dbType = process.env.DB_TYPE || 'postgres';
  const dbName = process.env.DB_DATABASE || 'nest_template';

  try {
    if (dbType === 'postgres') {
      const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        user: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: 'postgres', // Connect to default database first
      });

      await client.connect();

      // Check if database exists
      const result = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [dbName],
      );

      if (result.rows.length === 0) {
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`✅ Database '${dbName}' created successfully`);
      } else {
        console.log(`ℹ️  Database '${dbName}' already exists`);
      }

      await client.end();
    } else if (dbType === 'mysql') {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
      console.log(`✅ Database '${dbName}' created successfully`);

      await connection.end();
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  }
}

initDatabase();



