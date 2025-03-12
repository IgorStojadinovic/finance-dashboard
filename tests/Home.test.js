import React from "react";
import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "./Home";

describe("Home Page", () => {
    it("should render the Overview section", () => {
        render(
            <Router>
                <Home/>
            </Router>
        );

        // Check if the heading Overview is present
        const heading = screen.getByText(/Overview/i);
        expect(heading).toBeInTheDocument();
    });


    it("should render 'Current Balance', 'Income', and 'Expenses' sections", () => {
        render(
            <Router>
                <Home/>
            </Router>
        );

        // Check for sections
        const balanceSection = screen.getByText(/Current Balance/i);
        const incomeSection = screen.getByText(/Income/i);
        const expensesSection = screen.getByText(/Expenses/i);

        expect(balanceSection).toBeInTheDocument();
        expect(incomeSection).toBeInTheDocument();
        expect(expensesSection).toBeInTheDocument();
    });

    it("should render the 'Pots' section with 'See details' link", () => {
        render(
            <Router>
                <Home/>
            </Router>
        );

        // Get all elements with 'See details'
        const seeDetailsLinks = screen.getAllByText(/see details/i);

        // Select the correct one based on its href or parent structure
        const potsDetailsLink = seeDetailsLinks.find(link =>
            (link.closest("a")?.getAttribute("href") === "/dashboard/pots")
        );

        expect(potsDetailsLink).toBeInTheDocument();
    });
});