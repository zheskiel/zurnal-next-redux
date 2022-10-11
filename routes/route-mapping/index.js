let routes = [];
let redirects = [
  {
    // google site verification
    old: "/google407d7e5f8201d74d.html",
    new: "/google407d7e5f8201d74d.html",
  },
  {
    // Facebook Domain site verification
    old: "/8lzihur4ozv1i67e90auodkla99y69.html",
    new: "/8lzihur4ozv1i67e90auodkla99y69.html",
  },
  {
    // Privacy Policy page
    old: "/privacy",
    new: "/utils/privacy",
  },
];

redirects.map((route) => {
  const newRoute = {
    source: `${route.old}`,
    destination: `${route.new}`,
  };

  routes.push(newRoute);
});

module.exports = routes;
