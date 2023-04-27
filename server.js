const { app } = require("./app");
const {
  initModelsTalentManagement,
} = require("./models/talentManagement/initModelsTalentManagement");

// Utils
const { db } = require("./utils/database.util");

const startServer = async () => {
  try {
    await db.authenticate();

    // Establish model's relations
    initModelsTalentManagement();

    db.sync({ force: false })
      .then(() => console.log("Db synced"))
      .catch((err) => console.log(err));

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log("Express app running!!", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
