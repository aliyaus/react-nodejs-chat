# React-Nodejs-Chat Backend 

a basic chat server that will allow users to join a room with a username and message in real-time while. 

# Steps to clone & run this project
1) clone `react-nodejs-chat` repository
2) in the `backend` directory run `npm install`
3) run `npm run dev`

# Steps to recreate this project
1) create a backend project directory 
2) run `npm init --y` to initialize node project (this will create a package.json)
3) install the following dependencies using `npm install express moment socket.io cors`
    - express 
    - moment
    - socket.io
    - cors
4) install nodemon as a dev dependency using `npm install -D nodemon` 
5) add ` "dev": "nodemon index" ` to the scripts object in package.json
6) create an `index.js `
7) create `userHelper.js` in `helpers`
8) run `npm run dev` to serve backend

