import Link from "next/link";
import { useRouter } from "next/router";
import { CategoryLink } from "../../utils/link-generator";

import NavDropdown from "react-bootstrap/NavDropdown";

import { list } from "./menuList";

const Menus = () => {
  const router = useRouter();
  const { category: activeSlug } = router.query;

  const categories = [];

  list.map((item) => {
    const category = {
      category: Object.assign({}, item),
    };

    return categories.push(category);
  });

  return (
    <ul>
      <li className={activeSlug == null ? "current-item" : ""}>
        <Link href={{ pathname: `/` }}>
          <a>Home</a>
        </Link>
      </li>

      <li>
        <NavDropdown title="Apps">
          <NavDropdown.Item href={`/chords`}>Chords</NavDropdown.Item>
          <NavDropdown.Item href={`/lyrics`}>Lyrics</NavDropdown.Item>
        </NavDropdown>
      </li>

      {categories &&
        categories.map((item, index) => {
          return (
            <li
              key={index}
              className={item.category.slug == activeSlug ? "current-item" : ""}
            >
              <CategoryLink elem={item}>{item.category.name}</CategoryLink>
            </li>
          );
        })}
    </ul>
  );
};

export default Menus;
