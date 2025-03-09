const axios = require("axios");

const GITHUB_API_URL = "https://api.github.com";
const { GITHUB_ACCESS_TOKEN, GITHUB_USERNAME } = process.env;

const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

async function getUserData() {
  const { data: user } = await githubAPI.get(`/users/${GITHUB_USERNAME}`);
  const { data: repos } = await githubAPI.get(
    `/users/${GITHUB_USERNAME}/repos`
  );

  return {
    username: user.login,
    name: user.name,
    followers: user.followers,
    following: user.following,
    public_repos: repos.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
    })),
  };
}

async function getRepoData(repoName) {
  const { data } = await githubAPI.get(`/repos/${GITHUB_USERNAME}/${repoName}`);
  return {
    name: data.name,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    issues: data.open_issues_count,
    repo_url: data.html_url,
  };
}

async function createIssue(repoName, title, body) {
  const { data } = await githubAPI.post(
    `/repos/${GITHUB_USERNAME}/${repoName}/issues`,
    {
      title,
      body,
    }
  );

  return data.html_url;
}

module.exports = { getUserData, getRepoData, createIssue };
