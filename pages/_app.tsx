import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/index.css"
import Layout from "@components/layouts";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
          <Layout>
            <Component {...pageProps} />
          </Layout>
  );
}

export default MyApp;
