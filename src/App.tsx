import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Posts from './pages/Posts';
import RecurringBills from './pages/RecurringBills';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/transactions',
        element: <Transactions />,
    },
    {
        path: '/budgets',
        element: <Budget />,
    },
    {
        path: '/posts',
        element: <Posts />,
    },
    {
        path: '/recurring',
        element: <RecurringBills />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
