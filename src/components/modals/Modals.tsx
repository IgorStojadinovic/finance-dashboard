import {useState} from "react";
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
import {categoriesMenu, colorTags} from "../../lib/lits.ts";
import {useLocation} from "react-router";


const Modals = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("Entertainment");
    const [currentColor, setCurrentColor] = useState("green");
    const {pathname} = useLocation();

    const categories = categoriesMenu.filter(item => !item.name.toLowerCase().includes("all transactions"));

    const handleModalToggle = () => {
        setIsModalOpen(prev => !prev);
    };

    const ModalBackdrop = () => isModalOpen && <div className="fixed inset-0 bg-black/30 z-0"></div>;

    const CategoryMenu = () => (
        <Menu as="div" className="relative w-full">
            <div className="flex flex-col w-full gap-1 text-preset-5-bold text-grey-500">
                <p>Budget Category</p>
                <MenuButton
                    className="inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50 ">
                    <p>{currentCategory}</p>
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                </MenuButton>
            </div>
            <MenuItems
                className="absolute w-full max-h-[300px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-grey-white scrollbar-track-gray-50  ">
                <div className="py-1">
                    {categories.map(listItem => (
                        <MenuItem key={listItem.name}>
                            <li
                                onClick={() => setCurrentCategory(listItem.name)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {listItem.description}
                            </li>
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    );

    const ColorTagMenu = () => {
        const currentColorTag = colorTags.find(color => color.name.toLowerCase() === currentColor.toLowerCase());
        return (
            <Menu as="div" className="relative w-full">
                <div className="flex flex-col w-full gap-1 text-preset-5-bold text-grey-500">
                    <p>Color Tag</p>
                    <MenuButton
                        className="group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 ">
                        <div className="flex gap-2">
                            <div className="w-4 h-4 rounded-full"
                                 style={{background: currentColorTag?.hex || "#000"}}></div>
                            <p>{currentColor}</p>
                        </div>
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                    </MenuButton>
                </div>

                <MenuItems
                    className="absolute w-full max-h-[250px]  z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-grey-white scrollbar-track-gray-50  overflow-y-scroll">
                    <div
                        className="py-1   ">
                        {colorTags.map(color => (
                            <MenuItem key={color.name}>
                                <li
                                    onClick={() => setCurrentColor(color.name)}
                                    className="flex items-center gap-2 capitalize px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="w-4 h-4 rounded-full" style={{background: color.hex}}></div>
                                    {color.name}
                                </li>
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>
        );
    };

    const renderBudgetModal = () => (
        <Dialog open={isModalOpen} as="div" className="relative z-50 focus:outline-none" onClose={handleModalToggle}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        className="w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8">
                        <DialogTitle as="h3" className="text-preset-2 flex justify-between items-center">
                            Add New Budget
                            <XCircleIcon
                                className="size-8 cursor-pointer text-grey-500"
                                onClick={handleModalToggle}
                            />
                        </DialogTitle>
                        <p className="text-preset-4 text-grey-500">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                        </p>
                        <div className="flex flex-col gap-4">

                            <CategoryMenu/>

                            <Field className="flex flex-col gap-1 w-full">
                                <Label className="text-preset-5-bold text-grey-500">Maximum Spending</Label>
                                <div
                                    className="group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 ">
                                    <Input
                                        type="number"
                                        placeholder="$ e.g 2000"
                                        className="w-full py-[0.08rem] px-2 border-0 text-preset-5  items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </Field>

                            <ColorTagMenu/>

                        </div>
                        <div className="mt-4">
                            <Button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                                className="flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none">
                                Add Budget
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );

    const renderPotModal = () => <Dialog open={isModalOpen} as="div" className="relative z-50 focus:outline-none"
                                         onClose={handleModalToggle}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                    className="w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8">
                    <DialogTitle as="h3" className="text-preset-2 flex justify-between items-center">
                        Add New Pot
                        <XCircleIcon
                            className="size-8 cursor-pointer text-grey-500"
                            onClick={handleModalToggle}
                        />
                    </DialogTitle>
                    <p className="text-preset-4 text-grey-500">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    </p>
                    <div className="flex flex-col gap-4">
                        <Field className="flex flex-col gap-1 w-full">
                            <Label className="text-preset-5-bold text-grey-500">Pot Name</Label>
                            <div
                                className="group w-full flex py-2 px-5 items-center justify-between rounded-md ring-1 ring-gray-300 hover:bg-gray-50">
                                <Input
                                    type="text"
                                    placeholder="E.G Rainy Days"
                                    className="w-full py-1 px-2 border-0 text-preset-5  capitalize items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50"
                                />

                            </div>
                            <p className="text-preset-5 text-grey-300 self-end mt-1">0 of 30 characters left</p>
                        </Field>
                        <Field className="flex flex-col gap-1 w-full">
                            <Label className="text-preset-5-bold text-grey-500">Target</Label>
                            <div
                                className="group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 ">
                                <Input
                                    type="number"
                                    placeholder="$ e.g 2000"
                                    className="w-full py-[0.08rem] px-2 border-0 text-preset-5  items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </Field>
                        <ColorTagMenu/>

                    </div>
                    <div className="mt-4">
                        <Button
                            className="flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none">
                            Add Pot
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>;

    return (
        <>
            <ModalBackdrop/>
            {pathname === "/dashboard/budgets" ? renderBudgetModal() : renderPotModal()}
            <Button
                onClick={handleModalToggle}
                className="rounded-md text-preset-4-bold bg-grey-900 p-4 font-medium text-white"
            >
                {
                    pathname === "/dashboard/budgets" ? "Add New Budget" : "Add New Pot"
                }
            </Button>
        </>
    );
};

export default Modals;


