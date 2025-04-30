import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './pages/home/Home';
import Transactions from './pages/transactions/Transactions';
import Budget from './pages/budget/Budget';
import Pots from './pages/ports/Pots';
import RecurringBills from './pages/recurring/Recurring';
import Layout from './layout';
import { ProtectedRoute } from './auth/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minuta
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard/' element={<Layout />}>
          <Route
            index
            element={<Navigate to='/dashboard/overview' replace />}
          />
          <Route path='overview' element={<Home />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='budgets' element={<Budget />} />
          <Route path='pots' element={<Pots />} />
          <Route path='recurring' element={<RecurringBills />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
