// UI management and interactions
class JokeUI {
    constructor() {
        this.elements = {
            getJokeBtn: document.getElementById('getJokeBtn'),
            darkModeBtn: document.getElementById('darkModeBtn'),
            shareBtn: document.getElementById('shareBtn'),
            copyBtn: document.getElementById('copyBtn'),
            saveBtn: document.getElementById('saveBtn'),
            clearSavedBtn: document.getElementById('clearSavedBtn'),
            jokeDisplay: document.getElementById('jokeDisplay'),
            loading: document.getElementById('loading'),
            notification: document.getElementById('notification'),
            categorySelect: document.getElementById('category'),
            apiSourceSelect: document.getElementById('apiSource'),
            savedJokesList: document.getElementById('savedJokesList')
        };

        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.initializeDarkMode();
    }

    initializeDarkMode() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            this.elements.darkModeBtn.textContent = '☀️ Light Mode';
        }
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.isDarkMode);
        this.elements.darkModeBtn.textContent = this.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    }

    displayJoke(jokeData) {
        this.hideLoading();
        
        let jokeHTML = '';
        
        if (jokeData.type === 'single') {
            jokeHTML = `<p>${this.escapeHtml(jokeData.content)}</p>`;
        } else if (jokeData.type === 'twopart') {
            jokeHTML = `
                <div class="setup">${this.escapeHtml(jokeData.setup)}</div>
                <div class="delivery">${this.escapeHtml(jokeData.delivery)}</div>
            `;
        }
        
        jokeHTML += `<small style="display: block; margin-top: 15px; opacity: 0.7;">Source: ${jokeData.source}</small>`;
        
        this.elements.jokeDisplay.innerHTML = jokeHTML;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    showLoading() {
        this.elements.loading.classList.add('active');
        this.elements.jokeDisplay.innerHTML = '<p class="placeholder">Loading...</p>';
    }

    hideLoading() {
        this.elements.loading.classList.remove('active');
    }

    showNotification(message, type = 'success') {
        const notif = this.elements.notification;
        notif.textContent = message;
        notif.classList.remove('hidden', 'success', 'error');
        notif.classList.add(type);

        setTimeout(() => {
            notif.classList.add('hidden');
        }, 3000);
    }

    updateSavedJokesList() {
        const savedJokes = jokeStorage.getSavedJokes();
        const listContainer = this.elements.savedJokesList;

        if (savedJokes.length === 0) {
            listContainer.innerHTML = '<p class="placeholder">No saved jokes yet. Save some to see them here!</p>';
            this.elements.clearSavedBtn.classList.add('hidden');
            return;
        }

        this.elements.clearSavedBtn.classList.remove('hidden');

        listContainer.innerHTML = savedJokes.map(joke => `
            <div class="saved-joke-item">
                <div class="joke-text">"${this.escapeHtml(joke.content).substring(0, 100)}..."</div>
                <div class="joke-actions-small">
                    <button class="btn btn-small" onclick="jokeUI.copyToClipboard('${this.escapeHtml(joke.content)}')" title="Copy">📋</button>
                    <button class="btn btn-small" onclick="jokeUI.shareJoke('${this.escapeHtml(joke.content)}')" title="Share">📤</button>
                    <button class="btn btn-small" onclick="jokeUI.deleteSavedJoke(${joke.id})" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    deleteSavedJoke(id) {
        if (confirm('Are you sure you want to delete this joke?')) {
            jokeStorage.deleteJoke(id);
            this.updateSavedJokesList();
            this.showNotification('Joke deleted!', 'success');
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Joke copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy joke', 'error');
        });
    }

    shareJoke(text) {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this joke!',
                text: text
            }).catch((error) => console.log('Error sharing:', error));
        } else {
            this.copyToClipboard(text);
        }
    }

    toggleButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.textContent = 'Loading...';
        } else {
            button.disabled = false;
            button.textContent = 'Get a Joke';
        }
    }
}

const jokeUI = new JokeUI();
