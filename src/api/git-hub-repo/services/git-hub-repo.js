'use strict';

/**
 * git-hub-repo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::git-hub-repo.git-hub-repo');
