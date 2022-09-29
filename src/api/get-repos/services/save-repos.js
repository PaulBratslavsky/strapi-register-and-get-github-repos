"use strict";


module.exports = ({ strapi }) => ({
  async saveRepos(repos) {

    const response = Promise.all(
      repos.map(async (repo) => {
        const data = {
          name: repo.name,
          owner: repo.owner.login,
          description: repo.description,
          longDescription: repo.longDescription,
        };
        const response = await strapi.service('api::git-hub-repo.git-hub-repo').create({ data });
        return response;
      })
    );

    return response;
  },
});