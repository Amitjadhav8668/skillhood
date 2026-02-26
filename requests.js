// Requests Page - Real API Integration
let allRequests = { received: [], sent: [] };

async function loadRequests() {
    try {
        const response = await api.getRequests();
        allRequests = response.data;
        
        renderRequests('received');
        updateTabCounts();
    } catch (error) {
        console.error('Failed to load requests:', error);
        UI.toast('Failed to load requests', 'error');
    }
}

function updateTabCounts() {
    const tabs = document.querySelectorAll('.request-tab');
    tabs[0].textContent = `Received (${allRequests.received.length})`;
    tabs[1].textContent = `Sent (${allRequests.sent.length})`;
}

function renderRequests(type) {
    const container = document.getElementById(`${type}-requests`);
    const requests = allRequests[type];
    
    if (requests.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <h3>No ${type} requests yet</h3>
                <p>Start connecting with skill exchangers!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = requests.map(request => createRequestCard(request, type)).join('');
}

function createRequestCard(request, type) {
    const isReceived = type === 'received';
    const otherUser = isReceived ? request.fromUser : request.toUser;
    const statusClass = `status-${request.status}`;
    const statusText = {
        pending: '⏳ Pending',
        accepted: '✓ Accepted',
        rejected: '✗ Declined'
    }[request.status];
    
    const timeAgo = getTimeAgo(new Date(request.createdAt));
    
    let actions = '';
    if (isReceived && request.status === 'pending') {
        actions = `
            <div class="request-actions">
                <button class="btn-accept" onclick="updateStatus('${request._id}', 'accepted')">✓ Accept</button>
                <button class="btn-reject" onclick="updateStatus('${request._id}', 'rejected')">✗ Decline</button>
            </div>
        `;
    } else if (request.status === 'accepted') {
        actions = `
            <div class="request-actions">
                <button class="btn-message" onclick="openChat('${request._id}')">💬 Start Chat</button>
            </div>
        `;
    }
    
    return `
        <div class="request-card" data-id="${request._id}">
            <div class="request-header">
                <div class="request-user">
                    <div class="request-avatar">${otherUser.name.charAt(0)}</div>
                    <div>
                        <h3 style="margin-bottom: 0.25rem;">${otherUser.name}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">
                            ${isReceived ? 'Wants to learn' : 'You want to learn'}: ${request.requestedSkill}
                        </p>
                    </div>
                </div>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                "${request.message || 'No message provided'}"
            </p>
            <div style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1rem;">
                📅 ${isReceived ? 'Requested' : 'Sent'} ${timeAgo}
            </div>
            ${actions}
        </div>
    `;
}

async function updateStatus(requestId, status) {
    try {
        await api.updateRequestStatus(requestId, status);
        UI.toast(`Request ${status}!`, 'success');
        loadRequests();
    } catch (error) {
        console.error('Failed to update status:', error);
        UI.toast('Failed to update request', 'error');
    }
}

function openChat(requestId) {
    window.location.href = `messages.html?request=${requestId}`;
}

function switchRequestTab(tab) {
    document.querySelectorAll('.request-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('received-requests').style.display = tab === 'received' ? 'block' : 'none';
    document.getElementById('sent-requests').style.display = tab === 'sent' ? 'block' : 'none';
    
    renderRequests(tab);
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    
    return 'just now';
}

if (document.querySelector('.request-tabs')) {
    loadRequests();
}
