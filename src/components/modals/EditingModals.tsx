import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Field,
    Input,
    Label,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from "@headlessui/react";
import {XCircleIcon} from "@heroicons/react/24/outline";
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import {BudgetEntry, PotsArr, categoriesMenu, colorTags} from "../../lib/lits.ts";
import React, {useState} from "react";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";

import {useLocation} from "react-router-dom";

interface BudgetProps {
    budget?: BudgetEntry;
    pots?: PotsArr;

}


const EditingModals: React.FC<BudgetProps> = ({budget, pots}) => {

    const {pathname} = useLocation();


    const categoryName =
        pathname === "/dashboard/budgets"
            ? budget?.category ?? "" // Default fallback value
            : pots?.name ?? ""; // Default fallback value

    const target =
        pathname === "/dashboard/budgets"
            ? budget?.max ?? 0 // Default fallback value
            : pots?.target ?? 0; // Default fallback value

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(categoryName);
    const [currentColor, setCurrentColor] = useState("green");
    const [maxValue, setMaxValue] = useState(target);


    const categories = categoriesMenu.filter(item => !item.name.toLowerCase().includes("all transactions"));
    const currentColorTag = colorTags.filter(color => color.name.toLowerCase().includes(currentColor.toLowerCase()));
    const ModalBackdrop = () => (editModalOpen || deleteModalOpen) &&
        <div className="fixed inset-0 bg-black/30 z-0"></div>;

    const RenderEditBudgetModal = () => {
        return (<Dialog open={editModalOpen} as="div" className="relative z-10 focus:outline-none"
                        onClose={() => {
                            setEditModalOpen(false);
                        }}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-preset-2 flex justify-between items-center">
                            {pathname === "/dashboard/budgets" ? "Edit Budget" : "Edit Pots"}
                            <XCircleIcon className="size-8 cursor-pointer text-grey-500"
                                         onClick={() => {
                                             setEditModalOpen(false);
                                         }}/>
                        </DialogTitle>
                        <p className="text-preset-4 text-grey-500">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
                            Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
                        </p>
                        <div className="flex flex-col gap-4">
                            <Menu as="div" className="relative w-full">
                                <div
                                    className="flex flex-col w-full gap-1 text-preset-5-bold text-grey-500">
                                    <p>Budget Category</p>
                                    <MenuButton
                                        className="inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50 ">
                                        <p className="">{currentCategory}</p>
                                        <ChevronDownIcon aria-hidden="true"
                                                         className="-mr-1 size-5 text-gray-400"/>

                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute w-full max-h-[300px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {categories.map((listItem) => {
                                            return (
                                                <MenuItem key={listItem.name}>
                                                    <li
                                                        onClick={() => {
                                                            setCurrentCategory(listItem.name);
                                                        }}
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
                            <Field className="flex flex-col gap-1 w-full">
                                <Label className="text-preset-5-bold text-grey-500 ">Maximum Spending</Label>
                                <div
                                    className="group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 ">
                                    <p className="text-preset-4 text-grey-400">$</p>
                                    <Input
                                        onChange={(e) => {
                                            setMaxValue(e.target.value);
                                        }}
                                        type="number"
                                        placeholder="$ e.g 2000"
                                        className="w-full py-[0.08rem] px-2 border-0 text-preset-5  items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={maxValue}
                                    />
                                </div>
                            </Field>

                            <Menu as="div" className="relative w-full">
                                <div
                                    className="flex flex-col w-full gap-1 text-preset-5-bold text-grey-500">
                                    <p>Color tag</p>
                                    <MenuButton
                                        className="inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50 ">
                                        <div className="flex gap-2">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{background: currentColorTag[0].hex}}>

                                            </div>
                                            <p className="">{currentColor}</p>
                                        </div>
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute w-full max-h-[200px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {colorTags.map((color) => {
                                            return (
                                                <MenuItem key={color.name}>
                                                    <li
                                                        onClick={() => {
                                                            setCurrentColor(color.name);
                                                        }}
                                                        className="flex items-center gap-2 capitalize px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        <div
                                                            className="w-4 h-4 rounded-full"
                                                            style={{background: color.hex}}>

                                                        </div>
                                                        {color.name}
                                                    </li>
                                                </MenuItem>
                                            );
                                        })}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                        <div className="mt-4">
                            <Button
                                className="flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                onClick={() => {
                                    setEditModalOpen(false);
                                }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>);
    };


    const RenderDeleteModal = () => {
        return (<Dialog open={deleteModalOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {
            setDeleteModalOpen(false);
        }}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6  md:p-8 duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-preset-2 flex justify-between items-center capitalize">
                            {`Delete ${currentCategory}?`}
                            <XCircleIcon className="size-8 cursor-pointer text-grey-500"
                                         onClick={() => {
                                             setDeleteModalOpen(false);
                                         }}/>
                        </DialogTitle>
                        <p className="text-preset-4 text-grey-500">
                            Are you sure you want to delete this budget? This action cannot be reversed, and all the
                            data inside it will be removed forever.
                        </p>
                        <div className="mt-4 flex flex-col gap-2">
                            <Button
                                className="flex w-full justify-center items-center h-14 gap-2 rounded-md bg-red py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                onClick={() => {
                                    setDeleteModalOpen(false);
                                }}
                            >
                                Yes, Confirm Deletion
                            </Button>
                            <Button
                                className="flex w-full justify-center items-center h-14 gap-2 rounded-md bg-white py-1.5 px-4 text-preset-4 text-grey-500 focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white "
                                onClick={() => {
                                    setDeleteModalOpen(false);
                                }}
                            >
                                No, I want to go back
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>);
    };


    return (
        <>
            <ModalBackdrop/>
            <div className="w-52 text-right">
                <Menu as="div">
                    <MenuButton>
                        <EllipsisHorizontalIcon
                            className="size-8 text-grey-300 cursor-pointer"
                        />
                    </MenuButton>
                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-42 text-gray-900 ring-1 ring-grey-300 origin-top-right bg-white rounded-xl border border-white/5 shadow-md py-3 px-5 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <MenuItem>
                            <button
                                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                onClick={() => {
                                    setEditModalOpen(prevState => !prevState);
                                }}
                            >
                                {pathname === "/dashboard/budgets" ? "Edit Budget" : "Edit Pots"}
                            </button>
                        </MenuItem>
                        <div className="my-1 h-px bg-gray-100"/>
                        <MenuItem>
                            <button
                                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red"
                                onClick={() => {
                                    setDeleteModalOpen(prevState => !prevState);
                                }}
                            >
                                {pathname === "/dashboard/budgets" ? "Delete Budget" : "Delete Pots"}
                            </button>

                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
            {editModalOpen ? RenderEditBudgetModal() : RenderDeleteModal()}
        </>
    );
};

export default EditingModals;