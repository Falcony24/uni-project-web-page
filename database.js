const sql = require("mysql");
const config = {
    host: "localhost",
    user: "admin",
    password: "admin"
}
function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    let connection = sql.createConnection(config);

    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}

const con = initializeConnection(config);

const requireAuth = (req, res, next) => {
    if(req.session.userID) {
        next();
    }
    else {
        res.redirect('/');
    }
}

module.exports = {con,
                requireAuth
                };