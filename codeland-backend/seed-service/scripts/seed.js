const { Client } = require('pg');

const client = new Client({
  host: process.env.DOCKER ? 'postgres' : 'localhost',
  user: process.env.POSTGRES_USER ?? 'codeland',
  password: process.env.POSTGRES_PASSWORD ?? 'codeland',
  database: process.env.POSTGRES_DB ?? 'codeland',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
});

const guerreros = [
  'El Refactorizador Sombrío',
  'La Variable Errante',
  'Señor del Debug Infinito',
  'Maestro del Merge Conflicto',
  'El Forjador de Commits',
  'Destructor de Bugs Legendarios',
  'El Recursivo Silencioso',
  'Caballero del Código Limpio',
  'La Hechicera de la Sintaxis',
  'Guardián del Linter Sagrado',
  'El Constructor de APIs Eternas',
  'El Compilador Errante',
  'El Executor Asíncrono',
  'El Corsario del Cluster Perdido',
  'El Profeta del Stack Overflow',
  'El Invocador del Docker Sagrado',
  'El Monje del Loop Infinito',
  'El Bardo del Backend',
  'El Ilusionista del Frontend',
  'El Arquitecto de la Nube Obscura'
];

async function seed() {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_entity (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );
    `);

    await client.query('TRUNCATE TABLE user_entity RESTART IDENTITY;');

    const values = guerreros
      .map(name => `('${name.replace(/'/g, "''")}')`)
      .join(',\n');

    const insertQuery = `
      INSERT INTO user_entity (name)
      VALUES
      ${values};
    `;

    await client.query(insertQuery);
    console.log('✅ Guerreros del código insertados');
  } catch (err) {
    console.error('❌ Error al insertar o crear la tabla:', err);
  } finally {
    await client.end();
  }
}

seed();
