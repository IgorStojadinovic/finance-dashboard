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
        name: "dining out",
        description: "Dining Out"
    },
    {
        name: "transportation",
        description: "Transportation"
    },
    {
        name: "personal care",
        description: "Personal Care"
    },
    {
        name: "education",
        description: "Education"
    },
    {
        name: "lifestyle",
        description: "Lifestyle"
    },
    {
        name: "shopping",
        description: "Shopping"
    },
    {
        name: "general",
        description: "General"
    }
];

type BudgetsArr = {
    category: string,
    spent: string,
    totalBudget: string,
    color: string
}

const budgetStatus: BudgetsArr[] = [
    {
        category: "bills",
        spent: "$250.00",
        totalBudget: "$750.00",
        color: "#82C9D7"
    },
    {
        category: "dining out",
        spent: "$67.00",
        totalBudget: "$75.00",
        color: "#F2CDAC"
    },
    {
        category: "personal care",
        spent: "$65.00",
        totalBudget: "$100.00",
        color: "#626070"
    },
    {
        category: "entertainment",
        spent: "$65.00",
        totalBudget: "$100.00",
        color: "#277C78"
    }
];
type BudgetEntry = {
    category: string;
    hex: string;
    max: string;
    spent: string;
    free: string;
    bar: string;
    latest: {
        name: string;
        price: string;
        date: string;
    }[];
};

const userBudget: BudgetEntry[] = [
    {
        category: "entertainment",
        hex: "#277C78",
        max: "50",
        spent: "25",
        free: "50",
        bar: "50%",
        latest: [
            {
                name: "papa software",
                price: "-$10.00",
                date: "16 Aug 2024"
            },
            {
                name: "quebec services",
                price: "-$5.00",
                date: "12 Aug 2024"
            },
            {
                name: "romeo cloud service",
                price: "-$10.00",
                date: "05 Aug 2024"
            }
        ]
    },
    {
        category: "bills",
        hex: "#82C9D7",
        max: "750",
        spent: "250",
        free: "750",
        bar: "33%",
        latest: [
            {
                name: "charlies electric company",
                price: "-$100.00",
                date: "01 Aug 2024"
            },
            {
                name: "foxtrot waterline",
                price: "-$105.00",
                date: "01 Aug 2024"
            },
            {
                name: "tango gas company",
                price: "-$50.00",
                date: "01 Aug 2024"
            }
        ]
    },
    {
        category: "dining out",
        hex: "#F2CDAC",
        max: "75",
        spent: "67",
        free: "8",
        bar: "89%",
        latest: [
            {
                name: "lima dining house",
                price: "-$30.00",
                date: "21 Aug 2024"
            },
            {
                name: "yuna kim",
                price: "-$21.50",
                date: "20 Aug 2024"
            },
            {
                name: "juliet restaurant",
                price: "-$15.50",
                date: "12 Aug 2024"
            }
        ]
    },
    {
        category: "personal care",
        hex: "#626070",
        max: "100",
        spent: "65",
        free: "35",
        bar: "49%",
        latest: [
            {
                name: "bravo zen spa",
                price: "-$25.00",
                date: "29 Aug 2024"
            },
            {
                name: "sofia peterson",
                price: "-$15.00",
                date: "15 Aug 2024"
            },
            {
                name: "bravo zen spa",
                price: "-$25.00",
                date: "13 Aug 2024"
            }
        ]
    }
];


type ColorsArr = {
    name: string,
    hex: string,
}
const colorTags: ColorsArr [] = [
    {
        name: "green",
        hex: "#277C78"
    },
    {
        name: "yellow",
        hex: "#F2CDAC"
    },
    {
        name: "cyan",
        hex: "#82C9D7"
    },
    {
        name: "navy",
        hex: "#626070"
    },
    {
        name: "red",
        hex: "#C94736"
    },
    {
        name: "purple",
        hex: "#826CB0"
    },
    {
        name: "light-purple",
        hex: "#AF81BA"
    },
    {
        name: "turquoise",
        hex: "#597C7C"
    },
    {
        name: "brown",
        hex: "#93674F"
    },
    {
        name: "magenta",
        hex: "#934F6F"
    },
    {
        name: "blue",
        hex: "#3F82B2"
    },
    {
        name: "navy-grey",
        hex: "#97A0AC"
    },
    {
        name: "army-green",
        hex: "#7F9161"
    },
    {
        name: "gold",
        hex: "#CAB361"
    },
    {
        name: "orange",
        hex: "#BE6C49"
    }
];


export {sortMenu, categoriesMenu, colorTags, budgetStatus, userBudget};