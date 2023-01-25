import { getBlogs, shortify } from '@/lib/blogs';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

const getInitialBlogs = async () => {
  const blogs = getBlogs();
  return blogs;
};

const BlogPage: NextPage = () => {
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
              src={blog.coverImage}
              alt={blog.title}
              className='h-full w-full object-cover object-center lg:h-full lg:w-full'
            />
          </div>
          <div className='mt-4 flex flex-col'>
            <h3 className='text-sm text-gray-700'>{blog.title}</h3>
            <p className='text-sm font-medium text-gray-900'>
              {shortify(blog.description, 150)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogPage;
