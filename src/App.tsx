import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Login from "./pages/auth/login.tsx";
import Signup from "./pages/auth/signup";
import Home from "./pages/home";
import Transactions from "./pages/transactions/transactions.tsx";
import Budget from "./pages/budget.tsx";
import Pots from "./pages/pots";
import RecurringBills from "./pages/recurring_bills";
import Layout from "./pages/layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={<Login/>}
            />
            <Route
                path="/signup"
                element={<Signup/>}
            />
            <Route
                path="/dashboard"
                element={<Layout/>}
            >
                <Route
                    path="overview"
                    element={<Home/>}
                />
                <Route
                    path="transactions"
                    element={<Transactions/>}
                />
                <Route
                    path="budgets"
                    element={<Budget/>}
                />
                <Route
                    path="pots"
                    element={<Pots/>}
                />
                <Route
                    path="recurring"
                    element={<RecurringBills/>}
                />
            </Route>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router}/>;
};

export default App;
