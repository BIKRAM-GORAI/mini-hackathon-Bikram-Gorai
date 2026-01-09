7/01/2026 - 9:10 AM
commit 1 -- Initialised the campus connect project ,made the folder structure and installed the necessary node modules


7/01/2026 - 11:46 AM
commit 2 -- made the two schemas ->the user schema and the request schema and learnt some important code syntaxes.

7/01/2026 - 7:13 PM
commit 3 -- made the db.js that is made the connection to databse using mongo uri


7/01/2026 - 7:58
commit 4 -- updated the server.js to get the mongo uri from .env and also import express, start the server and make the server listen,also tested the route by sending a message to the home page

8/01/2026 - 11:10 AM
commit 5 --  made the authroutes.Js for the login and register and linked them to the server.js Also fixed several errors like in the User model the password was written number which we had to change to string as we bcrypt hashes the password and stores as a string and for the email it type email which does not exist so we have to change it to string.

9/01/2026  -- 10:54 AM
commit 6  --  made the create view accept and complete request route and connected it via server.js 
also tested all the routes via postman
 (debugged many errors ,aleast 20-30 errors ,silly syntax mistakes ,routes redirectig mistakes , Laernt to use the og command [console.error(error)],Trough this command I was able to solve 70% of the errors in the synatax ,I learnt many things)