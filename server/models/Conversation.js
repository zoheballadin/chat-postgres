import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Conversation = sequelize.define("Conversation", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    members : {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        references: {
            model: "Users",
            key: "id"
        }
        
    }

}, {timestamps: true})

export default Conversation