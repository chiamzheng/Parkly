const databaseAccess = require("./database_access/connect database/database_connect");

const userAccountRead = require("./database_access/read database/user_account_read");
const userAccountWrite = require("./database_access/write database/user_account_write");
const carparkRead = require("./database_access/read database/carpark_read");
const carparkWrite = require("./database_access/write database/carpark_write");



main = async () => {
    await databaseAccess.connect_db();

    // add account
    await userAccountWrite.add_user_account("Sam Goh", "abcd1234");

    // update email
    // await userAccountWrite.write_email("Han Ting", "Aaron Han");

    // update password
    // await userAccountWrite.write_password("Aaron Han", "new password")
    
    // update bookmark list
    // await userAccountWrite.write_bookmark_list("Matt", ["AAA"]);

    // find user
    // const results = await userAccountRead.read_password("Sam");

    // add carpark
    // await carparkWrite.add_carpark ("AAA", "BBB", 10)

    // find carpark
    //const results = await carparkRead.read_location("AAA");
    //console.log(results);

    // close the database
    await databaseAccess.close_db();
}; 

main();