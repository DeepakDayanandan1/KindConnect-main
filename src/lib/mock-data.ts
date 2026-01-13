
export const donors = [
    {
        id: "D001",
        name: "Alice Smith",
        email: "alice.smith@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Anytown, CA 90210, USA",
        totalDonations: 15,
        totalAmount: 3450.00,
        itemsDonated: 120,
        notes: "Donor is a repeat contributor with a strong preference for children's charities. Has previously offered volunteer time for large events.",
        donations: [
            { id: "DON001", welfareHome: "Hope Haven Shelter", amount: "$250.00 / Food, Clothes", date: "2023-11-20", status: "Delivered" },
            { id: "DON002", welfareHome: "Sunshine Elders Home", amount: "$500.00 / Medical Supplies", date: "2023-09-15", status: "Confirmed" },
            { id: "DON003", welfareHome: "Bright Futures Orphanage", amount: "$150.00 / Books, Toys", date: "2023-07-01", status: "Delivered" },
            { id: "DON004", welfareHome: "Hope Haven Shelter", amount: "$1,000.00 / Cash", date: "2023-05-10", status: "Confirmed" },
            { id: "DON005", welfareHome: "Sunshine Elders Home", amount: "$75.00 / Toiletries", date: "2023-03-22", status: "In Transit" },
            { id: "DON006", welfareHome: "Bright Futures Orphanage", amount: "$425.00 / School Supplies", date: "2023-01-05", status: "Delivered" },
        ]
    },
    {
        id: "D002",
        name: "Bob Jones",
        email: "bob.jones@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Springfield, IL 62704, USA",
        totalDonations: 8,
        totalAmount: 1200.50,
        itemsDonated: 45,
        notes: "Prefers to donate anonymously where possible.",
        donations: [
            { id: "DON007", welfareHome: "City Food Bank", amount: "$100.00 / Canned Goods", date: "2023-12-01", status: "Delivered" },
            { id: "DON008", welfareHome: "Veterans Support Group", amount: "$500.00 / Cash", date: "2023-10-15", status: "Confirmed" },
        ]
    }
];

