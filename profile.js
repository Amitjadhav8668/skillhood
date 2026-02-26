// Profile Page - Real API Integration
async function loadProfile() {
    try {
        const response = await api.getProfile();
        const user = response.data;
        
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;
        document.getElementById('profile-location').textContent = `📍 ${user.city}`;
        document.getElementById('profile-bio').textContent = user.bio || 'No bio yet';
        
        const joined = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        document.getElementById('profile-joined').textContent = `Joined ${joined}`;
        
        // Load skills
        const skillsResponse = await api.getSkills();
        const skills = skillsResponse.data;
        
        // Render skills (simplified)
        console.log('User skills:', skills);
        
    } catch (error) {
        console.error('Profile load error:', error);
        UI.toast('Failed to load profile', 'error');
    }
}

if (document.getElementById('profile-name')) {
    loadProfile();
}
