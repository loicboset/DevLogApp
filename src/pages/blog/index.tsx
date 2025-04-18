/* eslint-disable max-len */
import Link from "next/link";

import { BlogPostListElement } from "../../types/blog/blog_post_data";
import getSortedPostsData from "../../utils/getSortedPostsData/getSortedPostsData";

type Props = {
  posts: BlogPostListElement[];
};

const Blog = ({ posts }: Props): React.ReactElement => (
  <div className="mx-6 mt-4">
    <div className="flex justify-between">
      <Link href="/">
        <h1 className='text-3xl text-indigo-500'>DevLog</h1>
      </Link>
      <div className='flex space-x-4 items-center'>
        <Link href="/login" className="text-sm/6 font-semibold lg:block">
            Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </Link>
      </div>
    </div>

    <div className="py-24">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Blog
          </h2>
          <p className="mt-2 text-lg leading-8">
            We also write. Its healthy.
          </p>
          <div className="pt-10 mt-10 space-y-16 border-t border-gray-200 sm:mt-16 sm:pt-16">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between max-w-xl">
                <div className="flex items-center text-xs gap-x-4">
                  <time dateTime={post.date}>
                    {post.date}
                  </time>
                </div>
                <div className="relative group">
                  <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-300">
                    <Link href={`/blog/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const getStaticProps = async (): Promise<{
  props: { posts: BlogPostListElement[] };
}> => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};

export default Blog;