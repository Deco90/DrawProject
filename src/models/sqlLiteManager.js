const sqlite3 = require("sqlite3").verbose();
var db;

const sqlLiteManager = {
  connect: () => {
    db = new sqlite3.Database(
      "newDB/drawsdb.db",

      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Connected to SQlite database.");
      }
    );
  },

  auth: async (username, password) => {
    let query = `SELECT *
    FROM users 
    WHERE user_name = "${username}"  AND user_password = "${password}"`;
    try {
      const promiseResult = await sqlLiteManager.dbAllPromise(query);
      return promiseResult;
    } catch (error) {
      console.log(error);
    }
  },

  dbAllPromise: (query) => {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else if (rows) {
          let isTrue = false;
          if (rows.length) {
            isTrue = true;
          }
          resolve(isTrue);
        }
      });
    });
  },

  //TODO
  read: (userId, password) => {
    let sql = `SELECT * FROM users WHERE userId==`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(JSON.stringify(row));
      });
    });
  },

  //TODO
  insert: (userId, fullName, email, userName, relationChild, password) => {
    db.run(
      "INSERT INTO users(user_id, full_name, email, user_name, relation_child,user_password) VALUES(?, ?, ?, ?, ?,?)",
      [userId, fullName, email, userName, relationChild, password],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log(`Row was added to the table with userId: ${userId}`);
      }
    );

    // close the database connection
    db.close();
  },

  upload: (
    drawId,
    userId,
    filePath,
    bbResult,
    dateOfBirth,
    gender,
    fullNameOfChild,
    dateUpload
  ) => {
    db.run(
      "INSERT INTO users(user_id, full_name, email, user_name, relation_child,user_password) VALUES(?, ?, ?, ?, ?,?)",
      [
        drawId,
        userId,
        filePath,
        bbResult,
        dateOfBirth,
        gender,
        fullNameOfChild,
        dateUpload,
      ],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log(`Row was added to the table with userId: ${userId}`);
      }
    );

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
    db.run("CREATE TABLE users(group_id INTEGER PRIMARY KEY, name text)");
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
