import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Pots from './pages/pots';
import RecurringBills from './pages/recurring_bills';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/overview',
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
        path: '/pots',
        element: <Pots />,
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
