import { NextPage } from 'next';

const Head: NextPage = () => {
  return (
    <>
      <title>Personal Blog</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta name='description' content='Next Generation Blog' />
      <link rel='icon' href='/favicon.ico' />
    </>
  );
};

export default Head;
