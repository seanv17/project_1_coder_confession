function index(req, res) {
  res.json({
    message: "Welcome to Coder Confession!",
    documentation_url: "https://github.com/seanvsville/project_1_coder_confession/blob/master/README.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
