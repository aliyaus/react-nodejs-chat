# React-Nodejs-Chat Frontend 

a basic chat ui that will allow users to join a room with a username and message in real-time while using react-recoil for state management. 

# Steps to clone & run this project
1) clone `react-nodejs-chat` repository
2) in the `frontend` directory run `npm install` or `yarn install` 
3) run `npm start` or `yarn start` 

# Steps to recreate this project
1) create a frontend project directory 
2) run `yarn create react-app app-name` to create react project
3) install the following dependencies using yarn add
    - axios 
    - recoil
    - moment
    - bad-words 
4) create App.js
5) create `chatFormAtom.js` in `store/atoms`
6) create `validators.js` in `utils` 
7) create a Chat, Lobby, & Message component in `components`
8) run `yarn start` and view project at `localhost:3000`

# Key points 
- in index.js wrap App with RecoilRoot
