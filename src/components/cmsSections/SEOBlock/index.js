import Head from "next/head";

export function SEOBlock({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
