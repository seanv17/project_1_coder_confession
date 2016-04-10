function index(req, res) {
  res.json({
    message: 'Welcome to Coder Confession!',
    documentation_url: 'https://github.com/seanvsville/project_1_coder_confession/blob/master/README.md',
    base_url: 'http://apricot-cobbler-58165.herokuapp.com',
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes available endpoints'},
      {method: 'GET', path: '/api/aliases', description: 'Describes available aliases'},
      {method: 'POST', path: '/api/aliases', description: 'Create new alias to aliases'},
      {method: 'DELETE', path: '/api/aliases/:aliasId/confessions/submission/:submissionId', description: 'Delete a submission within an alias'},
      {method: 'DELETE', path: '/api/aliases/:aliasId/', description: 'Deletes entire confession with alias details'},
      {method: 'PUT', path: '/api/aliases/:aliasId/confessions/submission/:submissionId', description: 'Updates a submission within an alias'},
    ]
  });
}

module.exports.index = index;
