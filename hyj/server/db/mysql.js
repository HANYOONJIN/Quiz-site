import mysql from "mysql";
let conn;

function handleDisconnect() {
  conn = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'yj',
    password: 'GKSdbswls1!',
    database: 'hyj'
  });

  conn.getConnection( err => { 
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('connection');
    }
  }); 

  conn.on('error', err => {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

export default conn;
