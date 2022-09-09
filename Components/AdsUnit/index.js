import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    setTimeout(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      console.log("render ads");
    }, 1000);
  }, [asPath]);

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#ddd",
        marginTop: "20px",
        marginBottom: "20px",
        padding: "0px",
      }}
    >
      <div className="ads-unit-wrapper">
        <ins
          key={`${asPath}`}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6983942794145260"
          data-ad-slot="1294452039"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default Index;
