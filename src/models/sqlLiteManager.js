const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../../newDB/drawsdb.db");
let db;
const sqlLiteManager = {
  connect: () => {
    // db = new sqlite3.Database(
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to SQlite database.");
    });
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
      throw error;
    }
  },

  dbAllPromise: async (query) => {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err && err !== null) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },

  //TODO
  read: async (userId) => {
    let query = `SELECT * FROM draws WHERE user_id=="${userId}"`;
    try {
      const promiseResult = await sqlLiteManager.dbAllPromise(query);
      return promiseResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
    // db.all(sql, [], (err, rows) => {
    //   if (err) {
    //     throw err;
    //   }
    //   rows.forEach((row) => {
    //     console.log(JSON.stringify(row));
    //   });
    // });
  },

  //TODO
  insert: (fullName, email, userName, userGender, password) => {
    db.run(
      "INSERT INTO users(full_name, email, user_name, user_gender,user_password) VALUES( ?, ?, ?, ?,?)",
      [fullName, email, userName, userGender, password],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log(`Row was added to the table with userName: ${userName}`);
      }
    );

    // close the database connection
    // db.close();
  },

  upload: async (
    userId,
    filePath,
    bbResult,
    dateOfBirth,
    gender,
    fullNameOfChild,
    dateUpload
  ) => {
    db.run(
      "INSERT INTO draws(user_id, file_path, bb, data_of_birth, gender, full_name_of_child, data_upload) VALUES(?, ?, ?, ?, ?,?,?)",
      [
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
    //db.close();
    return true;
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
