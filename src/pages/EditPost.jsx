import React , { useState , useEffect} from 'react'
import { Container , PostForm } from '../components'
import service from '../appwrite/config'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EditPost() {
    const [posts , setPosts] = useState([])
    const slug = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            service.getPost(slug)
                .then((post) => {
                    if(post) {
                        setPosts(post)
                    }
                })
        } else {
            navigate('/')
        }
    } , [slug , navigate])

  return posts ? (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  ) : null
}

export default EditPost