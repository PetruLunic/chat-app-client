import {
    createBrowserRouter
} from "react-router-dom";
import HomePage from "../pages/Home";
import AuthLayout from "../components/AuthLayout";
import ChatContainer from "../components/Chat/ChatContainer";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";

export const routes = createBrowserRouter([
    {
        path: '',
        element: <AuthLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>,
                children: [
                    {
                        path: '/:id',
                        element: <ChatContainer/>
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <LogIn/>
    },
    {
        path: '/register',
        element: <Register/>
    }
])