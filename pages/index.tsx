import React, { Children, ReactNode, useContext, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { AuthContext, useAuth } from "@context/authContext"
import { Props } from '../src/types/common.types';


const Home = ({children}:Props) => {
  const router = useRouter();
  const {authState, isUserAuthenticated} = useAuth()
  
  return (<div></div>);
};

export default Home;
