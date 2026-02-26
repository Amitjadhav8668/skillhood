// Dashboard - Load Real Data
async function loadDashboard() {
    try {
        // Show loading state
        document.getElementById('skills-offered-count').textContent = '...';
        document.getElementById('skills-wanted-count').textContent = '...';
        document.getElementById('nearby-matches-count').textContent = '...';

        const [profile, skills, requests] = await Promise.all([
            api.getProfile(),
            api.getSkills(),
            api.getRequests()
        ]);

        // Update user name
        document.getElementById('user-name').textContent = profile.data.name.split(' ')[0];

        // Count skills
        const offeredSkills = skills.data.filter(s => s.type === 'offer');
        const wantedSkills = skills.data.filter(s => s.type === 'want');
        
        document.getElementById('skills-offered-count').textContent = offeredSkills.length;
        document.getElementById('skills-wanted-count').textContent = wantedSkills.length;

        // Load nearby users
        const nearbyUsers = await api.getNearbyUsers(profile.data.city);
        document.getElementById('nearby-matches-count').textContent = nearbyUsers.data.length;

        // Count pending requests (as new messages indicator)
        const pendingRequests = requests.data.filter(r => r.status === 'pending');
        document.getElementById('messages-count').textContent = pendingRequests.length;

    } catch (error) {
        console.error('Dashboard load error:', error);
        if (window.UI) UI.toast('Failed to load dashboard data', 'error');
        
        // Reset to 0 on error
        document.getElementById('skills-offered-count').textContent = '0';
        document.getElementById('skills-wanted-count').textContent = '0';
        document.getElementById('nearby-matches-count').textContent = '0';
        document.getElementById('messages-count').textContent = '0';
    }
}

if (document.getElementById('user-name')) {
    loadDashboard();
}
