// Messages Page - Real API Integration
let currentRequestId = null;
let acceptedRequests = [];
let messagePollingInterval = null;

async function loadConversations() {
    try {
        const response = await api.getRequests();
        acceptedRequests = [...response.data.received, ...response.data.sent]
            .filter(req => req.status === 'accepted');
        
        renderConversationsList();
        
        if (acceptedRequests.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const requestId = urlParams.get('request');
            loadChat(requestId || acceptedRequests[0]._id);
        } else {
            showEmptyState();
        }
    } catch (error) {
        console.error('Failed to load conversations:', error);
        UI.toast('Failed to load conversations', 'error');
    }
}

function renderConversationsList() {
    const container = document.querySelector('.conversations-list');
    
    if (acceptedRequests.length === 0) {
        container.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                <p>No active conversations</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem;">Accept a request to start chatting!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = acceptedRequests.map(request => {
        const profile = JSON.parse(localStorage.getItem('user'));
        const otherUser = request.fromUser._id === profile._id ? request.toUser : request.fromUser;
        
        return `
            <div class="conversation-item ${currentRequestId === request._id ? 'active' : ''}" 
                 onclick="loadChat('${request._id}')">
                <div class="conversation-avatar">${otherUser.name.charAt(0)}</div>
                <div class="conversation-info">
                    <div class="conversation-name">${otherUser.name}</div>
                    <div class="conversation-preview">${request.requestedSkill} ↔ ${request.offeredSkill}</div>
                </div>
            </div>
        `;
    }).join('');
}

async function loadChat(requestId) {
    currentRequestId = requestId;
    
    const request = acceptedRequests.find(r => r._id === requestId);
    if (!request) return;
    
    const profile = JSON.parse(localStorage.getItem('user'));
    const otherUser = request.fromUser._id === profile._id ? request.toUser : request.fromUser;
    
    document.querySelector('.chat-header').innerHTML = `
        <div class="conversation-avatar">${otherUser.name.charAt(0)}</div>
        <div>
            <h3 style="margin-bottom: 0.25rem;">${otherUser.name}</h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">${otherUser.city}</p>
        </div>
    `;
    
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event?.currentTarget?.classList.add('active');
    
    await loadMessages();
    startMessagePolling();
}

async function loadMessages() {
    try {
        const response = await api.getMessages(currentRequestId);
        const messages = response.data;
        
        renderMessages(messages);
    } catch (error) {
        console.error('Failed to load messages:', error);
    }
}

function renderMessages(messages) {
    const container = document.getElementById('chat-messages');
    const profile = JSON.parse(localStorage.getItem('user'));
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                <p>No messages yet. Start the conversation!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map(msg => {
        const isSent = msg.senderId._id === profile._id;
        const time = new Date(msg.timestamp).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });
        
        return `
            <div class="message ${isSent ? 'sent' : ''}">
                <div class="message-avatar">${msg.senderId.name.charAt(0)}</div>
                <div>
                    <div class="message-content">${escapeHtml(msg.message)}</div>
                    <div class="message-time">${time}</div>
                </div>
            </div>
        `;
    }).join('');
    
    container.scrollTop = container.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message || !currentRequestId) return;
    
    const request = acceptedRequests.find(r => r._id === currentRequestId);
    const profile = JSON.parse(localStorage.getItem('user'));
    const receiverId = request.fromUser._id === profile._id ? request.toUser._id : request.fromUser._id;
    
    try {
        await api.sendMessage({
            requestId: currentRequestId,
            receiverId: receiverId,
            message: message
        });
        
        input.value = '';
        await loadMessages();
    } catch (error) {
        console.error('Failed to send message:', error);
        UI.toast('Failed to send message', 'error');
    }
}

function startMessagePolling() {
    if (messagePollingInterval) {
        clearInterval(messagePollingInterval);
    }
    
    messagePollingInterval = setInterval(() => {
        if (currentRequestId) {
            loadMessages();
        }
    }, 5000);
}

function showEmptyState() {
    document.querySelector('.chat-window').innerHTML = `
        <div class="empty-chat">
            <h3>No Active Conversations</h3>
            <p>Accept a skill exchange request to start chatting!</p>
            <button class="btn-primary" onclick="window.location.href='requests.html'" style="margin-top: 1rem;">
                View Requests
            </button>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('message-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

window.addEventListener('beforeunload', () => {
    if (messagePollingInterval) {
        clearInterval(messagePollingInterval);
    }
});

if (document.querySelector('.messages-container')) {
    loadConversations();
}
