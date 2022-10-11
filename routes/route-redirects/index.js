let routes = [];
let redirects = [
  {
    old: "art",
    new: "seni",
  },
  {
    old: "automotive",
    new: "otomotif",
  },
  {
    old: "business",
    new: "bisnis",
  },
  {
    old: "career",
    new: "karir",
  },
  {
    old: "health",
    new: "kesehatan",
  },
  {
    old: "tech",
    new: "tekno",
  },
  {
    old: "weird",
    new: "unik",
  },
  {
    old: "inspiration",
    new: "inspirasi",
  },
  {
    old: "relationship",
    new: "hubungan",
  },
];

redirects.map((route) => {
  const newRoute = {
    source: `/category/${route.old}`,
    destination: `/category/${route.new}`,
    permanent: true,
  };

  routes.push(newRoute);
});

module.exports = routes;
