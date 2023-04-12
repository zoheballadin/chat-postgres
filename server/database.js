import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres://zoheballadin:password@localhost:5432/chat");

export default sequelize