import { getBlogs } from '@/lib/blogs';
import { shortify } from '@/helpers';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

const getInitialBlogs = async () => {
  const blogs = getBlogs();
  return blogs;
};

const Page: NextPage = () => {
  const blogs = use(getInitialBlogs());
  return (
    <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {blogs.map((blog) => (
        <Link
          href={`/blog/${blog.slug}`}
          key={blog.slug}
          className='group relative'
        >
          <div className='relative min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80'>
            <Image
              width={100}
              height={100}
              unoptimized={true}
              src={blog.coverImage}
              alt={blog.title}
              className='h-full w-full object-cover lg:h-full lg:w-full'
            />
          </div>
          <div className='mt-4 flex flex-col'>
            <h3 className='text-sm text-gray-700'>{blog.title}</h3>
            <p className='text-sm text-gray-900 font-medium mt-4'>
              {shortify(blog.description, 150)}
            </p>
            <p className='text-sm text-gray-900 font-medium mt-4'>
              {blog.author}, {blog.date}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Page;
