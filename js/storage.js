// Local storage management for saved jokes
class JokeStorage {
    constructor() {
        this.storageKey = 'savedJokes';
        this.maxJokes = 50;
    }

    saveJoke(jokeContent, source = 'Unknown') {
        const jokes = this.getSavedJokes();
        
        // Check if joke already exists
        if (jokes.some(j => j.content === jokeContent)) {
            return false; // Joke already saved
        }

        const newJoke = {
            id: Date.now(),
            content: jokeContent,
            source: source,
            savedAt: new Date().toLocaleString()
        };

        jokes.unshift(newJoke);
        
        // Keep only the latest maxJokes
        if (jokes.length > this.maxJokes) {
            jokes = jokes.slice(0, this.maxJokes);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(jokes));
        return true;
    }

    getSavedJokes() {
        const jokes = localStorage.getItem(this.storageKey);
        return jokes ? JSON.parse(jokes) : [];
    }

    deleteJoke(id) {
        let jokes = this.getSavedJokes();
        jokes = jokes.filter(j => j.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(jokes));
    }

    clearAllJokes() {
        localStorage.removeItem(this.storageKey);
    }

    exportJokes() {
        const jokes = this.getSavedJokes();
        return JSON.stringify(jokes, null, 2);
    }
}

const jokeStorage = new JokeStorage();
