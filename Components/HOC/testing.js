import React from "react";
import { withRouter } from "next/router";
import { useRouter } from "next/router";

const Testing = ({ children }) => {
  const router = useRouter();
  const { query } = router;

  let updatedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { query });
  });
  console.log("updatedChildren : ", updatedChildren);
  return <>{updatedChildren}</>;
};

export default withRouter(Testing);
