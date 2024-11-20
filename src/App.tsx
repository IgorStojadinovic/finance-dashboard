import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/signup.tsx";
import Home from "./pages/Home";
import Transactions from "./pages/transactions/transactions.tsx";
import Budget from "./pages/Budget";
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
