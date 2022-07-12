import type { NextPage } from 'next'
import { client } from 'lib/sanity'
import { Post } from "../types/Post"
import dayjs from 'dayjs'
import Link from 'next/link'

type Props = {
  posts: Post[]
}

const Home: NextPage<Props> = ({posts}) => {
  console.log(posts)
  const postsRender = posts.map(post => {
    return (
      <Link key={post._id} as={`/posts/${post.slug}`} href="/posts/[slug]">
        <a key={post._id}>
          <h1>{post.title}</h1>
          <p>{dayjs(post.publishedAt).format("DD.MM.YYYY HH:mm")}</p>
        </a>
      </Link>
    )
  })
  return (
    <>
     <div className='container'>Antin blogi</div>
    {postsRender}
    </>
  )
}

export default Home

export async function getStaticProps() {
  const posts =
    await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    publishedAt,
    'slug': slug.current,
  }`)

  return {
    props: { posts },
  }
}