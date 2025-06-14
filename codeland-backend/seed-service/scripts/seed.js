const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const { v7: uuidv7 } = require('uuid');
const bcrypt = require('bcrypt');

const client = new Client({
  host: process.env.DOCKER ? 'postgres' : 'localhost',
  user: process.env.POSTGRES_USER ?? 'codeland',
  password: process.env.POSTGRES_PASSWORD ?? 'codeland',
  database: process.env.POSTGRES_DB ?? 'codeland',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
});

async function seed() {
  try {
    await client.connect();

    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8')
    );

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_entity (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    await client.query('TRUNCATE TABLE user_entity RESTART IDENTITY;');

    const hashedUsers = await Promise.all(
      users.map(async user => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    const userValues = hashedUsers
      .map(user => `(
        '${user.name.replace(/'/g, "''")}',
        '${user.username.replace(/'/g, "''")}',
        '${user.password.replace(/'/g, "''")}'
      )`)
      .join(',\n');

    const userInsertQuery = `
      INSERT INTO user_entity (name, username, password)
      VALUES
      ${userValues};
    `;

    await client.query(userInsertQuery);
    console.log('✅ Usuarios insertados');

    const issues = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'issues.json'), 'utf-8')
    );

    await client.query(`
      CREATE TABLE IF NOT EXISTS issue_entity (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        status TEXT NOT NULL,
        assignedToId INTEGER REFERENCES user_entity(id),
        priority TEXT NOT NULL,
        createdAt TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP NOT NULL
      );
    `);

    await client.query('TRUNCATE TABLE issue_entity;');

    const issueValues = issues
      .map(issue => `(
        '${uuidv7()}',
        '${issue.title.replace(/'/g, "''")}',
        '${issue.status}',
        ${issue.assignedToId},
        '${issue.priority}',
        '${new Date(issue.createdAt).toISOString()}',
        '${new Date(issue.updatedAt).toISOString()}'
      )`)
      .join(',\n');

    const issueInsertQuery = `
      INSERT INTO issue_entity (id, title, status, assignedToId, priority, createdAt, updatedAt)
      VALUES
      ${issueValues};
    `;

    await client.query(issueInsertQuery);
    console.log('✅ Issues insertadas');
    
  } catch (err) {
    console.error('❌ Error al insertar datos:', err);
  } finally {
    await client.end();
  }
}

seed();
