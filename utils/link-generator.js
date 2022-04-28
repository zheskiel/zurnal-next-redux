import Link from "next/link";
import { getPostUrl, getUserUrl, getCategoryUrl, getTagUrl } from "./url-path";

export const PostLink = ({ elem, children }) => {
  const url = getPostUrl(elem);

  return (
    <Link
      href={{
        pathname: url,
      }}
      as={url}
      passHref
    >
      {children}
    </Link>
  );
};

export const UserLink = ({ elem, children }) => {
  const url = getUserUrl(elem);

  return (
    <Link
      href={{
        pathname: url,
      }}
      as={url}
      passHref
    >
      {children}
    </Link>
  );
};

export const CategoryLink = ({ elem, children }) => {
  const url = getCategoryUrl(elem);

  return (
    <Link
      className="utf_post_cat"
      href={{
        pathname: url,
      }}
      as={url}
      passHref
    >
      {children}
    </Link>
  );
};

export const TagLink = ({ elem, children }) => {
  const url = getTagUrl(elem);

  return (
    <Link
      href={{
        pathname: url,
      }}
      as={url}
      passHref
    >
      {children}
    </Link>
  );
};
