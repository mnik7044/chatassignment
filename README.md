# Chat Widget README

## Project Overview

This project is a simple yet effective chat widget that can be easily integrated into any website or application. The focus of this project is on the backend, utilizing technologies like SocketIO, Node.js, and MongoDB. The frontend is designed in a basic way to ensure easy integration.

## Features

1. **Widget Integration**: The chat widget can be seamlessly integrated into any website or application. Simply include the provided script in your HTML file, and the widget will appear as a small icon on the screen.

2. **User Interaction**: When a user clicks on the widget icon, a chat popup will open, allowing users to interact with a host. Multiple hosts can be managed through the portal.

3. **Host Configuration**: The system supports any number of hosts. Hosts can be added, removed, or modified through the backend portal.

4. **Chat History**: The system stores the chat history for each user, ensuring a seamless conversation flow. This information is stored in a MongoDB database.

5. **User Details**: User details such as name, email, and phone number are collected and associated with the account or session. This information is accessible on the frontend.

## Technologies Used

- **Backend**:
  - Node.js: JavaScript runtime for server-side execution.
  - Express: Web application framework for Node.js.
  - SocketIO: Real-time bidirectional event-based communication.
  - MongoDB: NoSQL database for storing chat history and user details.

- **Frontend**:
  - HTML: Basic structure for the chat widget.
  - CSS: Simple styling for a clean user interface.
  - JavaScript: Handling user interactions and communication with the backend.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
