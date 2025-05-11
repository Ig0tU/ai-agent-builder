// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const categoryFilter = document.getElementById('categoryFilter');
const ideasGrid = document.getElementById('ideasGrid');
const ideaDetail = document.getElementById('ideaDetail');
const detailTitle = document.getElementById('detailTitle');
const detailCategory = document.getElementById('detailCategory');
const detailSteps = document.getElementById('detailSteps');
const implementationChecklist = document.getElementById('implementationChecklist');

// State
let currentIdea = null;

// Initialize the app
function initializeApp() {
    // Populate category filter
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Add event listeners
    searchInput.addEventListener('input', filterIdeas);
    categoryFilter.addEventListener('change', filterIdeas);
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterIdeas();
    });

    // Initial render
    renderIdeas(aiIdeas);
}

// Render ideas grid
function renderIdeas(ideas) {
    ideasGrid.innerHTML = '';
    
    ideas.forEach(idea => {
        const card = document.createElement('div');
        card.className = 'idea-card';
        card.innerHTML = `
            <h2>${idea.title}</h2>
            <p class="category">${idea.category}</p>
        `;
        
        card.addEventListener('click', () => showIdeaDetail(idea));
        ideasGrid.appendChild(card);
    });
}

// Filter ideas based on search and category
function filterIdeas() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredIdeas = aiIdeas.filter(idea => {
        const matchesSearch = !searchTerm || 
            idea.title.toLowerCase().includes(searchTerm) ||
            idea.howToStart.toLowerCase().includes(searchTerm) ||
            idea.category.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || idea.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    renderIdeas(filteredIdeas);
    
    // Show/hide clear button based on search input
    clearSearchBtn.style.display = searchTerm ? 'block' : 'none';
    
    // Show message if no results found
    if (filteredIdeas.length === 0) {
        ideasGrid.innerHTML = `
            <div class="no-results">
                <p>No ideas found matching your search.</p>
                <button class="primary-btn" onclick="clearSearch()">Clear Search</button>
            </div>
        `;
    }
}

// Clear search and reset filters
function clearSearch() {
    searchInput.value = '';
    categoryFilter.value = '';
    filterIdeas();
}

// Show idea detail view
function showIdeaDetail(idea) {
    currentIdea = idea;
    
    detailTitle.textContent = idea.title;
    detailCategory.textContent = idea.category;
    detailSteps.textContent = idea.howToStart;
    
    // Render checklist
    implementationChecklist.innerHTML = '';
    idea.checklistItems.forEach(item => {
        const checklistItem = document.createElement('div');
        checklistItem.className = 'checklist-item';
        checklistItem.innerHTML = `
            <input type="checkbox" id="check-${item.replace(/\s+/g, '-')}">
            <label for="check-${item.replace(/\s+/g, '-')}">${item}</label>
        `;
        implementationChecklist.appendChild(checklistItem);
    });

    ideaDetail.style.display = 'flex';
}

// Close detail view
function closeDetail() {
    ideaDetail.style.display = 'none';
    currentIdea = null;
}

// Generate project boilerplate
function generateProject() {
    if (!currentIdea) return;

    // Create project structure based on idea category
    const projectStructure = generateProjectStructure(currentIdea);
    
    // Create a downloadable zip file
    const blob = new Blob([JSON.stringify(projectStructure, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectStructure.name}-project.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show success message with next steps
    const message = `
        Project structure generated successfully!
        
        Next steps:
        1. Extract the downloaded JSON file
        2. Follow the setup instructions in README.md
        3. Install the recommended dependencies
        4. Start implementing the features using the provided boilerplate
        
        Happy coding! 🚀
    `;
    
    alert(message);
}

// Generate project structure based on idea category
function generateProjectStructure(idea) {
    const projectName = idea.title.toLowerCase().replace(/\s+/g, '-');
    
    const baseStructure = {
        name: projectName,
        category: idea.category,
        description: idea.title,
        files: [
            {
                name: 'README.md',
                content: generateReadme(idea)
            },
            {
                name: 'package.json',
                content: generatePackageJson(idea)
            },
            {
                name: 'src/index.js',
                content: generateIndexFile(idea)
            },
            {
                name: 'src/config.js',
                content: generateConfigFile(idea)
            },
            {
                name: '.env.example',
                content: generateEnvExample()
            },
            {
                name: '.gitignore',
                content: generateGitignore()
            }
        ],
        dependencies: getRecommendedDependencies(idea.category),
        devDependencies: {
            "jest": "^29.0.0",
            "eslint": "^8.0.0",
            "prettier": "^2.0.0",
            "nodemon": "^2.0.0"
        }
    };

    // Add category-specific files
    switch (idea.category) {
        case "Content Creation and Editing":
            baseStructure.files.push(
                { name: 'src/services/aiService.js', content: generateAiService() },
                { name: 'src/utils/contentUtils.js', content: generateContentUtils() }
            );
            break;
        case "Marketing and Advertising":
            baseStructure.files.push(
                { name: 'src/services/analyticsService.js', content: generateAnalyticsService() },
                { name: 'src/utils/marketingUtils.js', content: generateMarketingUtils() }
            );
            break;
    }

    return baseStructure;
}

// Helper functions for generating file contents
function generateReadme(idea) {
    return `# ${idea.title}

## Description
${idea.howToStart}

## Features
- AI-powered automation
- Easy integration
- Scalable architecture
- Customizable workflows

## Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn
- API keys (see .env.example)

### Installation
1. Clone this repository
2. Run \`npm install\`
3. Copy \`.env.example\` to \`.env\` and fill in your API keys
4. Run \`npm start\`

## Implementation Checklist
${idea.checklistItems.map(item => `- [ ] ${item}`).join('\n')}

## Tech Stack
- Node.js
- Express.js
- AI/ML Libraries
- Database (MongoDB/PostgreSQL)

## License
MIT
`;
}

function generatePackageJson(idea) {
    return {
        name: idea.title.toLowerCase().replace(/\s+/g, '-'),
        version: '1.0.0',
        description: idea.title,
        main: 'src/index.js',
        scripts: {
            start: 'node src/index.js',
            dev: 'nodemon src/index.js',
            test: 'jest',
            lint: 'eslint src/**/*.js',
            format: 'prettier --write "src/**/*.js"'
        },
        keywords: idea.title.toLowerCase().split(' '),
        author: '',
        license: 'MIT'
    };
}

function generateIndexFile(idea) {
    return `// Main application entry point
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ${idea.title}' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
`;
}

function generateConfigFile(idea) {
    return `// Configuration settings
module.exports = {
    appName: '${idea.title}',
    apiVersion: 'v1',
    // Add more configuration options here
};
`;
}

function generateEnvExample() {
    return `# API Keys
AI_API_KEY=your_api_key_here
DATABASE_URL=your_database_url
PORT=3000

# Other Settings
NODE_ENV=development
LOG_LEVEL=debug
`;
}

function generateGitignore() {
    return `.env
node_modules/
coverage/
dist/
.DS_Store
*.log
`;
}

function generateAiService() {
    return `// AI Service integration
class AIService {
    constructor() {
        this.apiKey = process.env.AI_API_KEY;
    }

    async processContent(data) {
        // Implement AI processing logic
        return data;
    }
}

module.exports = new AIService();
`;
}

function generateAnalyticsService() {
    return `// Analytics Service
class AnalyticsService {
    constructor() {
        this.events = [];
    }

    trackEvent(eventName, data) {
        this.events.push({
            eventName,
            data,
            timestamp: new Date()
        });
    }

    async generateReport() {
        // Implement reporting logic
        return this.events;
    }
}

module.exports = new AnalyticsService();
`;
}

function generateContentUtils() {
    return `// Content utility functions
const contentUtils = {
    async optimizeContent(content) {
        // Implement content optimization logic
        return content;
    },

    async generateTags(content) {
        // Implement tag generation logic
        return ['ai', 'content', 'automation'];
    },

    async analyzeReadability(content) {
        // Implement readability analysis
        return {
            score: 85,
            suggestions: []
        };
    }
};

module.exports = contentUtils;
`;
}

function generateMarketingUtils() {
    return `// Marketing utility functions
const marketingUtils = {
    async segmentAudience(userData) {
        // Implement audience segmentation logic
        return {
            segment: 'high-value',
            interests: ['ai', 'technology']
        };
    },

    async optimizeMessage(message, audience) {
        // Implement message optimization logic
        return message;
    },

    async trackConversion(data) {
        // Implement conversion tracking
        return {
            success: true,
            conversionRate: 0.15
        };
    }
};

module.exports = marketingUtils;
`;
}

// Get recommended dependencies based on category
function getRecommendedDependencies(category) {
    const dependencies = {
        "Content Creation and Editing": [
            "openai",
            "ffmpeg",
            "sharp",
            "express",
            "dotenv"
        ],
        "Marketing and Advertising": [
            "analytics-node",
            "mailchimp-api-v3",
            "google-ads-api",
            "express",
            "dotenv"
        ],
        "Education and Training": [
            "tensorflow",
            "natural",
            "socket.io",
            "express",
            "dotenv"
        ],
        "Customer Service and Virtual Assistance": [
            "dialogflow",
            "node-nlp",
            "socket.io",
            "express",
            "dotenv"
        ],
        "Data and Analytics Services": [
            "tensorflow",
            "pandas-js",
            "d3",
            "express",
            "dotenv"
        ]
    };

    return dependencies[category] || [
        "express",
        "dotenv",
        "axios",
        "mongoose"
    ];
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle escape key to close detail view
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetail();
    }
});
