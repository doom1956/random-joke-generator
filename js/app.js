// Main application logic
class JokeApp {
    constructor() {
        this.jokeAPI = jokeAPI;
        this.jokeUI = jokeUI;
        this.jokeStorage = jokeStorage;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.jokeUI.updateSavedJokesList();
    }

    setupEventListeners() {
        // Get new joke
        this.jokeUI.elements.getJokeBtn.addEventListener('click', () => this.getNewJoke());

        // Dark mode toggle
        this.jokeUI.elements.darkModeBtn.addEventListener('click', () => this.jokeUI.toggleDarkMode());

        // Share button
        this.jokeUI.elements.shareBtn.addEventListener('click', () => {
            if (this.jokeAPI.currentJoke) {
                const jokeText = this.extractJokeText();
                this.jokeUI.shareJoke(jokeText);
            } else {
                this.jokeUI.showNotification('No joke to share!', 'error');
            }
        });

        // Copy button
        this.jokeUI.elements.copyBtn.addEventListener('click', () => {
            if (this.jokeAPI.currentJoke) {
                const jokeText = this.extractJokeText();
                this.jokeUI.copyToClipboard(jokeText);
            } else {
                this.jokeUI.showNotification('No joke to copy!', 'error');
            }
        });

        // Save button
        this.jokeUI.elements.saveBtn.addEventListener('click', () => {
            if (this.jokeAPI.currentJoke) {
                const jokeText = this.extractJokeText();
                const source = this.jokeAPI.currentJoke.source || 'Unknown';
                
                if (this.jokeStorage.saveJoke(jokeText, source)) {
                    this.jokeUI.showNotification('Joke saved!', 'success');
                    this.jokeUI.updateSavedJokesList();
                } else {
                    this.jokeUI.showNotification('This joke is already saved!', 'error');
                }
            } else {
                this.jokeUI.showNotification('No joke to save!', 'error');
            }
        });

        // Clear saved jokes
        this.jokeUI.elements.clearSavedBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all saved jokes?')) {
                this.jokeStorage.clearAllJokes();
                this.jokeUI.updateSavedJokesList();
                this.jokeUI.showNotification('All saved jokes cleared!', 'success');
            }
        });
    }

    async getNewJoke() {
        try {
            this.jokeUI.showLoading();
            this.jokeUI.elements.getJokeBtn.disabled = true;

            const apiSource = this.jokeUI.elements.apiSourceSelect.value;
            const category = this.jokeUI.elements.categorySelect.value;

            const joke = await this.jokeAPI.fetchJoke(apiSource, category);
            this.jokeUI.displayJoke(joke);

            this.jokeUI.elements.getJokeBtn.disabled = false;
        } catch (error) {
            this.jokeUI.hideLoading();
            this.jokeUI.showNotification('Failed to load joke. Please try again.', 'error');
            this.jokeUI.elements.getJokeBtn.disabled = false;
            console.error('Error:', error);
        }
    }

    extractJokeText() {
        const joke = this.jokeAPI.currentJoke;
        if (joke.type === 'single') {
            return joke.content;
        } else if (joke.type === 'twopart') {
            return `${joke.setup}\n${joke.delivery}`;
        }
        return '';
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new JokeApp();
    });
} else {
    const app = new JokeApp();
}
