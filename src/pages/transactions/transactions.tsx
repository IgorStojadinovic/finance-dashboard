import IconCategory from "../../assets/images/icon-category.svg";
import IconSort from "../../assets/images/icon-sort.svg";
import AllTransactions from "../../lib/transactions.ts";
import {categoriesMenu, sortMenu} from "../../lib/lits.ts";
import TransactionList from "./transaction_list.tsx";
import React, {useState} from "react";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon,} from "@heroicons/react/20/solid";


const Transactions = () => {
    const [showSort, setShowSort] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [currentSort, setCurrentSort] = useState("latest");
    const [currentCategory, setCurrentCategory] = useState("all transactions");
    const [searchInput, setSearchInput] = useState("");


    const toggleSort = () => {
        setShowSort((prevState) => !prevState);
        setShowCategory(false);
    };

    const toggleCategory = () => {
        setShowCategory((prevState) => !prevState);
        setShowSort(false);
    };

    const setSort = (name: string) => {
        setCurrentSort(name);
        setShowSort((prevState) => !prevState);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    return (

        <div className="bg-beige-100 px-4 py-6 flex md:h-screen w-full flex-col gap-8 xl:gap-2 md:px-10 md:py-8">
            <h1 className="text-preset-1">Transactions</h1>
            <div className="bg-white rounded-lg px-5 py-6 flex flex-1 flex-col gap-6">
                <div className="flex items-center  justify-between gap-6 relative">
                    <input type="text"
                           placeholder="Transactions"
                           className="rounded-md ring-1 w-4/3  border-0 p-0 px-3 py-2 shadow-sm ring-gray-300 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring-gray-300 "
                           onChange={(e) => handleSearch(e)}
                    />
                    <div className=" h-full flex gap-6 justify-end items-center">
                        {/*--------------------------------------SORT MENU--------------------------------------------------*/}
                        <Menu as="div" className="relative inline-block text-left">
                            <div className="flex items-center gap-3 text-preset-5 text-grey-500">
                                <p className="hidden md:block">Sort by</p>
                                <MenuButton
                                    className="inline-flex md:min-w-[100px] h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white md:px-3 md:py-2 text-sm font-semibold text-gray-900 md:shadow-sm md:ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                                    <p className="hidden md:flex">{currentSort}</p>
                                    <ChevronDownIcon aria-hidden="true"
                                                     className="-mr-1 size-5 text-gray-400 hidden md:flex"/>
                                    <img
                                        src={IconSort}
                                        onClick={() => toggleSort()}
                                        className="h-6 w-6 md:hidden"
                                        alt="Icon Sort"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {sortMenu.map((listItem) => {
                                        return (
                                            <MenuItem key={listItem.name}>
                                                <li
                                                    onClick={() => setSort(listItem.name)}
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                >
                                                    {listItem.description}
                                                </li>
                                            </MenuItem>
                                        );
                                    })}
                                </div>
                            </MenuItems>
                        </Menu>
                        {/*--------------------------------------CATEGORY MENU--------------------------------------------------*/}
                        <Menu as="div" className="relative inline-block text-left">
                            <div className="flex items-center gap-3 text-preset-5 text-grey-500">
                                <p className="hidden md:block">Category</p>
                                <MenuButton
                                    className="inline-flex md:min-w-[155px] h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white md:px-3 md:py-2 text-sm font-semibold text-gray-900 md:shadow-sm md:ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                                    <p className="hidden md:flex">{currentCategory}</p>
                                    <ChevronDownIcon aria-hidden="true"
                                                     className="-mr-1 size-5 text-gray-400 hidden md:flex"/>
                                    <img
                                        src={IconCategory}
                                        onClick={() => toggleCategory()}
                                        className="h-6 w-6 md:hidden"
                                        alt="Icon Category"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {categoriesMenu.map((listItem) => {
                                        return (
                                            <MenuItem key={listItem.name}>
                                                <li
                                                    onClick={() => setCurrentSort(listItem.name)}

                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                >
                                                    {listItem.description}
                                                </li>
                                            </MenuItem>
                                        );
                                    })}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <TransactionList
                    transactions={AllTransactions}
                    sortBy={currentSort}
                    searchFor={searchInput}
                />
            </div>
        </div>);
};

export default Transactions;
