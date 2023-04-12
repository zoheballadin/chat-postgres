import Conversation from "./Conversation.js";
import Message from "./Message.js";
import User from "./User.js";

Conversation.belongsToMany(User, {through: "ConversationMembers" ,foreignKey: "members", onUpdate: "CASCADE"})
Message.belongsTo(Conversation, {foreignKey: "conversation", onUpdate: "CASCADE"} )
Message.belongsTo(User, {foreignKey: "sender", onUpdate: "CASCADE", as: "senderDetails"})
Conversation.belongsToMany(User, {
    through: "Conversations",
    foreignKey: "members",
    otherKey: "id",
    as: "memberList"
});