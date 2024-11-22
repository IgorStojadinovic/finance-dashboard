import React, {useMemo, useState} from "react";
import {TransactionsOBJ} from "../../lib/transactions.ts";
import TransactionItem from "./transaction_item.tsx";
import Pagination from "../../lib/pagination/Pagination.tsx";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";

interface TransactionListProps {
    transactions: TransactionsOBJ[];
    sortBy: string;
    sortByCategory: string;
    searchFor: string;
    setInputDisabled: (isDisabled: boolean) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
                                                             transactions,
                                                             sortBy,
                                                             sortByCategory,
                                                             searchFor,
                                                             setInputDisabled
                                                         }): React.JSX.Element => {
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 9;

    if (currentPage > 1) {
        setInputDisabled(true);
    } else {
        setInputDisabled(false);
    }

    const filteredAndSortedTransactions: TransactionsOBJ[] = useMemo(() => {
        let filtered = transactions.filter((obj) =>
            obj.name.toLowerCase().includes(searchFor.toLowerCase())
        );

        if (sortByCategory !== "all transactions") {
            filtered = filtered.filter((transaction) => transaction.category === sortByCategory);
        }

        switch (sortBy) {
            case "latest":
                return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            case "oldest":
                return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            case "a-z":
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            case "z-a":
                return filtered.sort((a, b) => b.name.localeCompare(a.name));
            case "highest":
                return filtered.sort((a, b) => b.usd - a.usd);
            case "lowest":
                return filtered.sort((a, b) => a.usd - b.usd);
            default:
                return filtered;
        }
    }, [transactions, searchFor, sortBy, sortByCategory]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredAndSortedTransactions.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredAndSortedTransactions]);

    return (
        <>
            <div className="pt-6 flex flex-1 flex-col h-full justify-between gap-6 xl:hidden md:hidden">
                <div>
                    {currentTableData.map((transaction, index) => (
                        <React.Fragment key={transaction.id}>
                            <TransactionItem key={transaction.id} transaction={transaction}/>
                            {index !== currentTableData.length - 1 && (
                                <div className="py-4">
                                    <div className="w-full h-[1px] bg-grey-100"></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="w-full justify-center hidden md:flex md:flex-1">
                <div className="w-full">
                    <TabGroup>
                        <TabList className="flex justify-between my-6 text-preset-5 text-grey-500">
                            <Tab className="w-2/4 text-left capitalize">recipient/sender</Tab>
                            <Tab className="w-1/4 capitalize">category</Tab>
                            <Tab className="w-1/4 capitalize">transaction date</Tab>
                            <Tab className="w-1/4 capitalize">amount</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {currentTableData.map((transaction, index) => (
                                    <React.Fragment key={transaction.id}>
                                        <TransactionItem key={transaction.id} transaction={transaction}/>
                                        {index !== currentTableData.length - 1 && (
                                            <div className="py-4">
                                                <div className="w-full h-[1px] bg-grey-100"></div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={filteredAndSortedTransactions.length}
                pageSize={PageSize}
                siblingCount={1}
                onPageChange={(page: number) => setCurrentPage(page)}
            />
        </>
    );
};

export default TransactionList;