document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const voiceButton = document.getElementById('voiceInput');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const clearChatButton = document.getElementById('clearChat');
    const typingIndicator = document.getElementById('typingIndicator');
    const productGrid = document.getElementById('productGrid');
    const quickActionButtons = document.querySelectorAll('.action-btn');

    // Product Database
    const productDatabase = {
        products: [
            { id: 1, name: 'Laptop', price: 999.99, stock: 50, image: 'laptop.jpg', description: 'High-performance laptop for all your needs' },
            { id: 2, name: 'Smartphone', price: 599.99, stock: 100, image: 'phone.jpg', description: 'Latest smartphone with advanced features' },
            { id: 3, name: 'Headphones', price: 99.99, stock: 200, image: 'headphones.jpg', description: 'Premium quality wireless headphones' }
        ],
        policies: {
            return: 'Items can be returned within 30 days of purchase with original receipt',
            shipping: 'Free shipping on orders over $50',
            warranty: 'All electronics come with 1-year warranty'
        }
    };

    // Recent queries storage
    let recentQueries = [];
    const MAX_RECENT_QUERIES = 5;

    // Dark mode functionality
    function toggleDarkMode() {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', document.body.getAttribute('data-theme'));
    }

    // Initialize dark mode from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // Voice input functionality
    function startVoiceInput() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                voiceButton.style.backgroundColor = '#e74c3c';
            };

            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                userInput.value = text;
            };

            recognition.onend = () => {
                voiceButton.style.backgroundColor = '';
            };

            recognition.start();
        } else {
            alert('Voice input is not supported in your browser.');
        }
    }

    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (!isUser) {
            // Add to recent queries
            if (recentQueries.length >= MAX_RECENT_QUERIES) {
                recentQueries.shift();
            }
            recentQueries.push(message);
            updateRecentQueries();
        }
    }

    // Update recent queries display
    function updateRecentQueries() {
        const recentQueriesDiv = document.getElementById('recentQueries');
        recentQueriesDiv.innerHTML = '';
        recentQueries.forEach(query => {
            const queryDiv = document.createElement('div');
            queryDiv.className = 'recent-query';
            queryDiv.textContent = query;
            queryDiv.onclick = () => userInput.value = query;
            recentQueriesDiv.appendChild(queryDiv);
        });
    }

    // Process user input
    function processUserInput(input) {
        const lowercaseInput = input.toLowerCase();
        
        showTypingIndicator();

        return new Promise(resolve => {
            setTimeout(() => {
                hideTypingIndicator();
                
                // Check for greetings
                if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
                    resolve("Hello! How can I assist you today with your shopping needs?");
                    return;
                }

                // Check for product prices
                if (lowercaseInput.includes('price')) {
                    const product = productDatabase.products.find(p => 
                        lowercaseInput.includes(p.name.toLowerCase())
                    );
                    if (product) {
                        resolve(`The price of ${product.name} is $${product.price}`);
                        return;
                    }
                    resolve("I'd be happy to help you with pricing. Could you please specify which product you're interested in?");
                    return;
                }
                
                // Check for stock availability
                if (lowercaseInput.includes('stock') || lowercaseInput.includes('available')) {
                    const product = productDatabase.products.find(p => 
                        lowercaseInput.includes(p.name.toLowerCase())
                    );
                    if (product) {
                        resolve(`We currently have ${product.stock} units of ${product.name} in stock`);
                        return;
                    }
                    resolve("I can check the availability for you. Which product would you like to know about?");
                    return;
                }

                // Check for return policy
                if (lowercaseInput.includes('return')) {
                    resolve(productDatabase.policies.return);
                    return;
                }

                // Check for shipping information
                if (lowercaseInput.includes('shipping')) {
                    resolve(productDatabase.policies.shipping);
                    return;
                }

                // Check for warranty information
                if (lowercaseInput.includes('warranty')) {
                    resolve(productDatabase.policies.warranty);
                    return;
                }

                // Default response for unrecognized queries
                resolve("I want to help you better. Could you please ask about:\n" +
                       "- Product prices (e.g., 'What's the price of the laptop?')\n" +
                       "- Stock availability (e.g., 'Is the smartphone in stock?')\n" +
                       "- Return policy\n" +
                       "- Shipping information\n" +
                       "- Warranty details");
            }, 1000);
        });
    }

    // Handle user message
    async function handleUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            const response = await processUserInput(message);
            addMessage(response);
            userInput.value = '';
        }
    }

    // Initialize product grid
    function initializeProductGrid() {
        productDatabase.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Event Listeners
    darkModeToggle.addEventListener('click', toggleDarkMode);
    voiceButton.addEventListener('click', startVoiceInput);
    sendButton.addEventListener('click', handleUserMessage);
    clearChatButton.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        recentQueries = [];
        updateRecentQueries();
        addMessage('Chat cleared! How can I help you?');
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    quickActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const query = button.getAttribute('data-query');
            userInput.value = query;
            handleUserMessage();
        });
    });

    // Initialize
    initializeProductGrid();
    addMessage('Welcome to our Retail Assistant! I can help you with product prices, availability, shipping, returns, and warranty information. How may I assist you today?');
});