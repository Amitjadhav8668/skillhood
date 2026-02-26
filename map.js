// Map Page - Real API Integration
let nearbyUsers = [];
let map;
let markers = [];

async function loadNearbyUsers() {
    try {
        const profile = await api.getProfile();
        const response = await api.getNearbyUsers(profile.data.user.city);
        nearbyUsers = response.data;
        
        renderUsersList();
        renderMapMarkers(profile.data.user);
        
        document.querySelector('.map-sidebar h3:last-of-type').textContent = `Nearby Users (${nearbyUsers.length})`;
    } catch (error) {
        console.error('Failed to load nearby users:', error);
        UI.toast('Failed to load nearby users', 'error');
    }
}

function renderUsersList() {
    const container = document.querySelector('.map-sidebar');
    const existingCards = container.querySelectorAll('.user-card');
    existingCards.forEach(card => card.remove());
    
    if (nearbyUsers.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.style.cssText = 'text-align: center; padding: 2rem; color: var(--text-secondary);';
        emptyState.innerHTML = `
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No nearby users found</p>
            <p style="font-size: 0.9rem;">Try adding more skills or check back later!</p>
        `;
        container.appendChild(emptyState);
        return;
    }
    
    nearbyUsers.forEach(userData => {
        const user = userData.user;
        const skills = userData.skills;
        const matchScore = userData.matchScore;
        
        const card = document.createElement('div');
        card.className = 'user-card';
        card.onclick = () => viewUserProfile(user._id);
        
        const offeredSkills = skills.offer.map(s => s.name).join(', ') || 'None';
        const wantedSkills = skills.want.map(s => s.name).join(', ') || 'None';
        
        card.innerHTML = `
            <div class="user-card-header">
                <div class="user-avatar">${user.name.charAt(0)}</div>
                <div>
                    <h4 style="margin-bottom: 0.25rem;">${user.name}</h4>
                    <span style="color: var(--text-secondary); font-size: 0.85rem;">${user.city}</span>
                </div>
                <span class="match-score">${matchScore}%</span>
            </div>
            <div class="user-skills">
                <strong>Offers:</strong> ${offeredSkills}<br>
                <strong>Wants:</strong> ${wantedSkills}
            </div>
        `;
        
        container.appendChild(card);
    });
}

function renderMapMarkers(currentUser) {
    if (!map) {
        map = L.map('map').setView([currentUser.latitude || 40.7128, currentUser.longitude || -74.0060], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }
    
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    const myIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: #4db8d1; color: white; padding: 8px 12px; border-radius: 20px; font-weight: 600; box-shadow: 0 4px 12px rgba(77,184,209,0.5);">📍 You</div>`
    });
    
    const myMarker = L.marker([currentUser.latitude || 40.7128, currentUser.longitude || -74.0060], { icon: myIcon })
        .addTo(map)
        .bindPopup(`<strong>You</strong><br>${currentUser.city}`);
    markers.push(myMarker);
    
    nearbyUsers.forEach(userData => {
        const user = userData.user;
        const lat = user.latitude || (40.7128 + (Math.random() - 0.5) * 0.1);
        const lng = user.longitude || (-74.0060 + (Math.random() - 0.5) * 0.1);
        
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background: #2d8b9e; color: white; padding: 8px 12px; border-radius: 20px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">${user.name}</div>`
        });
        
        const marker = L.marker([lat, lng], { icon })
            .addTo(map)
            .bindPopup(`<strong>${user.name}</strong><br>Match: ${userData.matchScore}%<br><button onclick="sendSwapRequest('${user._id}')" style="margin-top: 8px; padding: 4px 12px; background: #4db8d1; border: none; border-radius: 4px; color: white; cursor: pointer;">Send Request</button>`);
        markers.push(marker);
    });
}

function viewUserProfile(userId) {
    window.location.href = `profile.html?user=${userId}`;
}

async function sendSwapRequest(toUserId) {
    const offeredSkill = prompt('What skill will you offer?');
    const requestedSkill = prompt('What skill do you want to learn?');
    const message = prompt('Add a message (optional):');
    
    if (!offeredSkill || !requestedSkill) {
        UI.toast('Please provide both skills', 'error');
        return;
    }
    
    try {
        await api.createRequest({
            toUser: toUserId,
            offeredSkill,
            requestedSkill,
            message: message || ''
        });
        
        UI.toast('Request sent successfully!', 'success');
    } catch (error) {
        UI.toast('Failed to send request', 'error');
    }
}

if (document.getElementById('map')) {
    loadNearbyUsers();
}
