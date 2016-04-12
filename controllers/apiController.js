function index(req, res) {
  res.json({
    message: 'Welcome to Coder Confession!',
    documentation_url: 'https://github.com/seanvsville/project_1_coder_confession/blob/master/README.md',
    base_url: 'https://stark-shore-10560.herokuapp.com/',
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes available endpoints'},
      {method: 'GET', path: '/api/aliases', description: 'Describes available aliases'},
      {method: 'POST', path: '/api/aliases', description: 'Create new alias to aliases with confession details'},
      {method: 'DELETE', path: '/api/aliases/:aliasId/', description: 'Deletes entire alias with associated confession'},
      {method: 'DELETE', path: '/api/aliases/:aliasId/confessions/submission/:submissionId', description: 'Delete a submission within an alias'},
      {method: 'PUT', path: '/api/aliases/:aliasId/confessions/submission/:submissionId', description: 'Updates a submission within an alias'},
    ]
  });
}

module.exports.index = index;
