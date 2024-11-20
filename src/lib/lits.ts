type MenuArr = {
    name: string,
    description: string,
}

const sortMenu: MenuArr[] = [
    {
        name: "latest",
        description: "Latest"
    },
    {
        name: "oldest",
        description: "Oldest"
    },
    {
        name: "a-z",
        description: "A to Z"
    },
    {
        name: "z-a",
        description: "Z to A"
    },
    {
        name: "highest",
        description: "Highest"
    },
    {
        name: "lowest",
        description: "Lowest"
    }
];

const categoriesMenu: MenuArr[] = [
    {
        name: "all transactions",
        description: "All Transactions"
    },
    {
        name: "entertainment",
        description: "Entertainment"
    },
    {
        name: "bills",
        description: "Bills"
    },
    {
        name: "groceries",
        description: "Groceries"
    },
    {
        name: "transportation",
        description: "Transportation"
    },
];

export {sortMenu, categoriesMenu};