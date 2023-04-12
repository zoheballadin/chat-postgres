import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    sender: {
        type: DataTypes.BIGINT,
        references: {
            model: "Users",
            key: "id"
        }
    },
    conversation : {
        type : DataTypes.BIGINT,
        references: {
            model: "Conversations",
            key: "id"
        }
    },
    text: {
        type: DataTypes.STRING
    }

}, {timestamps: true})

export default Message