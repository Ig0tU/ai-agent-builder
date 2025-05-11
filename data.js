const aiIdeas = [
    {
        id: 1,
        title: "Become an AI-assisted content creator on YouTube, TikTok, Instagram, etc.",
        category: "Content Creation and Editing",
        howToStart: "Use AI tools to ideate, script, edit and optimize your content, and monetize through ads, sponsorships, etc.",
        checklistItems: [
            "Research AI content creation tools",
            "Set up social media accounts",
            "Create content strategy",
            "Learn AI-powered editing tools",
            "Build audience engagement plan"
        ]
    },
    {
        id: 2,
        title: "Build AI-enhanced data entry and document processing automation tools",
        category: "Productivity and Project Management",
        howToStart: "Leverage AI to extract data from forms and documents, sell to businesses looking to automate back-office tasks.",
        checklistItems: [
            "Research OCR technologies",
            "Study document processing APIs",
            "Design automation workflows",
            "Build MVP prototype",
            "Test with sample documents"
        ]
    },
    {
        id: 3,
        title: "Build AI-enhanced email marketing platforms with personalization and optimization",
        category: "Marketing and Advertising",
        howToStart: "Apply AI to email campaign creation, targeting, testing, analytics and sell to digital marketers.",
        checklistItems: [
            "Study email marketing best practices",
            "Research AI personalization techniques",
            "Design email templates",
            "Implement A/B testing",
            "Build analytics dashboard"
        ]
    },
    {
        id: 4,
        title: "Build AI-enhanced language learning chatbots for conversational practice",
        category: "Education and Training",
        howToStart: "Leverage AI to provide immersive language conversation practice, sell to language learners.",
        checklistItems: [
            "Research NLP technologies",
            "Design conversation flows",
            "Build chatbot prototype",
            "Test with language learners",
            "Implement feedback system"
        ]
    },
    {
        id: 5,
        title: "Build AI-powered personal finance apps for budgeting, saving, investing",
        category: "Finance and Investing",
        howToStart: "Leverage AI to build smart money management apps and monetize through premium features or partnerships.",
        checklistItems: [
            "Study financial APIs",
            "Design budgeting algorithms",
            "Build expense tracking",
            "Implement AI insights",
            "Test with beta users"
        ]
    },
    {
        id: 6,
        title: "Create AI-driven content moderation solutions for online platforms",
        category: "Content Creation and Editing",
        howToStart: "Develop AI content filtering and moderation tools and sell to social networks, forums, marketplaces.",
        checklistItems: [
            "Study content moderation APIs",
            "Design filtering algorithms",
            "Build moderation dashboard",
            "Implement real-time scanning",
            "Test with sample content"
        ]
    },
    {
        id: 7,
        title: "Develop AI-powered chatbots and virtual assistants for businesses",
        category: "Customer Service and Virtual Assistance",
        howToStart: "Master conversational AI platforms, learn about different industries, and pitch your chatbot development services.",
        checklistItems: [
            "Research chatbot platforms",
            "Study natural language processing",
            "Design conversation flows",
            "Build industry-specific solutions",
            "Test with real users"
        ]
    },
    {
        id: 8,
        title: "Create AI-enhanced data visualization and reporting tools",
        category: "Data and Analytics Services",
        howToStart: "Develop AI-powered dashboards and reporting solutions, sell to businesses looking to extract insights from data.",
        checklistItems: [
            "Study data visualization libraries",
            "Learn AI analytics techniques",
            "Design interactive dashboards",
            "Implement automated reporting",
            "Test with real datasets"
        ]
    },
    {
        id: 9,
        title: "Build AI-powered virtual try-on solutions for fashion and beauty brands",
        category: "Customer Service and Virtual Assistance",
        howToStart: "Develop AI virtual fitting and makeup preview tools, sell to ecommerce retailers in fashion and cosmetics.",
        checklistItems: [
            "Research AR technologies",
            "Study computer vision APIs",
            "Design virtual fitting room",
            "Implement real-time preview",
            "Test with various products"
        ]
    },
    {
        id: 10,
        title: "Create AI-driven sports coaching and training apps",
        category: "Education and Training",
        howToStart: "Use computer vision AI to analyze form and provide feedback, and monetize through individual or team subscriptions.",
        checklistItems: [
            "Study motion analysis AI",
            "Design training programs",
            "Build feedback algorithms",
            "Implement video analysis",
            "Test with athletes"
        ]
    }
];

// Categories for filtering
const categories = [
    "Content Creation and Editing",
    "Marketing and Advertising",
    "Education and Training",
    "Gaming and Interactive Media",
    "Customer Service and Virtual Assistance",
    "Data and Analytics Services",
    "Health and Wellness",
    "Finance and Investing",
    "Productivity and Project Management"
];

// Helper function to get random checklist items for project generation
function getDefaultChecklistItems(category) {
    const defaultItems = {
        "Content Creation and Editing": [
            "Research content creation tools",
            "Set up development environment",
            "Design user interface",
            "Implement core features",
            "Test with sample content"
        ],
        "Marketing and Advertising": [
            "Study marketing automation",
            "Design campaign workflows",
            "Build analytics system",
            "Implement A/B testing",
            "Create reporting dashboard"
        ],
        "Education and Training": [
            "Research learning platforms",
            "Design curriculum structure",
            "Build interactive features",
            "Implement progress tracking",
            "Test with students"
        ],
        "Customer Service and Virtual Assistance": [
            "Study chatbot frameworks",
            "Design conversation flows",
            "Build NLP integration",
            "Implement user dashboard",
            "Test with customers"
        ],
        "Data and Analytics Services": [
            "Research data processing",
            "Design analytics pipeline",
            "Build visualization tools",
            "Implement real-time updates",
            "Test with large datasets"
        ]
    };
    
    return defaultItems[category] || [
        "Research existing solutions",
        "Design system architecture",
        "Build MVP prototype",
        "Implement core features",
        "Test with users"
    ];
}
