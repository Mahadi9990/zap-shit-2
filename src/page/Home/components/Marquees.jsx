import React from "react";
import Marquee from "react-fast-marquee";
import MyComponent from "./MyComponent";

export default function Marquees() {
  return (
    <div>
      <Marquee>
        <MyComponent />
        <MyComponent />
        <MyComponent />
      </Marquee>
    </div>
  );
}
