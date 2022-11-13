const users = [];

// Join user to chat
function newUser(id, username, chatroom) {
  const user = { id, username, chatroom };

  users.push(user);

  return user;
}

// User leaves chat
function exitRoom(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getIndividualRoomUsers(chatroom) {
  return users.filter(user => user.chatroom === chatroom);
}

module.exports = {
  newUser,
  exitRoom,
  getIndividualRoomUsers
};