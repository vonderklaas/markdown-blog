import { getBlogBySlug, getBlogs } from '@/lib/blogs';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { use } from 'react';
import BlogHeader from '../../../components/BlogHeader';

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

const BlogDetailsPage: NextPage<BlogDetailProps> = ({ params }) => {
  const blog = use(getInitialBlog(params.slug));

  return (
    <div className='w-2/3 m-auto'>
      <BlogHeader blog={blog} />
      <article className='prose lg:prose-xl'>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />;
      </article>
    </div>
  );
};

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => {
    return {
      slug: blog.slug,
    };
  });
}

export default BlogDetailsPage;
