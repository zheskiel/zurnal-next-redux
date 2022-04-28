import { useEffect } from "react";
import { withRouter } from "next/router";
import { useRouter } from "next/router";

const routeHoc = (props) => {
  const router = useRouter();
  const { query } = router;

  const { children, handleFetch } = props;

  useEffect(() => handleFetch(query), []);

  return <>{children}</>;
};

export default withRouter(routeHoc);
