import { Error404 } from '@/errors';
import Head from 'next/head';
import React from 'react';



const Page404 = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Error404 />
    </>
  );
};
export default Page404;
