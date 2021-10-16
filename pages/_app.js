import { Device } from "../components/Device";
import Head from "next/head";
import "../styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://marvelapp.github.io/devices.css/assets/devices.min.css"
          type="text/css"
        />
      </Head>
      <Device>
        <Component {...pageProps} />
      </Device>
    </>
  );
}

export default MyApp;
