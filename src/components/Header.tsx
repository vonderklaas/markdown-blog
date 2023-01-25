import Link from 'next/link';

export const Header = () => {
  return (
    <header className='fixed top-6 left-6'>
      <ul className='flex'>
        <li>
          <Link href='/' className='text-gray-800 font-medium mr-10'>
            home
          </Link>
        </li>
        <li>
          <Link href='/blog' className='text-gray-800 font-medium mr-10'>
            blog
          </Link>
        </li>
      </ul>
    </header>
  );
};
