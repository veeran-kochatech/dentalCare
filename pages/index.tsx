import React, { Children, ReactNode, useContext, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode
}
const Home = ({children}:Props) => {
  const router = useRouter();
  
  return (<div></div>);
};

export default Home;
