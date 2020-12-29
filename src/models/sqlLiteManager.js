const sqlite3 = require("sqlite3").verbose();
var db;

const sqlLiteManager = {
  connect: () => {
    db = new sqlite3.Database("drawDB.db",
    
     (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the in-memory SQlite database.");
    });
  },

  //TODO
  read: () => {
    let sql = `SELECT DISTINCT Name name FROM playlists
           ORDER BY name`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.name);
      });
    });
  },

  //TODO
  insert: (user,pass) => {

    db.run('INSERT INTO users(name, age) VALUES(?, ?)', [user,pass], (err) => {
      if(err) {
        return console.log(err.message); 
      }
      console.log('Row was added to the table: ${this.lastID}');
    })
  
    // close the database connection
    db.close();
  },

  update: () => {
    //TODO
    let data = ["Ansi C", "C"];
    let sql = `UPDATE langs
            SET name = ?
            WHERE name = ?`;
    db.run(sql, data, function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
    });
  },

  create: () => {
    db.run('CREATE TABLE users(group_id INTEGER PRIMARY KEY, name text)');
  },

  delete: () => {
    //TODO
    db.run(`DELETE FROM langs WHERE rowid=?`, id, function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) deleted ${this.changes}`);
    });
  },

  close: () => {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Close the database connection.");
    });
  },
};
module.exports = sqlLiteManager;
