# Random Joke Generator

A fun and interactive web application that generates random jokes using multiple external APIs. Features include joke categories, dark mode, local storage for saved jokes, and sharing capabilities.

## Features

### Core Functionality
- **Multiple Joke Sources**: 
  - Ninja Jokes API
  - Jokes.one API
  - icanhazdadjokes API
  - Fallback jokes for reliability

- **Category Selection**: 
  - Any Category
  - General
  - Programming
  - Knock Knock
  - Dad Jokes
  - Animal

### User Interface
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Beautiful Animations**: Smooth transitions and loading states
- **Intuitive Controls**: Easy-to-use buttons and dropdowns

### Joke Management
- **Save Jokes**: Store your favorite jokes locally (up to 50 jokes)
- **Copy to Clipboard**: Quickly copy joke text
- **Share**: Use native share API or copy to clipboard
- **View Saved Jokes**: Browse all saved jokes in one place
- **Delete Individual Jokes**: Remove specific jokes from your collection
- **Clear All**: Remove all saved jokes at once

### Technical Features
- **Error Handling**: Graceful fallbacks when APIs are unavailable
- **Local Storage**: Persistent joke storage without requiring an account
- **API Fallbacks**: Automatically tries alternative APIs if one fails
- **Security**: HTML escaping to prevent XSS attacks
- **Performance**: Optimized loading and smooth animations

## How to Use

1. Open `index.html` in your web browser
2. Click "Get a Joke" to fetch a random joke
3. Select different categories or API sources for variety
4. Use the action buttons:
   - **Share**: Share the joke with others
   - **Copy**: Copy to your clipboard
   - **Save**: Store the joke for later
5. View all saved jokes in the "Saved Jokes" section
6. Toggle dark mode with the moon/sun button

## APIs Used

### 1. Ninja Jokes API
- **URL**: `https://api.api-ninjas.com/v1/jokes`
- **Documentation**: [API Ninjas](https://api-ninjas.com/api/jokes)
- **Rate Limit**: Free tier available

### 2. Jokes.one API
- **URL**: `https://api.jokes.one/jokes/random`
- **Documentation**: [Jokes.one](https://jokes.one/)
- **No Authentication**: Required

### 3. icanhazdadjokes API
- **URL**: `https://icanhazdadjokes.com/json`
- **Documentation**: [icanhazdadjokes](https://icanhazdadjokes.com/api)
- **Simple & Reliable**: No authentication needed

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/doom1956/random-joke-generator.git
   ```

2. Navigate to the directory:
   ```bash
   cd random-joke-generator
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

4. Visit `http://localhost:8000` in your browser

## Local Storage

Jokes are saved in the browser's localStorage with the following data:
- Joke content
- Source API
- Timestamp of when saved
- Unique ID for each joke

Maximum 50 jokes can be stored. Older jokes are automatically removed when the limit is exceeded.

## Browser Compatibility

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Mobile browsers: ✅ Full support

## File Structure

```
random-joke-generator/
├── index.html          # Main HTML file
├── styles.css          # Styling with dark mode support
├── js/
│   ├── api.js         # API fetching logic
│   ├── storage.js     # Local storage management
│   ├── ui.js          # UI interactions and updates
│   └── app.js         # Main application logic
└── README.md          # This file
```

## Key Classes

### JokeAPI
Handles fetching jokes from various APIs with fallback mechanisms.

### JokeStorage
Manages saving, retrieving, and deleting jokes from localStorage.

### JokeUI
Manages all user interface updates and interactions.

### JokeApp
Main application class that coordinates between API, Storage, and UI.

## Future Enhancements

- [ ] Rate limiting display
- [ ] Joke categories implementation
- [ ] Export jokes as JSON/CSV
- [ ] Joke rating system (funny/not funny)
- [ ] Share to social media
- [ ] Search saved jokes
- [ ] Multiple user profiles
- [ ] API key configuration
- [ ] Joke statistics (most saved, most shared)
- [ ] Sound effects and notifications

## License

MIT License - Feel free to use and modify!

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Credits

- **Ninja Jokes API** - Free joke API
- **Jokes.one** - Joke API service
- **icanhazdadjokes** - Dad jokes API

Enjoy the laughs! 😂
