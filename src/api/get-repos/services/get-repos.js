"use strict";
const { request } = require("@octokit/request");
const axios = require("axios");



module.exports = ({ strapi }) => ({
  async getRepos(token) {
    const options = {
      headers: {
        authorization: `token ${token || process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    };
    const { data } = await request("GET /user/repos", options);

    const repos = Promise.all(
      data.map(async (repo) => {
        const {
          id,
          name,
          owner,
          description,
          html_url,
          stargazers_count,
          watchers_count,
          open_issues_count,
          pushed_at,
          default_branch,
        } = repo;
        const readMeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;
        let longDescription;

        try {
          const result = (await axios.get(readMeUrl)).data;
          longDescription = result;
        } catch (error) {
          longDescription = "No README.md found";
        }

        return {
          id,
          name,
          owner,
          description,
          html_url,
          stargazers_count,
          watchers_count,
          open_issues_count,
          pushed_at,
          default_branch,
          longDescription,
        };
      })
    );

    return repos;
  },
});