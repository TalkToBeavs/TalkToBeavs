[![TalkToBeavs](hero.png)](https://talktobeavs.onrender.com/)

# TalkToBeavs 🦫

<p align="left">
	<img width="70" height="20" src="https://badges.aleen42.com/src/react.svg">
	<img width="70" height="20" src="https://badges.aleen42.com/src/redux.svg">
	<img width="70" height="20" src="https://badges.aleen42.com/src/node.svg">
	<img width="90" height="20" src="https://badges.aleen42.com/src/javascript.svg">
      <img width="100" height="20" src="https://badges.aleen42.com/src/react-router.svg">
	<img width="70" height="20" src="https://badges.aleen42.com/src/vitejs.svg">
</p>

TalkToBeavs is a real-time chat application that allows users to communicate with each other through text, audio, and video. It is limited to Oregon State University students and faculty, but provides a fun and easy way to connect with other Beavers! Check it out <a href="https://talktobeavs.onrender.com">here.</a> 🚀

# Getting Started

## How to run the project locally:

1. Clone the repository
2. Install dependencies
3. Get environment variables
4. Run the project

### 1. Clone the repository

```bash
git clone https://github.com/Nyumat/TalkToBeavs.git
```

### 2. Install the dependencies

```bash
cd TalkToBeavs/frontend
npm install # or yarn, pnpm, etc.
cd ..
npm install
```

### 3. Set the environment variables

> Note: You will need to create  a Giphy API key.

<b>Frontend:</b>

```bash
# Create a .env file in root of the frontend directory
VITE_APP_PROD_BACKEND_URL="http://localhost:[PORT BACKEND IS RUNNING ON]"
```

<b>Backend:</b>

```bash
# Create a .env.local file in the root directory
touch .env.local

# Your .env.local file should look like this:
PORT=
MONGODB_URI=
FEED_ID=
JWT_PRIVATE_KEY=
GIPHY_API_KEY=

# Don't forget to add your own values!
```
### 4 Run postgres using docker locally

- Ensure you have [Docker](https://www.docker.com/get-started) installed on your machine.
- Keep your docker desktop app running
```bash
docker run -p 5432:5432  -e POSTGRES_PASSWORD=mysecretpassword  -d postgres
```
- Replace your DATABASE_URL with your own  password
```bash
postgresql://postgres:mysecretpassword@localhost:5432/postgres

```


### 5. Run the project

```bash
# Run the frontend
cd frontend
npm run dev

# Open a new terminal window and run the backend
cd TalkToBeavs (root directory)
npm run dev
```

## TalkToBeavs is proud to be built with:

- [React](https://react.dev/)
  - JavaScript library for building user interfaces
- [MongoDB](https://www.mongodb.com/)
  - NoSQL document database
- [Vite](https://vitejs.dev/)
  - Build tool for frontend development
- [Socket.io](https://socket.io/)
  - Real-time communication between client and server
- [Redux Toolkit](https://redux-toolkit.js.org/)
  - Flux-like state management library
- [Express](https://expressjs.com/)
  - Web application framework for Node.js
- [WebRTC](https://webrtc.org/)
  - Peer-to-peer video and audio communication in the browser
- [Chakra UI](https://chakra-ui.com/)
  - Simple, modular, and accessible component library
- [React Router](https://reactrouter.com/)
  - Declarative routing for React
- [Giphy API](https://developers.giphy.com/)
  - API for searching and retrieving GIFs
