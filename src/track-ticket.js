document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const ticketDetails = document.getElementById('ticketDetails');
    const noTicketFound = document.getElementById('noTicketFound');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const ticketNumber = document.getElementById('ticketNumber').value;

        // Simulate API call to fetch ticket details
        if (ticketNumber.startsWith('TKT-')) {
            // Show ticket details
            ticketDetails.style.display = 'block';
            noTicketFound.style.display = 'none';

            // Simulate loading data
            updateTicketStatus();
        } else {
            // Show no ticket found message
            ticketDetails.style.display = 'none';
            noTicketFound.style.display = 'block';
        }
    });

    function updateTicketStatus() {
        // Simulate real-time status updates
        const statusBadge = document.querySelector('.status-badge');
        const statuses = ['In Progress', 'Under Review', 'Pending', 'Resolved'];
        let currentIndex = 0;

        // Update status every 5 seconds (for demo purposes)
        setInterval(() => {
            statusBadge.textContent = statuses[currentIndex];
            currentIndex = (currentIndex + 1) % statuses.length;

            // Update badge color based on status
            switch(statuses[currentIndex]) {
                case 'In Progress':
                    statusBadge.style.background = '#ffd700';
                    break;
                case 'Under Review':
                    statusBadge.style.background = '#17a2b8';
                    break;
                case 'Pending':
                    statusBadge.style.background = '#dc3545';
                    break;
                case 'Resolved':
                    statusBadge.style.background = '#28a745';
                    break;
            }
        }, 5000);
    }
});