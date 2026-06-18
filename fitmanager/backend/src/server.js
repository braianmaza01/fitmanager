require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });
