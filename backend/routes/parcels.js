const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const getParcels = () => {
  const filePath = path.join(__dirname, "../data/parcels.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};


router.get("/", (req, res) => {
  const parcels = getParcels();
  res.json(parcels);
});


router.get("/:id", (req, res) => {
  const parcels = getParcels();

  const id = parseInt(req.params.id);

  const parcel = parcels.find(p => p.id === id);

  if (!parcel) {
    return res.status(404).json({ error: "Parcel not found" });
  }

  res.json(parcel);
});

module.exports = router;