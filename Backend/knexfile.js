// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.CONN_URL,
    /*{
       host: process.env.HOST || 'localhost',
      user: process.env.DBUSER || 'postgres',
      password: process.env.DBPASSWORD || 'postgres',
      database: process.env.DBNAME || 'file_repo',
      port: process.env.DBPORT || 5432,
      
    }*/
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.CONN_URL,
    ssl: {
       rejectUnauthorized: false // This is the "Magic Fix" for Render
     },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
