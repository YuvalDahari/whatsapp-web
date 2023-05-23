# OurWhatsApp

OurWhatsApp is an intuitive web-based messaging application that facilitates real-time communication between users. The application showcases a sleek, modern interface equipped with user registration, authentication, and profile management capabilities.

## Getting Started

Follow these instructions to set up the project on your local machine:

1. Ensure a web browser is installed to run HTML and CSS files.
2. Enter the following commands in your terminal:
<pre>
git clone https://github.com/yonikal56/our-whatsapp-1b
cd our-whatsapp-1b
npm install
npm start
</pre>

3. Register a new account or log in with an existing one.

Please note that this project currently only serves as a front-end prototype. All data is stored in local storage, and there isn't functionality to communicate with other users yet.

## Features

- User registration and login, complete with validation against a list of registered users.
- Denial of access to the messages page without a registered user.
- User, friends, and messages data are stored in local storage, ensuring data persistence even after a refresh.
- Responsive design.
- Add friends, send messages, and display conversations in their chat.
- Navigate between chats.
- Display time, last messages and friends photos of each conversation.

## Directory & File Overview

### Review

The project is primarily built with JavaScript (React) and includes various elements ranging from components to data management utilities and assets. This section provides an overview of these key elements:

- `App.js`: Initializes the user data with the local storage and handles the routing of the main pages.
- `login`: Manages the login page. Simple yet integrated with local storage.
- `register`: Manages the registration page. All fields undergo validation based on a predefined set of rules.
- `special pages`: Handles attempts to access the app from invalid URLs.
- `messages`: Manages the messages page.
- `conversations`: Handles the conversations component on the messages page.
- `chatSection`: Manages the chatSection component on the messages page.
- `background`: Establishes general guidelines for the backgrounds of different pages.
- `Users`: Stores utility functions to manage the data.
- `photos`: Stores the photos used in the project.

### Hierarchy

- public
  - css
    - bootstrap.min.css
  - photos
 
- src
  - Users
  - background
  - chatSection
  - conversations
  - form
  - login
  - messages
  - register
  - special pages
  - App.js

## Future Enhancements

- Implement a back-end server for user authentication, registration, and messaging.
- Add support for group chats and private messaging.
- Include support for multimedia messages, such as images and videos.
