let routes = [];
let redirects = [
  {
    old: "/category/art",
    new: "/category/seni",
  },
  {
    old: "/category/automotive",
    new: "/category/otomotif",
  },
  {
    old: "/category/business",
    new: "/category/bisnis",
  },
  {
    old: "/category/career",
    new: "/category/karir",
  },
  {
    old: "/category/health",
    new: "/category/kesehatan",
  },
  {
    old: "/category/tech",
    new: "/category/tekno",
  },
  {
    old: "/category/weird",
    new: "/category/unik",
  },
  {
    old: "/category/inspiration",
    new: "/category/inspirasi",
  },
  {
    old: "/category/relationship",
    new: "/category/hubungan",
  },
  {
    old: "/user/juan.deleon",
    new: "/user/juan.zheskiel",
  },
];

redirects.map((route) => {
  const newRoute = {
    source: `${route.old}`,
    destination: `${route.new}`,
    permanent: true,
  };

  routes.push(newRoute);
});

module.exports = routes;
