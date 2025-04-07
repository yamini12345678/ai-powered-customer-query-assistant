document.addEventListener('DOMContentLoaded', function() {
    const ticketForm = document.getElementById('ticketForm');
    
    ticketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(ticketForm);
        const ticketData = Object.fromEntries(formData);
        
        // Generate ticket number
        const ticketNumber = 'TKT-' + Date.now();
        
        // Add timestamp
        ticketData.createdAt = new Date().toISOString();
        ticketData.ticketNumber = ticketNumber;
        
        // Simulate API call
        console.log('Submitting ticket:', ticketData);
        
        // Show success message
        showNotification('Ticket created successfully! Your ticket number is: ' + ticketNumber);
        
        // Reset form
        ticketForm.reset();
    });
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;
        
        // Add notification styles
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#28a745';
        notification.style.color = 'white';
        notification.style.padding = '1rem';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});