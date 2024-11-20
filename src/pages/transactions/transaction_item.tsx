import React from "react";
import {TransactionsOBJ} from "../../lib/transactions.ts";
import {clsx} from "clsx";

interface TransactionItemProps {
    transaction: TransactionsOBJ;
}

const TransactionItem: React.FC<TransactionItemProps> = ({transaction}) => {
    const mobile = (
        <ul className="flex justify-between">
            <li className="flex items-center gap-6">
                <img
                    src={transaction.icon}
                    alt={transaction.name}
                    className="rounded-full h-8 w-8"
                />
                <div className="flex flex-col ">
                    <p className="text-preset-4-bold capitalize">{transaction.name}</p>
                    <p className="text-preset-4 text-grey-500">{transaction.category}</p>
                </div>
            </li>
            <li className="">
                <p className={clsx("text-preset-4-bold md:hidden", {
                    "text-green": transaction.amount.includes("+"),
                })}>
                    {transaction.amount}
                </p>                <p
                className="text-preset-4 text-grey-500 md:flex justify-center">{transaction.date}</p>
            </li>
        </ul>
    );

    const largerScreens = (
        <ul className="flex justify-between items-center w-full text-center">
            <li className="flex items-center gap-6 w-2/4 ">
                <img
                    src={transaction.icon}
                    alt={transaction.name}
                    className="rounded-full h-8 w-8"
                />
                <p className="text-preset-4-bold capitalize">{transaction.name}</p>
            </li>
            <li className="w-1/4">
                <p className="text-preset-4 text-grey-500">{transaction.category}</p>
            </li>
            <li className="w-1/4">
                <p className="text-preset-4 text-grey-500 md:flex justify-center">{transaction.date}</p>
            </li>
            <li className="w-1/4">
                <p className={clsx("text-preset-4-bold", {
                    "text-green": transaction.amount.includes("+"),
                })}>
                    {transaction.amount}
                </p>
            </li>
        </ul>
    );

    return (
        <>
            <div className="md:hidden">
                {mobile}
            </div>
            <div className="hidden md:flex">
                {largerScreens}
            </div>

            {/*
        <ul className="flex gap-3 items-center justify-between">
            <li className="md:hidden flex items-center gap-6">
                <img
                    src={transaction.icon}
                    alt={transaction.name}
                    className="rounded-full h-8 w-8"
                />
                <div className="flex flex-col ">
                    <p className="text-preset-4-bold capitalize">{transaction.name}</p>
                    <p className="text-preset-4 text-grey-500">{transaction.category}</p>
                </div>

            </li>
            <li className="md:w-1/4 hidden md:flex items-center gap-4">
                <img
                    src={transaction.icon}
                    alt={transaction.name}
                    className="rounded-full h-8 w-8"
                />
                <p className="text-preset-4-bold capitalize">{transaction.name}</p>
            </li>
            <li className="md:w-1/4 hidden  md:hidden">
                <p className="text-preset-4-bold capitalize">{transaction.name}</p>
                <p className="text-preset-4 text-grey-500">{transaction.category}</p>
            </li>
            <li className="md:w-1/4">
                <p className="text-preset-4 text-grey-500 md:flex hidden justify-center">{transaction.category}</p>
            </li>
            <li className="md:w-1/4">
                <p className="text-preset-4-bold md:hidden">{transaction.amount}</p>
                <p className="text-preset-4 text-grey-500 md:flex justify-center">{transaction.date}</p>
            </li>
            <li className="md:w-1/4">
                <p className="text-preset-4-bold md:flex justify-center hidden">{transaction.amount}</p>
            </li>
        </ul>
        */}
        </>

    );
};

export default TransactionItem;