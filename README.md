# OurWhatsApp

OurWhatsApp is an intuitive web-based messaging application that facilitates real-time communication between users. The application showcases a sleek, modern interface equipped with user registration, authentication, and profile management capabilities.
The project includes both client (React application) and server (Node.JS application). Each one of them can run seperately to allow using with different application for the second end.

## Getting Started

Follow these instructions to set up the project on your local machine:

1. Ensure a web browser is installed to run HTML and CSS files.
2. Enter the following commands in your terminal:
<pre>
git clone https://github.com/yonikal56/our-whatsapp-2
cd our-whatsapp-2
</pre>

### Run Server

Follow these instruction to run the server on your local machine:

1. Go to "server" folder inside the project.
2. Run "npm install".
3. Update config/.env.local file. Template is provided in this form:
<pre>
CONNECTION_STRING="mongodb://127.0.0.1:27017"
PORT=12345
DB_NAME="our-whatsapp-db"
TOKEN_KEY="secretkeyy!"
</pre>

- CONNECTION_STRING is the connection string of mongodb (for example, if installed locally it will be something like mongodb://127.0.0.1:27017). Change if needed.
- DB_NAME is the name of the database inside mongodb. Also can be changed with the default value of our-whatsapp-db.
- PORT is the port the server runs on, adapt if needed (for example if the post is already used).
- TOKEN_KEY is a secret key for the JWT tokens the server uses for authentication. Set it to a secret string of your choice. You should change the default value.

If you want you can also create .env.test file and .env file (with the same fields), but you only need one of them to run the server correctly.

To run the server after this file is set, run one of the following commands:

1. "npm start" to use .env.local file.
2. "npm test" to use .env.test file.
3. "node app.js" to run with .env file.

If you run the server, you can access the client from the browser by navigating to the base url of the server.

### Run Client

Follow these instruction to run the client on your local machine:

1. Go to "our-whatsapp-1b" folder - the project folder.
2. Run "npm install".
3. Update config/.env.local file. Template is provided in this form:
<pre>
REACT_APP_SERVER_PATH=http://localhost:12345
REACT_APP_IO_SOCKET=http://127.0.0.1:12345
</pre>

- REACT_APP_SERVER_PATH is the base path of the server. http://localhost:12345 is the base url of our server, adapt if you need.
- REACT_APP_IO_SOCKET is the base path of the socket server (the same server usually). It should be passed with 127.0.0.1 instead of localhost (or different IP if needed).

4. Run "npm start".

## Folder structure

Our project include 2 base folders - client and server.
The client folder includes all the client react application files - all componenets, script and everything that is necessary for the client to run.
The server folder includes all the server express application files - controllers, models, services and routes.
The server also includes public folder that serves the client application when going to the base url path of the server.

## Features

- User registration and login, complete with validation against a list of registered users.
- Denial of access to the messages page without a registered user.
- User, friends, and messages data are stored in local storage, ensuring data persistence even after a refresh.
- Responsive design.
- Add friends, send messages, and display conversations in their chat.
- Navigate between chats.
- Display time, last messages and friends photos of each conversation.

## Future Enhancements

- Implement a back-end server for user authentication, registration, and messaging.
- Add support for group chats and private messaging.
- Include support for multimedia messages, such as images and videos.
