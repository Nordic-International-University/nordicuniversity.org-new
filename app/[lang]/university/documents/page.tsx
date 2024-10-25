import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import Litsenziya from "@/app/components/templates/Litsenziya";
import litsenziya from "@/public/images/home-images/litsenziya.png";

const litsenziyarray: any = [
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
];

const Page = () => {
  return (
    <></>
    // <LeftSidebarAndComponent
    //   children={<Litsenziya props={litsenziyarray} sectionTitle="" />}
    //   sidebarItems={[]}
    //   sidebarTitle="Meyoriy hujjatlar"
    // ></LeftSidebarAndComponent>
  );
};

export default Page;
