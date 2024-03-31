# gyangrove-backend
# Event Management System

## Tech Stack and Database:

### Backend:

Node.js: Chosen for its non-blocking, event-driven architecture which is well-suited for handling asynchronous operations, making it ideal for building scalable web applications.
Express.js: Used as the web application framework for Node.js to simplify routing, middleware creation, and handling HTTP requests.
MongoDB: Selected as the database due to its flexibility, scalability, and support for JSON-like documents. It allows for easy integration with Node.js applications using Mongoose, an Object Data Modeling (ODM) library.

### Frontend:

HTML, CSS, JavaScript: Standard web technologies used for creating the user interface and adding interactivity to the application.
Fetch API: Used for making asynchronous HTTP requests from the client-side JavaScript code to the backend server.

## Design Decisions:

### Backend API Design:

RESTful API: The backend follows RESTful principles to provide a clear and predictable interface for interacting with the application.
Pagination: Implemented pagination to efficiently handle large datasets, improving performance and reducing response times for the client.

### Database Schema:

Event Schema: Designed to store event-related information such as event name, city, date, time, latitude, and longitude. This schema facilitates efficient querying and retrieval of events based on different criteria.

## Challenges and Solutions:

Handling Asynchronous Operations:

Utilized async/await syntax in JavaScript to handle asynchronous operations in a synchronous-like manner, improving code readability and maintainability.
Employed Promises and error handling techniques to manage asynchronous tasks effectively and ensure proper error propagation.
Data Pagination:

Implemented pagination on the backend to break large datasets into smaller, manageable chunks, preventing performance issues and enhancing user experience.
Used skip() and limit() methods in MongoDB queries to retrieve a specific subset of data based on the requested page size and number.
Setting Up and Running the Project:

## Prerequisites:

Node.js installed on your machine
MongoDB installed and running locally

## Steps:
Clone the repository to your local machine using git clone web_url.
Navigate to the project directory in your terminal or command prompt.
Install dependencies by running npm install.
Start the backend server by running node server.js.
Access the frontend by opening localhost:3000 in a web browser.
Enter latitude, longitude, and date in the form fields and submit to search for events.
Scroll down to load more events as needed.
