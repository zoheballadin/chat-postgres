import sequelize from "./database.js";

const dbConnect = async() =>{
    try {
        await sequelize.authenticate();
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}

const synchronize = async() =>{
    await sequelize.sync({ force: false });
    console.log("model synced")
  }

dbConnect()

synchronize()

