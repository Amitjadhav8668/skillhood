// Skills Page - Real API Integration
let currentSkills = [];

async function loadSkills() {
    try {
        const response = await api.getSkills();
        currentSkills = response.data;
        renderSkills();
    } catch (error) {
        UI.showError('offer-skills-list', 'Failed to load skills');
    }
}

function renderSkills() {
    const offerList = document.getElementById('offer-skills-list');
    const wantList = document.getElementById('want-skills-list');
    
    const offeredSkills = currentSkills.filter(s => s.type === 'offer');
    const wantedSkills = currentSkills.filter(s => s.type === 'want');
    
    if (offeredSkills.length === 0) {
        offerList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No skills offered yet</p>
                <p style="font-size: 0.9rem;">Add skills you can teach others!</p>
            </div>
        `;
    } else {
        offerList.innerHTML = offeredSkills.map(skill => createSkillHTML(skill, 'offer')).join('');
    }
    
    if (wantedSkills.length === 0) {
        wantList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No skills wanted yet</p>
                <p style="font-size: 0.9rem;">Add skills you want to learn!</p>
            </div>
        `;
    } else {
        wantList.innerHTML = wantedSkills.map(skill => createSkillHTML(skill, 'want')).join('');
    }
}

function createSkillHTML(skill, type) {
    const color = type === 'offer' ? '74,144,226' : '53,122,189';
    const colorHex = type === 'offer' ? '#4A90E2' : '#357ABD';
    
    return `
        <div class="skill-item" data-id="${skill._id}">
            <div class="skill-item-info">
                <h4>${skill.name}</h4>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${skill.description || ''}</p>
                <div style="margin-top: 0.5rem;">
                    <span style="background: rgba(${color},0.2); color: ${colorHex}; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.8rem; font-weight: 500;">${skill.level || 'Beginner'}</span>
                </div>
            </div>
            <div class="skill-actions">
                <button class="btn-icon" onclick="deleteSkillById('${skill._id}')">🗑️ Remove</button>
            </div>
        </div>
    `;
}

async function deleteSkillById(id) {
    if (!confirm('Remove this skill?')) return;
    
    try {
        await api.deleteSkill(id);
        UI.toast('Skill removed', 'success');
        loadSkills();
    } catch (error) {
        UI.toast('Failed to remove skill', 'error');
    }
}

document.getElementById('skill-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const skillData = {
        name: document.getElementById('skill-name').value,
        description: document.getElementById('skill-desc').value,
        level: document.getElementById('skill-level').value,
        type: document.getElementById('skill-type').value
    };
    
    try {
        await api.createSkill(skillData);
        UI.toast('Skill added!', 'success');
        closeModal();
        loadSkills();
    } catch (error) {
        UI.toast('Failed to add skill', 'error');
    }
});

if (document.getElementById('offer-skills-list')) {
    loadSkills();
}
