export const getPostUrl = (elem) => {
  return `/post/${elem.post_slug_id}/${elem.post_slug_title}`;
};

export const getUserUrl = (elem) => {
  return `/user/${elem.username}`;
};

export const getCategoryUrl = (elem) => {
  return `/category/${elem.category.slug}`;
};

export const getTagUrl = (elem) => {
  return `/tag/${elem.slug}`;
};
