import { getBlogBySlug, getBlogs } from '@/lib/blogs';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { use } from 'react';
import Image from 'next/image';

interface Params extends ParsedUrlQuery {
  slug: string;
}

type BlogDetailProps = {
  params: Params;
};

const getInitialBlog = async (slug: string) => {
  const blog = getBlogBySlug(slug);
  return blog;
};

export const generateStaticParams = () => {
  const blogs = getBlogs();
  return blogs.map((blog) => {
    return {
      slug: blog.slug,
    };
  });
};

const Page: NextPage<BlogDetailProps> = ({ params }) => {
  const blog = use(getInitialBlog(params.slug));

  return (
    <div className='lg:w-2/3 w-full m-auto mt-6'>
      <div className='blog-detail-header'>
        <div className='flex flex-row justify-between mb-2'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <a href='#'>
                <span className='sr-only'>{blog.author}</span>
                <div className='relative h-10 w-10 !mb-0'>
                  <Image
                    priority
                    layout='fill'
                    objectFit='cover'
                    className='rounded-full'
                    src={blog.authorImage}
                    alt='Author Image'
                  />
                </div>
              </a>
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-900 !mb-0'>
                <a href='#' className='hover:underline'>
                  {blog.author}
                </a>
              </p>
              <div className='flex space-x-1 text-sm text-gray-500'>
                <time dateTime={blog.date}>{blog.date}</time>
              </div>
            </div>
          </div>
        </div>
        <h1 className='font-bold text-4xl mb-3 mt-3'>{blog.title}</h1>
        <h2 className='blog-detail-header-subtitle mb-3 text-xl text-gray-600'>
          {blog.description}
        </h2>
        <div className='h-96 bg-black mx-auto w-full relative'>
          <Image
            layout='fill'
            objectFit='cover'
            priority
            src={blog.coverImage}
            alt='Cover Image'
          />
        </div>
      </div>
      <article className='prose lg:prose-xl'>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </div>
  );
};

export default Page;
