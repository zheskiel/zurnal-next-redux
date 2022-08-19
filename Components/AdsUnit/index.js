import React, { Component } from "react";

class Index extends Component {
  render() {
    return (
      <div className="ads-unit-wrapper">
        <ins
          key={Math.random()}
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6983942794145260"
          data-ad-slot="1294452039"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }
}

export default Index;
