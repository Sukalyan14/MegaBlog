import React , { useState , useEffect } from 'react'
import { Container , PostCard } from '../components'
import service  from '../appwrite/config'
function AllPost() {
    const [posts , setPosts] = useState([])
    useEffect(() => {
        service.getPosts()
        .then((posts) => {
            if(posts) setPosts(posts.documents)
        })
        .catch((error) => {
            console.log(error)
        })
    } , [])
    
  return (
    <div className='w=full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1'>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost