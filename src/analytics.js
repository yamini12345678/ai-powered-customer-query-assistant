document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts with default data
    initializeCharts();
    
    // Add time range filter functionality
    document.getElementById('timeRange').addEventListener('change', function(e) {
        updateChartsData(e.target.value);
    });

    function initializeCharts() {
        // Sales Chart with more detailed data
        const salesCtx = document.getElementById('salesChart').getContext('2d');
        window.salesChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: generateDailyLabels(30),
                datasets: [{
                    label: 'Daily Sales ($)',
                    data: generateRandomData(30, 10000, 30000),
                    borderColor: '#3498db',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(52, 152, 219, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `Sales: $${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });

        // Enhanced Demographics Chart
        const demographicsCtx = document.getElementById('demographicsChart').getContext('2d');
        window.demographicsChart = new Chart(demographicsCtx, {
            type: 'doughnut',
            data: {
                labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
                datasets: [{
                    data: [15, 30, 25, 20, 10],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#f1c40f',
                        '#e74c3c',
                        '#9b59b6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                layout: {
                    padding: 20
                },
                animation: {
                    duration: 500
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 15
                        }
                    }
                }
            }
        });

        // Products Performance Chart
        const productsCtx = document.getElementById('productsChart').getContext('2d');
        window.productsChart = new Chart(productsCtx, {
            type: 'bar',
            data: {
                labels: ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports'],
                datasets: [{
                    label: 'Sales Volume',
                    data: generateRandomData(5, 500, 2000),
                    backgroundColor: '#2ecc71',
                    borderRadius: 5
                }, {
                    label: 'Revenue',
                    data: generateRandomData(5, 1000, 5000),
                    backgroundColor: '#3498db',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                layout: {
                    padding: 20
                },
                animation: {
                    duration: 500
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 15,
                            padding: 10
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: value => `$${value.toLocaleString()}`
                        }
                    }
                }
            }
        });

        // Add Customer Satisfaction Chart
        const satisfactionCtx = document.getElementById('satisfactionChart').getContext('2d');
        window.satisfactionChart = new Chart(satisfactionCtx, {
            type: 'radar',
            data: {
                labels: ['Service', 'Quality', 'Price', 'Support', 'Delivery'],
                datasets: [{
                    label: 'Current Month',
                    data: [4.5, 4.8, 4.2, 4.7, 4.4],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    pointBackgroundColor: '#3498db'
                }, {
                    label: 'Previous Month',
                    data: [4.2, 4.5, 4.0, 4.3, 4.1],
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: '#2ecc71',
                    pointBackgroundColor: '#2ecc71'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });

        // Update all charts periodically
        setInterval(() => {
            updateRealTimeData();
            updateProductsData();
            updateSatisfactionData();
        }, 5000);
    }

    function updateProductsData() {
        const newSalesVolume = generateRandomData(5, 500, 2000);
        const newRevenue = generateRandomData(5, 1000, 5000);
        
        window.productsChart.data.datasets[0].data = newSalesVolume;
        window.productsChart.data.datasets[1].data = newRevenue;
        window.productsChart.update('none');
    }

    function updateSatisfactionData() {
        const newCurrentData = window.satisfactionChart.data.datasets[0].data.map(
            value => Math.min(5, Math.max(1, value + (Math.random() - 0.5) * 0.2))
        );
        window.satisfactionChart.data.datasets[0].data = newCurrentData;
        window.satisfactionChart.update('none');
    }

    function updateChartsData(days) {
        const newData = generateRandomData(days, 10000, 30000);
        const newLabels = generateDailyLabels(days);
        
        window.salesChart.data.labels = newLabels;
        window.salesChart.data.datasets[0].data = newData;
        window.salesChart.update();

        // Update metrics cards with new totals
        updateMetricsCards(newData);
    }

    function generateDailyLabels(days) {
        const labels = [];
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        return labels;
    }

    function generateRandomData(count, min, max) {
        return Array.from({ length: count }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    function updateRealTimeData() {
        // Simulate real-time data updates
        const newSalesData = window.salesChart.data.datasets[0].data;
        newSalesData.shift();
        newSalesData.push(generateRandomData(1, 10000, 30000)[0]);
        
        window.salesChart.update('none'); // Update without animation
        updateMetricsCards(newSalesData);
    }

    function updateMetricsCards(salesData) {
        const totalSales = salesData.reduce((a, b) => a + b, 0);
        const avgSales = totalSales / salesData.length;
        
        document.querySelector('.metric-value').textContent = 
            `$${totalSales.toLocaleString()}`;
    }

    // Add this after the initializeCharts function
    function startPeriodicUpdates() {
        setInterval(() => {
            // Update sales data
            const newSalesData = generateRandomData(30, 10000, 30000);
            window.salesChart.data.datasets[0].data = newSalesData;
            window.salesChart.update('none');
    
            // Update demographics data
            const newDemographicsData = generateRandomData(5, 10, 35);
            window.demographicsChart.data.datasets[0].data = newDemographicsData;
            window.demographicsChart.update('none');
    
            // Update products data
            window.productsChart.data.datasets[0].data = generateRandomData(5, 500, 2000);
            window.productsChart.data.datasets[1].data = generateRandomData(5, 1000, 5000);
            window.productsChart.update('none');
    
            // Update satisfaction data
            const newSatisfactionData = window.satisfactionChart.data.datasets[0].data.map(
                value => Math.min(5, Math.max(1, value + (Math.random() - 0.5) * 0.2))
            );
            window.satisfactionChart.data.datasets[0].data = newSatisfactionData;
            window.satisfactionChart.update('none');
    
            // Update metrics
            updateMetricsCards(newSalesData);
        }, 3000); // Update every 3 seconds
    }
    
    // Add this line at the end of initializeCharts function
    startPeriodicUpdates();
});