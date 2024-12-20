const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

const templateRoutes = require("./routes/previewRoutes");

app.use(express.json());

app.use("/api", templateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
