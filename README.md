 # Ask Me

 This is a full-stack application with a Go backend and a Node.js-based frontend.

 ## Prerequisites

 Make sure you have the following installed on your system:

 - [Go](https://go.dev/doc/install)
 - [Node.js](https://nodejs.org/en/download/) (v18 or newer recommended)

 ## How to Run

 You will need to run two separate processes for the backend and the frontend.

 ### Backend (Go)

 The backend server is responsible for the API.

 1.  Copy .env.example and make new file .env.
 2.  Update .env key according with your configuration.
 1.  Open a terminal in the project's root directory (`c:\self-project\ask-me`).
 2.  Run the following command to start the Go server:

     ```sh
     go run main.go
     ```

 3.  The server will start, and you should see the message: `Go server running on http://localhost:8080`.

 ### Frontend (Node.js)

 The frontend is a modern JavaScript application.

 1.  Open a **new** terminal window.
 2.  Navigate to the `frontend` directory:

     ```sh
     cd frontend
     ```

 3.  Install the necessary Node.js packages:

     ```sh
     npm install
     ```

 4.  Start the frontend development server:

     ```sh
     npm start
     ```

     > **Note:** The start command might be different depending on the framework used (e.g., `npm run dev` for Vite/Next.js). If `npm start` does not work, please check the `scripts` section of your `frontend/package.json` file.

 5.  The frontend will be available in your browser, usually at a URL like `http://localhost:3000` or `http://localhost:5173`. The correct URL will be shown in your terminal.

 ## Usage

 Once both the backend and frontend are running, you can open the frontend URL in your web browser to use the application. The frontend will make requests to the backend API running on port 8080.