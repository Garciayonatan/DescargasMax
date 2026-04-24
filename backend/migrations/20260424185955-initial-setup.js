'use strict';

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS downloads (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      format VARCHAR(20),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
};

exports.down = function(db) {
  return db.dropTable('downloads');
};