import { useRouter } from 'next/router'

function Post({ post={"id":0,"title":"",body:""}}) {
  const router = useRouter()



  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  )
}

export default Post

export async function getStaticProps(context: { params: any }) {  
  const { params } = context
  console.log(params);
  
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  )
  const data = await response.json()
  return {
    props: {
      post: data
    }
  }
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/`
  )
  const data = await response.json()
  const paths=data.map((post: { id: any }) =>{ //?
    return {
      params:{
        postId:`${post.id}`
      }
    }
  })
  return {
    paths,  
    // paths: [
    //   { params: { postId: '1' } },
    //   { params: { postId: '2' } },
    //   { params: { postId: '3' } }
    // ],
    fallback: true
  }
}