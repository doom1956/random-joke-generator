// API configuration and fetch functions
const API_CONFIG = {
    jokeApi: {
        url: 'https://api.api-ninjas.com/v1/jokes',
        params: { limit: 1 }
    },
    jokeOne: {
        url: 'https://api.jokes.one/jokes/random',
        params: { format: 'json' }
    },
    icanhazdad: {
        url: 'https://icanhazdadjokes.com/json'
    }
};

class JokeAPI {
    constructor() {
        this.currentJoke = null;
        this.cache = {};
    }

    async fetchJoke(source = 'random', category = 'any') {
        try {
            let joke;
            
            if (source === 'random') {
                const sources = ['jokeapi', 'jokeOne', 'icanhazdad'];
                source = sources[Math.floor(Math.random() * sources.length)];
            }

            switch(source) {
                case 'jokeapi':
                    joke = await this.fetchFromJokeAPI(category);
                    break;
                case 'jokeOne':
                    joke = await this.fetchFromJokeOne();
                    break;
                case 'icanhazdad':
                    joke = await this.fetchFromIcanhazdad();
                    break;
                default:
                    joke = await this.fetchFromJokeAPI(category);
            }

            this.currentJoke = joke;
            return joke;
        } catch (error) {
            console.error('Error fetching joke:', error);
            throw error;
        }
    }

    async fetchFromJokeAPI(category = 'any') {
        // Using a free public jokes API
        try {
            const url = 'https://api.api-ninjas.com/v1/jokes?limit=1';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            
            if (data && data.length > 0) {
                return {
                    type: 'single',
                    content: data[0].joke,
                    source: 'Ninja Jokes API'
                };
            }
        } catch (error) {
            console.error('JokeAPI error:', error);
            // Fallback to a different API
            return await this.fetchFromIcanhazdad();
        }
    }

    async fetchFromJokeOne() {
        try {
            const response = await fetch('https://api.jokes.one/jokes/random?format=json');
            
            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            
            if (data && data.joke) {
                return {
                    type: 'single',
                    content: data.joke.text,
                    source: 'Jokes.one API'
                };
            }
        } catch (error) {
            console.error('Jokes.one error:', error);
            return await this.fetchFromIcanhazdad();
        }
    }

    async fetchFromIcanhazdad() {
        try {
            const response = await fetch('https://icanhazdadjokes.com/json');
            
            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            
            if (data && data.joke) {
                return {
                    type: 'single',
                    content: data.joke,
                    source: 'icanhazdadjokes API'
                };
            }
        } catch (error) {
            console.error('icanhazdadjokes error:', error);
            // Return a fallback joke
            return this.getFallbackJoke();
        }
    }

    getFallbackJoke() {
        const fallbackJokes = [
            {
                type: 'single',
                content: 'Why don\'t scientists trust atoms? Because they make up everything!',
                source: 'Fallback Jokes'
            },
            {
                type: 'single',
                content: 'What do you call a fake noodle? An impasta!',
                source: 'Fallback Jokes'
            },
            {
                type: 'single',
                content: 'Why did the scarecrow win an award? He was outstanding in his field!',
                source: 'Fallback Jokes'
            },
            {
                type: 'single',
                content: 'What do you call a bear with no teeth? A gummy bear!',
                source: 'Fallback Jokes'
            },
            {
                type: 'single',
                content: 'Why don\'t eggs tell jokes? They\'d crack each other up!',
                source: 'Fallback Jokes'
            }
        ];
        return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
    }
}

const jokeAPI = new JokeAPI();
