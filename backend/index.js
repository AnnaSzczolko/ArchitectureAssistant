const express = require("express");
const cors = require('cors')
const app = express();
require("dotenv").config();

const parcelsRoutes= require('./routes/parcels')
const projectsRoutes = require('./routes/projects')
const analysisRoutes = require('./routes/analysis')
const aiRoutes = require('./routes/ai') 

app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://architecture-assistant-ugyb.vercel.app"
  ]
}));
app.use("/parcels", parcelsRoutes);
app.use("/projects", projectsRoutes);
app.use("/analysis", analysisRoutes);
app.use("/ai", aiRoutes);


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
module.exports = app;