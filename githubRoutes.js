const express = require("express");
const router = express.Router();
const { getUserData, getRepoData, createIssue } = require("./githubService");

// GET /github --- to show user data
router.get("/", async (req, res) => {
  try {
    const data = await getUserData();
    res.json(data);
  } catch (error) {
    res.json({ error: "Error fetching GitHub data" });
  }
});

// GET /github/:repoName --- to show repo details
router.get("/:repoName", async (req, res) => {
  try {
    const { repoName } = req.params;
    const data = await getRepoData(repoName);
    res.json(data);
  } catch (error) {
    res.json({ error: "Error fetching repo data" });
  }
});

// POST /github/:repoName/issues --- to create an issue in a repo
router.post("/:repoName/issues", async (req, res) => {
  try {
    const { repoName } = req.params;
    const { title, body } = req.body;
    const issueUrl = await createIssue(repoName, title, body);
    res.json({ message: "Issue created successfully", issueUrl });
  } catch (error) {
    res.json({ error: "Error creating issue" });
  }
});

module.exports = router;
