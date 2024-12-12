import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Signup from "./pages/auth/Signup.tsx";
import Home from "./pages/Home.tsx";
import Transactions from "./pages/transactions/transactions.tsx";
import Budget from "./pages/budget/Budget.tsx";
import Pots from "./pages/Pots.tsx";
import RecurringBills from "./pages/Recurring.tsx";
import Layout from "./pages/layout.tsx";

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
