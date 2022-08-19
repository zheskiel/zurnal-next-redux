import React, { Component, useEffect } from "react";

const Index = () => {
  useEffect(() => {
    setTimeout(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      console.log("render ads");
    }, 1000);
  }, []);

  return (
    <div className="ads-unit-wrapper">
      <ins
        key={Math.random()}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6983942794145260"
        data-ad-slot="1294452039"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default Index;
