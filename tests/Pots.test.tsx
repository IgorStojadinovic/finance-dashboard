import {describe, it, vi, expect} from "vitest";
import {render, screen, fireEvent, within} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Pots from "../src/pages/Pots";
import { userPots, PotsArr } from '../src/lib/lits';
import React from "react";
import { Input } from "@headlessui/react";

// Mock necessary components
vi.mock('../src/components/modals/Modals', () => ({
    default: () => <div data-testid="mocked-modals">Modals Component</div>
}));

vi.mock('../src/components/modals/EditingModals', () => ({
    default: () => <div data-testid="mocked-editing-modals">Editing Modals Component</div>
}));

// Mock AddAndWithdrawMoneyModal component to simulate real behavior
vi.mock('../src/components/modals/AddAndWithdrawMoneyModal', () => {
    return {
        default: ({ updateMoney, currentPot, addMoneyModalOpen, withdrawMoneyModalOpen, handleModalToggle }: { updateMoney: (potName: string, amount: number, isAddition: boolean) => void, currentPot: PotsArr, addMoneyModalOpen: boolean, withdrawMoneyModalOpen: boolean, handleModalToggle: () => void }) => {
            // Using useState to simulate inputValue inside the mock
            const [inputValue, setInputValue] = React.useState(400);
            
            // Simulating only the necessary parts of the component
            if (!addMoneyModalOpen && !withdrawMoneyModalOpen) return null;
            
            return (
                <div data-testid="money-modal">
                    {addMoneyModalOpen && (
                        <>
                            <h3 data-testid="modal-title">Add to '{currentPot.name}'</h3>
                            <fieldset className="money-input-container">
                                <Input
                                    data-testid="money-input"
                                    value={inputValue}
                                    type="number"
                                    placeholder="$ 400"
                                    onChange={(e) => setInputValue(Number(e.target.value))}
                                />
                            </fieldset>
                            <button 
                                data-testid="confirm-add-btn"
                                onClick={() => {
                                    updateMoney(currentPot.name, inputValue, true);
                                    handleModalToggle();
                                }}
                            >
                                Confirm Addition
                            </button>
                        </>
                    )}
                    
                    {withdrawMoneyModalOpen && (
                        <>
                            <h3 data-testid="modal-title">Withdraw from '{currentPot.name}'</h3>
                            <fieldset className="money-input-container">
                                <Input
                                    data-testid="money-input"
                                    value={inputValue}
                                    type="number"
                                    placeholder="$ 400"
                                    onChange={(e) => setInputValue(Number(e.target.value))}
                                />
                            </fieldset>
                            <button 
                                data-testid="confirm-withdraw-btn"
                                onClick={() => {
                                    updateMoney(currentPot.name, inputValue, false);
                                    handleModalToggle();
                                }}
                            >
                                Confirm Withdrawal
                            </button>
                        </>
                    )}
                </div>
            );
        }
    };
});

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe("Pots Page", () => {
    it("renders pots section with correct information", () => {
        renderWithRouter(<Pots />);

        // Check the title
        const potsPage = screen.getByTestId("pots-page");
        const potsTitle = screen.getByRole('heading', { name: /pots/i });
        expect(potsTitle).toBeInTheDocument();
        
        // Check the first pot (saving)
        const savingPotItem = screen.getByTestId("pot-item-saving");
        expect(savingPotItem).toBeInTheDocument();
        const savingName = within(savingPotItem).getByRole('heading', { name: /saving/i });
        const savingAmount = screen.getByTestId("pot-amount-saving");
        expect(savingAmount).toHaveTextContent("$159.00");
        expect(savingAmount).toHaveClass('text-preset-1', 'text-grey-900');
        
        // Check the second pot (concert ticket)
        const concertPotItem = screen.getByTestId("pot-item-concert-ticket");
        expect(concertPotItem).toBeInTheDocument();
        const concertName = within(concertPotItem).getByRole('heading', { name: /concert ticket/i });
        const concertAmount = screen.getByTestId("pot-amount-concert-ticket");
        expect(concertAmount).toHaveTextContent("$110.00");
        expect(concertAmount).toHaveClass('text-preset-1', 'text-grey-900');
    });
 
    it("renders modals component", () => {
        renderWithRouter(<Pots />);
        expect(screen.getByTestId("mocked-modals")).toBeInTheDocument();
    });

    it("renders editing modals components for each pot", () => {
        renderWithRouter(<Pots />);
        // Should have an editing modals component for each pot
        const editingModalsComponents = screen.getAllByTestId("mocked-editing-modals");
        expect(editingModalsComponents.length).toBe(userPots.length);
    });

    it("displays correct progress bar information", () => {
        renderWithRouter(<Pots />);
        
        // Check if each pot has a progress bar
        const pots = userPots;
        
        // For the first pot, check the progress bar
        const firstPotProgressBar = screen.getByTestId(`pot-progress-${pots[0].name.toLowerCase().replace(/\s+/g, '-')}`);
        expect(firstPotProgressBar).toBeInTheDocument();
        expect(firstPotProgressBar).toHaveAttribute('role', 'progressbar');
        expect(firstPotProgressBar).toHaveAttribute('aria-valuemin', '0');
        expect(firstPotProgressBar).toHaveAttribute('aria-valuemax', '100');
        
        // Verify that there is text with the target description
        const potItem = screen.getByTestId(`pot-item-${pots[0].name.toLowerCase().replace(/\s+/g, '-')}`);
        expect(within(potItem).getByText(`Total of ${pots[0].target}`)).toBeInTheDocument();
        
        // For the second pot, check the progress bar
        const secondPotProgressBar = screen.getByTestId(`pot-progress-${pots[1].name.toLowerCase().replace(/\s+/g, '-')}`);
        expect(secondPotProgressBar).toBeInTheDocument();
        expect(secondPotProgressBar).toHaveAttribute('role', 'progressbar');
        expect(secondPotProgressBar).toHaveAttribute('aria-valuemin', '0');
        expect(secondPotProgressBar).toHaveAttribute('aria-valuemax', '100');
        
        // Verify that there is text with the target description
        const secondPotItem = screen.getByTestId(`pot-item-${pots[1].name.toLowerCase().replace(/\s+/g, '-')}`);
        expect(within(secondPotItem).getByText(`Total of ${pots[1].target}`)).toBeInTheDocument();
    });

    it("updates pot money correctly", () => {
        renderWithRouter(<Pots />);

        // Find the first pot (saving) using data-testid attribute
        const savingPotItem = screen.getByTestId("pot-item-saving");
        
        // Find the amount using data-testid attribute
        const initialAmountElement = screen.getByTestId("pot-amount-saving");
        expect(initialAmountElement).toHaveTextContent("$159.00");
        
        // 1. Click on the add money button
        const addMoneyButton = screen.getByTestId("add-money-btn-saving");
        fireEvent.click(addMoneyButton);
        
        // 2. Verify that the modal is displayed
        const moneyModal = screen.getByTestId("add-money-modal-saving");
        expect(moneyModal).toBeInTheDocument();
      
        // 3. Enter an amount in the input field - using Input element with data-testid
        const moneyInput = screen.getByTestId("money-input-saving");
        fireEvent.change(moneyInput, { target: { value: "100" } });
     
        // 4. Click the confirm button in the modal
        const confirmAddButton = screen.getByTestId("confirm-add-btn-saving");
        fireEvent.click(confirmAddButton);
     
        // 5. Check the updated amount (159 + 100 = 259)
        expect(initialAmountElement).toHaveTextContent("$259");
       
        // 6. Repeat the process for withdrawing money
        const withdrawButton = screen.getByTestId("withdraw-btn-saving");
        fireEvent.click(withdrawButton); 
        
        // 7. Verify that the modal is displayed
        expect(screen.getByTestId("withdraw-money-modal-saving")).toBeInTheDocument();
      
        // 8. Enter an amount to withdraw
        const withdrawInput = screen.getByTestId("money-input-saving");
        fireEvent.change(withdrawInput, { target: { value: "50" } });
        
        // 9. Click the confirm withdrawal button
        const confirmWithdrawButton = screen.getByTestId("confirm-withdraw-btn-saving");
        fireEvent.click(confirmWithdrawButton);

        // 10. Check the updated amount (259 - 50 = 209)
        expect(initialAmountElement).toHaveTextContent("$209"); 
    }); 

    it("shows add and withdraw buttons for each pot", () => {
        renderWithRouter(<Pots />);
        
        // Use data-testid attributes to find all pot elements
        const potItems = userPots.map(pot => {
            const potId = pot.name.toLowerCase().replace(/\s+/g, '-');
            return {
                potItem: screen.getByTestId(`pot-item-${potId}`),
                potId
            };
        });
        
        // Check if each pot has buttons for adding and withdrawing money using data-testid
        potItems.forEach(({potItem, potId}) => {
            const addButton = screen.getByTestId(`add-money-btn-${potId}`);
            expect(addButton).toBeInTheDocument();
            expect(within(addButton).getByText(/\+ Add Money/i)).toBeInTheDocument();
            
            const withdrawButton = screen.getByTestId(`withdraw-btn-${potId}`);
            expect(withdrawButton).toBeInTheDocument();
            expect(within(withdrawButton).getByText(/Withdraw/i)).toBeInTheDocument();
        });
    }); 

});