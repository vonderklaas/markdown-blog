const Page = () => {
  return (
    <div>
      <div>
        <h1 className='text-xl'>Hello, my name is Nick</h1>
        <br />
        <p>This is my personal blog.</p>
        <p>
          Sometimes I post my articles, sometimes I translate other articles,
          enjoy reading!
        </p>
      </div>
      <br />
      <p>Contacts? </p>
      <br />
      <a
        className='block text-red-700'
        href='https://github.com/garbalau-github?tab=repositories'
      >
        Github
      </a>
      <a className='block text-red-700' href='mailto:garbalaunick@gmail.com'>
        Mail
      </a>
    </div>
  );
};

export default Page;