export const ngos = [
    {
        id: "NGO001",
        name: "Hope Haven Shelter",
        contactPerson: "Sarah Connor",
        email: "contact@hopehaven.org",
        phone: "+1 (555) 555-0199",
        address: "789 Pine Ln, Shelterville, TX 75001, USA",
        status: "Verified",
        adminNotes: "verified after background check",
        documents: [
            { name: "Registration Cert", url: "#", type: "image" },
            { name: "Tax Exemption", url: "#", type: "pdf" }
        ],
        description: "Hope Haven Shelter provides temporary housing and support services for homeless families in the metro area. We focus on reintegration and job placement.",
        feedback: [
            { id: "F001", donor: "Raju Konni", date: "2023-12-02", message: "exceptional service- raju konni" },
            { id: "F002", donor: "Saju Kollam", date: "2023-08-12", message: "improvement in service quality is needed" },
        ],
        requirements: [
            { id: "R001", item: "Rice (50 kg bag)", cost: "₹ 1500.00 each", quantity: 1, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800", status: "Urgent", raised: 1200, target: 1500, category: "Food" },
            { id: "R002", item: "Lentils (10 kg bag)", cost: "₹ 750.00 each", quantity: 2, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?q=80&w=800", status: "Pending", raised: 250, target: 1500, category: "Food" },
            { id: "R003", item: "Cooking Oil (5L can)", cost: "₹ 900.00 each", quantity: 1, image: "https://images.unsplash.com/photo-1474979266404-7caddbed77a8?q=80&w=800", status: "Urgent", raised: 800, target: 900, category: "Essentials" },
        ],
        ordersHistory: [
            "1)adrija donated 5 kg rice on 12/12/25",
            "2)Mariyam donated rs. 500 on 11/12/25"
        ],
        activityHistory: [
            "1)NGO1 updated requirement of 5 kg rice on 12/12/25",
            "2)NGO1 updated number of members on 11/12/25"
        ]
    },
    {
        id: "NGO002",
        name: "Sunshine Elders Home",
        contactPerson: "James Cameron",
        email: "info@sunshineelders.org",
        phone: "+1 (555) 555-0200",
        address: "321 Elm St, Oldtown, FL 33101, USA",
        status: "Pending",
        adminNotes: "",
        documents: [],
        description: "Caring for the elderly with dignity and respect.",
        feedback: [],
        requirements: [
            { id: "R004", item: "Wheelchairs", cost: "₹ 4500.00 each", quantity: 2, image: "https://images.unsplash.com/photo-1579165466780-fa3b5cd354a4?q=80&w=800", status: "Urgent", raised: 3000, target: 9000, category: "Medical" },
            { id: "R005", item: "Adult Diapers (Pack)", cost: "₹ 800.00 each", quantity: 10, image: "https://images.unsplash.com/photo-1584308666744-24d1c47085c6?q=80&w=800", status: "Pending", raised: 1000, target: 8000, category: "Essentials" },
        ],
        ordersHistory: [],
        activityHistory: []
    }
];

export const verificationRequests = [
    {
        id: "REQ-001",
        ngoName: "Hope Haven Shelter",
        ngoId: "NGO001",
        status: "Pending",
        date: "2024-01-10",
        requirements: [
            {
                type: "Meal",
                details: {
                    dateRange: { from: "2025-11-21", to: "2025-11-25" },
                    slots: ["Breakfast", "Lunch"],
                    slotPrices: { "Breakfast": 40, "Lunch": 80, "Dinner": 80 },
                    dietaryRestrictions: "Vegetarian only"
                }
            }
        ],
        documents: [
            { type: "image", url: "#", name: "Kitchen Hygiene Cert" }
        ]
    },
    {
        id: "REQ-002",
        ngoName: "Sunshine Elders Home",
        ngoId: "NGO002",
        status: "Pending",
        date: "2024-01-09",
        requirements: [
            {
                type: "Grocery",
                items: [
                    { name: "Rice", quantity: "50kg", price: 2500 },
                    { name: "Lentils", quantity: "20kg", price: 1800 },
                    { name: "Cooking Oil", quantity: "15L", price: 2100 }
                ]
            }
        ],
        documents: []
    },
    {
        id: "REQ-003",
        ngoName: "Bright Futures Orphanage",
        ngoId: "NGO003",
        status: "Approved",
        date: "2024-01-08",
        requirements: [
            {
                type: "Fund",
                amount: 50000,
                purpose: "Emergency Roof Repair",
                description: "Urgent funds required for immediate repairs."
            }
        ],
        documents: [
            { type: "pdf", url: "#", name: "Contractor Quote" },
            { type: "image", url: "#", name: "Damaged Roof Photo" }
        ]
    },
    {
        id: "REQ-004", // Mixed Request
        ngoName: "Community Care Center",
        ngoId: "NGO004",
        status: "Rejected",
        date: "2024-01-05",
        requirements: [
            {
                type: "Meal",
                details: {
                    dateRange: { from: "2025-12-01", to: "2025-12-05" },
                    slots: ["Lunch"],
                    dietaryRestrictions: "None"
                }
            },
            {
                type: "Grocery",
                items: [
                    { name: "Wheat Flour", quantity: "100kg", price: 4000 },
                    { name: "Sugar", quantity: "20kg", price: 1000 }
                ]
            },
            {
                type: "Fund",
                amount: 15000,
                purpose: "Winter Clothes Drive",
                description: "Funds to buy blankets and jackets."
            }
        ],
        documents: [
            { type: "pdf", url: "#", name: "Event Propsal" }
        ]
    },
    {
        id: "REQ-005", // Student Sponsorship
        ngoName: "EduCare Foundation",
        ngoId: "NGO005",
        status: "Approved (Edited)",
        date: "2024-01-12",
        requirements: [
            {
                type: "StudentSponsorship",
                students: [
                    {
                        name: "Rohan Kumar",
                        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
                        description: "Rohan is a talented aspiring engineer who excels in mathematics. A donation can help cover his tuition fees.",
                        amount: 3000,
                        sponsorshipType: "Education"
                    },
                    {
                        name: "Priya Singh",
                        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                        description: "Priya has a passion for art and hopes to attend art school. Your contribution will enable her to purchase supplies.",
                        amount: 2000,
                        sponsorshipType: "Art Supplies"
                    }
                ]
            }
        ],
        documents: []
    }
];

export const recentDonations = [
    {
        id: "D-00123",
        donorName: "Alice Smith",
        donorId: "D-562345",
        welfareHome: "Sunshine Haven",
        welfareHomeId: "en-121234",
        particular: "meals",
        amount: 250.00,
        date: "2023-10-26",
        proofFromNgo: true,
        proofApproved: true,
        donorFeedback: "Given",
        feedbackToNgo: "Delivered",
        status: "Completed"
    },
    {
        id: "D-00124",
        donorName: "Bob Johnson",
        donorId: "D-54635",
        welfareHome: "Hope Foundation",
        welfareHomeId: "hf-98765",
        particular: "medical emergency",
        amount: 600.00,
        date: "2023-11-01",
        proofFromNgo: false,
        proofApproved: false,
        donorFeedback: "Pending",
        feedbackToNgo: "Pending",
        status: "In Progress"
    },
    {
        id: "D-00125",
        donorName: "Carol White",
        donorId: "D-99887",
        welfareHome: "Elderly Care",
        welfareHomeId: "ec-45678",
        particular: "sponsorship",
        amount: 150.00,
        date: "2023-11-05",
        proofFromNgo: true,
        proofApproved: true,
        donorFeedback: "Pending",
        feedbackToNgo: "In transit",
        status: "Active"
    },
    {
        id: "D-00126",
        donorName: "David Brown",
        donorId: "D-11223",
        welfareHome: "Sunshine Haven",
        welfareHomeId: "en-121234",
        particular: "groceries",
        amount: 300.00,
        date: "2023-11-06",
        proofFromNgo: true,
        proofApproved: true,
        donorFeedback: "Given",
        feedbackToNgo: "Delivered",
        status: "Completed"
    },
    {
        id: "D-00127",
        donorName: "Eva Green",
        donorId: "D-33445",
        welfareHome: "Hope Foundation",
        welfareHomeId: "hf-98765",
        particular: "education",
        amount: 500.00,
        date: "2023-11-07",
        proofFromNgo: false,
        proofApproved: false,
        donorFeedback: "Pending",
        feedbackToNgo: "Pending",
        status: "In Progress"
    },
    {
        id: "D-00128",
        donorName: "Frank Miller",
        donorId: "D-55667",
        welfareHome: "Elderly Care",
        welfareHomeId: "ec-45678",
        particular: "medicines",
        amount: 200.00,
        date: "2023-11-08",
        proofFromNgo: true,
        proofApproved: true,
        donorFeedback: "Pending",
        feedbackToNgo: "In transit",
        status: "Active"
    },
    {
        id: "D-00129",
        donorName: "Grace Wilson",
        donorId: "D-77889",
        welfareHome: "Sunshine Haven",
        welfareHomeId: "en-121234",
        particular: "clothes",
        amount: 100.00,
        date: "2023-11-09",
        proofFromNgo: true,
        proofApproved: false,
        donorFeedback: "Given",
        feedbackToNgo: "Processing",
        status: "In Progress"
    },
    {
        id: "D-00130",
        donorName: "Henry Davis",
        donorId: "D-99001",
        welfareHome: "Hope Foundation",
        welfareHomeId: "hf-98765",
        particular: "books",
        amount: 50.00,
        date: "2023-11-10",
        proofFromNgo: false,
        proofApproved: false,
        donorFeedback: "Pending",
        feedbackToNgo: "Pending",
        status: "Pending"
    },
    {
        id: "D-00131",
        donorName: "Ivy Thomas",
        donorId: "D-22334",
        welfareHome: "Elderly Care",
        welfareHomeId: "ec-45678",
        particular: "fund",
        amount: 1000.00,
        date: "2023-11-11",
        proofFromNgo: true,
        proofApproved: true,
        donorFeedback: "Given",
        feedbackToNgo: "Delivered",
        status: "Completed"
    },
    {
        id: "D-00132",
        donorName: "Jack Martin",
        donorId: "D-44556",
        welfareHome: "Sunshine Haven",
        welfareHomeId: "en-121234",
        particular: "meals",
        amount: 250.00,
        date: "2023-11-12",
        proofFromNgo: true,
        proofApproved: true,
        donorFeedback: "Given",
        feedbackToNgo: "Delivered",
        status: "Completed"
    }
];
