import Link from 'next/link';

export const Header = () => {
  return (
    <header className='bg-slate-400 p-5 top-6 left-6'>
      <ul className='flex'>
        <li>
          <Link href='/' className='text-red-200 font-medium mr-10'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/blog' className='text-red-200 font-medium mr-10'>
            Blog
          </Link>
        </li>
      </ul>
    </header>
  );
};
