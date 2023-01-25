import { join } from 'path';
import fs from 'fs';
import { Blog } from '@/interfaces/Blog';

// Parse markdown
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Add docs
const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

// Package to parse Markdown
import matter from 'gray-matter';

const shortify = (text: string, maxLength = 60) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return `${text.substring(0, maxLength)}...`;
  }
};

const getDirectory = (path: string) => {
  return join(process.cwd(), path);
};

const BLOG_DIRECTORY = getDirectory('/content/blogs');

const getFileNames = (directory: string): string[] => {
  return fs.readdirSync(directory);
};

const getBlogFileNames = () => {
  return getFileNames(BLOG_DIRECTORY);
};

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // Join parsed information
  const { data, content } = matter(fileContent);
  return { ...data, content } as Blog;
};

const getBlog = (fileName: string) => {
  const blog = getItemInPath(join(BLOG_DIRECTORY, fileName));
  // Create slug
  blog.slug = fileName.replace('.md', '');
  return blog;
};

const getBlogBySlug = async (slug: string) => {
  const fileName = `${slug}.md`;
  const blog = getBlog(fileName);
  // Parse
  blog.content = await markdownToHtml(blog.content);
  return blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  const items = names.map(getBlog);
  return items;
};

export { getBlogs, getBlogBySlug, shortify };
