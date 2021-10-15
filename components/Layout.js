import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <main className="flex flex-col sm:px-8 lg:px-0 py-2 sm:py-8 lg:py-14 w-full max-w-6xl mx-auto ">
        {children}
        <Footer />
      </main>
    </>
  );
}
