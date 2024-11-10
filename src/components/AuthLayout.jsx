import React , {useEffect , useState} from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children , authentication = true}) {

    const navigete = useNavigate()
    const [loader , setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigete("/login")
        } else if(!authentication && authStatus !== authentication){
            navigete("/")
        }
        setLoader(false)
    } , [authStatus , navigete , authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}