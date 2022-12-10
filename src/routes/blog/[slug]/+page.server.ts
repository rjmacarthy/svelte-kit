import { error } from '@sveltejs/kit';

export const load = async ({ params }: { params: { slug: string } }) => {
  const post: Promise<{ title: string; body: string }> = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`
  ).then((res) => res.json());

  if (post) {
    return post;
  }

  throw error(404, 'Not found');
};
