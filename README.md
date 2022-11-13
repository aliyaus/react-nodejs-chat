# React-Nodejs-Chat 

a basic chat server that will allow users to join a room with a username and message in real-time while using react-recoil for state management. 

# Key concepts 
- chat server infrastructure
- exposure to sockets.io & socket programming (setting up socket events)
- react-recoil for state management in UI 
- basic validation practice for user inputs
- use of bad-words library to clean messages 
- full stack application development (frontend & backend)

# Important 
- you will need to run both auth-frontend & server for this application to work correctly. 
- in index.js of frontend project wrap App with RecoilRoot
- remove React.StrictMode to prevent React from rendering twice 

# Future Enhancements 
- add a display broadcast message to chatroom when a user is typing
- create a more efficient way to update the user list 
- add jwt token authentication for connecting to a socket