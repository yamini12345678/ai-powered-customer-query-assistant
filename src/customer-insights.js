document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    populateCustomerTable();
    updateBehaviorPatterns();

    // Add filter functionality
    document.getElementById('timeFilter').addEventListener('change', function(e) {
        updateAllData(e.target.value);
    });

    function initializeCharts() {
        // Customer Segments Chart
        const segmentsCtx = document.getElementById('segmentsChart').getContext('2d');
        window.segmentsChart = new Chart(segmentsCtx, {
            type: 'pie',
            data: {
                labels: ['Premium', 'Standard', 'Basic', 'Inactive'],
                datasets: [{
                    data: [30, 45, 15, 10],
                    backgroundColor: ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });

        // Purchase Frequency Chart
        const frequencyCtx = document.getElementById('frequencyChart').getContext('2d');
        window.frequencyChart = new Chart(frequencyCtx, {
            type: 'bar',
            data: {
                labels: ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Yearly'],
                datasets: [{
                    label: 'Number of Customers',
                    data: [150, 300, 450, 200, 100],
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Customer Lifetime Value Chart
        const lifetimeCtx = document.getElementById('lifetimeChart').getContext('2d');
        window.lifetimeChart = new Chart(lifetimeCtx, {
            type: 'line',
            data: {
                labels: generateMonthLabels(12),
                datasets: [{
                    label: 'Average CLV ($)',
                    data: generateRandomData(12, 100, 500),
                    borderColor: '#2ecc71',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(46, 204, 113, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `$${value}`
                        }
                    }
                }
            }
        });

        // Retention Rate Chart
        const retentionCtx = document.getElementById('retentionChart').getContext('2d');
        window.retentionChart = new Chart(retentionCtx, {
            type: 'line',
            data: {
                labels: generateMonthLabels(6),
                datasets: [{
                    label: 'Retention Rate',
                    data: [95, 92, 88, 85, 87, 89],
                    borderColor: '#3498db',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100,
                        ticks: {
                            callback: value => `${value}%`
                        }
                    }
                }
            }
        });
    }

    function populateCustomerTable() {
        const tbody = document.getElementById('customerTableBody');
        const customers = generateCustomerData(10);
        
        tbody.innerHTML = customers.map(customer => `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.purchases}</td>
                <td>$${customer.lifetime.toLocaleString()}</td>
                <td>${customer.lastPurchase}</td>
                <td>${customer.segment}</td>
                <td><span class="status-badge ${customer.status === 'Active' ? 'status-active' : 'status-inactive'}">${customer.segment}</span></td>
            </tr>
        `).join('');
    }

    function updateBehaviorPatterns() {
        document.getElementById('peakHours').textContent = '2 PM - 6 PM';
        document.getElementById('popularCategories').textContent = 'Electronics, Fashion';
        document.getElementById('cartSize').textContent = '$125.50';
    }

    function generateMonthLabels(count) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const labels = [];
        const currentMonth = new Date().getMonth();
        
        for (let i = count - 1; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            labels.push(months[monthIndex]);
        }
        return labels;
    }

    function generateRandomData(count, min, max) {
        return Array.from({ length: count }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    function generateCustomerData(count) {
        const segments = ['Premium', 'Standard', 'Basic'];
        const customers = [];
        
        for (let i = 0; i < count; i++) {
            customers.push({
                id: `CUS${String(i + 1001).padStart(4, '0')}`,
                purchases: Math.floor(Math.random() * 50) + 1,
                lifetime: Math.floor(Math.random() * 5000) + 1000,
                lastPurchase: '2024-01-20',
                segment: segments[Math.floor(Math.random() * segments.length)],
                status: Math.random() > 0.2 ? 'Active' : 'Inactive'
            });
        }
        return customers;
    }

    function updateAllData(timeRange) {
        // Update charts with new data based on selected time range
        const newData = generateRandomData(12, 100, 500);
        window.lifetimeChart.data.datasets[0].data = newData;
        window.lifetimeChart.update();
        
        populateCustomerTable();
        updateBehaviorPatterns();
    }
    
    // Add this after the initializeCharts function
    function startPeriodicUpdates() {
        setInterval(() => {
            // Update segments data
            window.segmentsChart.data.datasets[0].data = generateRandomData(4, 10, 50);
            window.segmentsChart.update('none');
    
            // Update frequency data
            window.frequencyChart.data.datasets[0].data = generateRandomData(5, 100, 500);
            window.frequencyChart.update('none');
    
            // Update lifetime value data
            window.lifetimeChart.data.datasets[0].data = generateRandomData(12, 100, 500);
            window.lifetimeChart.update('none');
    
            // Update retention rate
            const newRetentionData = window.retentionChart.data.datasets[0].data.map(
                value => Math.min(100, Math.max(80, value + (Math.random() - 0.5) * 2))
            );
            window.retentionChart.data.datasets[0].data = newRetentionData;
            window.retentionChart.update('none');
    
            // Update behavior patterns
            const hours = ['10 AM - 2 PM', '2 PM - 6 PM', '6 PM - 10 PM'];
            const categories = ['Electronics, Fashion', 'Home & Garden, Books', 'Sports, Toys'];
            const cartSizes = ['$125.50', '$198.75', '$156.25'];
    
            document.getElementById('peakHours').textContent = hours[Math.floor(Math.random() * hours.length)];
            document.getElementById('popularCategories').textContent = categories[Math.floor(Math.random() * categories.length)];
            document.getElementById('cartSize').textContent = cartSizes[Math.floor(Math.random() * cartSizes.length)];
    
            // Update customer table
            populateCustomerTable();
        }, 5000); // Update every 5 seconds
    }
    
    // Add this line at the end of initializeCharts function
    startPeriodicUpdates();
})