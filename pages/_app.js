import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css'
        />
        <link
          href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css'
          rel='stylesheet'
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
