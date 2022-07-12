import Head from 'next/head'
import { client } from 'lib/sanity'
import { Post } from 'types/Post'
import dayjs from 'dayjs'
import { PortableText } from '@portabletext/react'

interface Props {
    post: Post
}

export default function PostPage({ post }: Props) {
    return (
        <div>
            <Head>
                <title>{post.title}</title>
            </Head>
            <h1>{post.title}</h1>
            <p>{dayjs(post.publishedAt).format("dddd DD.MM.YYYY")}</p>
            <PortableText value={post.body} />
        </div>
    )
}

export async function getStaticProps({ params }) {
    const posts = await client.fetch(
        `*[_type == "post" && slug.current == $slug] {
    _id,
    title,
    publishedAt,
    body,
    'slug': slug.current,
  }`,
        { slug: params.slug }
    )

    return {
        props: { post: posts[0] },
    }
}

export async function getStaticPaths() {
    const posts = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
    return {
        paths:
            posts?.map((post) => ({
                params: {
                    slug: post.slug,
                },
            })) || [],
        fallback: false,
    }
}