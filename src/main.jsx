import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import Home from './pages/Home.jsx'
import Protected from './components/AuthLayout.jsx'
import Signup from './components/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/login",
        element:(
          <Protected authentication={false}>
            <Login />
          </Protected>
        ), //() is just a wrapper for the 
      },
      {
        path:"/signup",
        element:(
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        ), 
      },
      {
        path:"/all-posts",
        element:(
          <Protected authentication>
            {" "} {/*The {" "} is used to add a space between the <Protected> component and the <AddPost> component. This is sometimes necessary to ensure proper rendering and layout of the components. */}
            <AddPost/>
          </Protected>
        ), 
      },
      {
        path:"/edit-post/:slug",
        element:(
          <Protected authentication>
            {" "} 
            <EditPost />
          </Protected>
        ), 
      },
      {
        path:"/posts/:slug",
        element:(
          <Protected authentication>
            {" "} 
            <Post />
          </Protected>
        ), 
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
