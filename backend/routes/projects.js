const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();


const getProjects = () => {
  const filePath = path.join(__dirname, "../data/projectRequest.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

router.get("/", (req, res) => {
  const projects = getProjects();
  res.json(projects);
});

router.get("/:id", (req, res) => {
  const projects = getProjects();

  const id = parseInt(req.params.id);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});

module.exports = router;