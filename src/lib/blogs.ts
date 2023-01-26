import fs from 'fs';
import { join } from 'path';
import { Blog } from '@/interfaces/Blog';

// Markdown to HTML
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Content Directory
const BLOG_DIRECTORY = join(process.cwd(), '/content/blogs');

const convertMarkdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

const getFileNames = (directory: string): string[] => {
  return fs.readdirSync(directory);
};

const getBlogFileNames = () => {
  return getFileNames(BLOG_DIRECTORY);
};

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return { ...data, content } as Blog;
};

const getBlog = (fileName: string) => {
  const blog = getItemInPath(join(BLOG_DIRECTORY, fileName));
  blog.slug = fileName.replace('.md', '');
  return blog;
};

const getBlogBySlug = async (slug: string) => {
  const fileName = `${slug}.md`;
  const blog = getBlog(fileName);
  blog.content = await convertMarkdownToHtml(blog.content);
  return blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  const items = names.map(getBlog);
  return items;
};

export { getBlogs, getBlogBySlug };
