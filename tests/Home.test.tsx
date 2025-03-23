import { describe, it, vi, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/components/pages/home/Home';

// Mock Chart component
vi.mock('../src/components/Chart', () => ({
  default: () => <div data-testid='mocked-chart'>Chart Component</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home Page', () => {
  it('renders overview section with correct balances', () => {
    renderWithRouter(<Home />);

    // Use ID from aria-labelledby to find elements
    expect(
      screen.getByRole('heading', { name: /overview/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('current-balance-amount')).toHaveTextContent(
      '$4,860.00'
    );
    expect(screen.getByTestId('income-amount')).toHaveTextContent('$3,814.25');
    expect(screen.getByTestId('expenses-amount')).toHaveTextContent(
      '$1,700.50'
    );
  });

  it('renders chart component', () => {
    renderWithRouter(<Home />);
    expect(screen.getByTestId('mocked-chart')).toBeInTheDocument();
  });

  it('renders pots section with correct styling', () => {
    renderWithRouter(<Home />);

    // Use data-testid to find the section
    const potsSection = screen.getByTestId('pots-section');
    expect(potsSection).toHaveClass('bg-white', 'rounded-lg');

    // Find element within the article containing "Savings" text
    const savingsItem = screen.getByText('Savings').closest('li');
    const savingsBar = savingsItem?.querySelector('.bg-cayan'); // Directly find element with class
    expect(savingsBar).toHaveClass('bg-cayan');
  });

  it('renders recurring bills section with correct information', () => {
    renderWithRouter(<Home />);

    // Use data-testid to find the section
    const recurringBillsSection = screen.getByTestId('recurring-bills-section');
    expect(recurringBillsSection).toBeInTheDocument();

    // Find link to details
    const seeDetailsLink = within(recurringBillsSection).getByText(
      'see details'
    );
    expect(seeDetailsLink).toBeInTheDocument();
    expect(seeDetailsLink).toHaveAttribute('href', '/dashboard/recurring');

    // Check content and data-testid attributes
    expect(screen.getByText('paid bills')).toBeInTheDocument();
    expect(screen.getByTestId('paid-bills-amount')).toHaveTextContent('$190');

    expect(screen.getByText('total upcoming')).toBeInTheDocument();
    expect(screen.getByTestId('upcoming-bills-amount')).toHaveTextContent(
      '$194.89'
    );

    expect(screen.getByText('due soon')).toBeInTheDocument();
    expect(screen.getByTestId('due-soon-amount')).toHaveTextContent('$50.98');

    // Check styles of li elements
    const paidBillsItem = screen.getByText('paid bills').closest('li');
    expect(paidBillsItem).toHaveClass('border-l-green');

    const upcomingItem = screen.getByText('total upcoming').closest('li');
    expect(upcomingItem).toHaveClass('border-l-yellow');

    const dueSoonItem = screen.getByText('due soon').closest('li');
    expect(dueSoonItem).toHaveClass('border-l-cayan');
  });

  it('renders pots section with savings information', () => {
    renderWithRouter(<Home />);

    // Check headings and amounts using testid
    expect(screen.getByRole('heading', { name: /pots/i })).toBeInTheDocument();
    expect(screen.getByText('Total Saved')).toBeInTheDocument();
    expect(screen.getByTestId('total-saved-amount')).toHaveTextContent('$850');

    // Use testid for specific amounts
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByTestId('savings-amount')).toHaveTextContent('$159');
    expect(screen.getByText('Gift')).toBeInTheDocument();
    expect(screen.getByTestId('gift-amount')).toHaveTextContent('$40');
    expect(screen.getByTestId('concert-ticket-amount')).toHaveTextContent(
      '$110'
    );
    expect(screen.getByTestId('new-laptop-amount')).toHaveTextContent('$10');
  });

  it('renders transactions section with links', () => {
    renderWithRouter(<Home />);

    // Find transactions section
    const transactionsSection = screen.getByTestId('transactions-section');

    // Check link
    const viewAllLink = within(transactionsSection).getByText('view all');
    expect(viewAllLink).toHaveAttribute('href', '/dashboard/transactions');

    // Check all profile images
    const userImages = screen.getAllByRole('img', {
      name: /profile$/i, // Using regex to find all profile images
    });

    expect(userImages.length).toBeGreaterThan(0);
    userImages.forEach(img => {
      expect(img).toHaveClass('rounded-full');
    });

    // Check aria labels for transactions list
    const transactionsList = within(transactionsSection).getByRole('list');
    expect(transactionsList).toHaveAttribute(
      'aria-label',
      'Recent transactions'
    );
  });

  it('verifies accessibility attributes', () => {
    renderWithRouter(<Home />);

    // Check if main element has necessary attributes
    const mainElement = screen.getByTestId('home-page');
    expect(mainElement).toHaveAttribute('role', 'main');

    // Check if heading sections have proper aria-labelledby attributes
    const overviewSection = screen.getByTestId('overview-section');
    expect(overviewSection).toBeInTheDocument();

    const potsSection = screen.getByTestId('pots-section');
    expect(potsSection).toBeInTheDocument();

    // Check if lists have aria-label
    const savingsBreakdown = screen.getByTestId('transactions-section');
    expect(savingsBreakdown).toBeInTheDocument();

    const billsSummary = screen.getByTestId('budgets-section');
    expect(billsSummary).toBeInTheDocument();
  });
});
