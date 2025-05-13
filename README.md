# Movie Explorer App

The **Movie Explorer App** is a movie browsing application built with **React** and **Material-UI** that allows users to search, browse, and view movies. Users can filter movies by genre, year, and sort by rating or latest release. It also provides functionality to add and remove movies to/from favorites, with persistent data storage via `localStorage`.

## Features

- **Browse Movies**: View popular movies or search for specific genres.
- **Movie Details**: View detailed information about a selected movie, including its cast, trailer, and genres.
- **Favorites**: Add movies to your favorite list, which is stored in `localStorage` and can be accessed later.
- **Search**: Search movies by title and filter by release year.
- **Dark/Light Mode**: Toggle between dark and light themes using Material-UI's theme provider.
- **Responsive Design**: Fully responsive design, suitable for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend API**: TMDb API (The Movie Database)
- **State Management**: React useState, useEffect hooks
- **Routing**: React Router
- **Authentication**: Simulated login using `localStorage`
- **CSS**: Styled using Material-UI components, custom CSS for the layout

## Setup Instructions

Follow the steps below to set up and run the app locally:

1. Clone the repository
```
git clone https://github.com/yourusername/movie-explorer-app.git
cd movie-explorer-app
```

2. Install dependencies
Make sure you have Node.js installed on your machine. Then, install the necessary dependencies:
```
npm install
```

3. Configure TMDb API
Get your TMDb API key from here.
Replace the API key in the src/api/tmdb.js file with your own API key.
```
const API_KEY = 'YOUR_API_KEY';
```

4. Start the development server
Once the dependencies are installed and API key is configured, start the development server:
```
npm start or npm run dev
```
The app will be running on http://localhost:3000.

## Folder Structure**
```
movie-explorer-app/
│
├── public/                  # Public assets like index.html, images
├── src/                     # Source code
│   ├── api/                 # API-related functions (e.g., TMDb API configuration)
│   ├── components/          # Reusable components (e.g., MovieCard, Navbar, Sidebar)
│   ├── context/             # Context for global state management (e.g., ThemeContext)
│   ├── pages/               # Page components (e.g., Home, MovieDetailsPage)
│   ├── styles/              # Custom CSS files (e.g., global.css, App.css)
│   ├── App.js               # Main application component
│   └── index.js             # Entry point to the application
│
├── package.json             # Project metadata and dependencies
└── README.md                # This file
```

## Components
1. MovieCard:
Displays individual movie information including title, poster, rating, and a button to add/remove from favorites.

2. MoviesGrid:
Renders a grid of movie cards based on the movies passed as a prop.

3. Sidebar:
Contains a list of movie genres. Clicking on a genre will update the movie list to show movies from that genre.

4. Navbar:
Navigation bar at the top with links for "Movies", "Favorites", and "Logout". The logout button clears the login state from localStorage.

5. Login:
Simple login form that uses hardcoded credentials. On successful login, the user is redirected to the Home page.

6. MovieDetails:
Displays detailed information about a selected movie, including the cast, genres, and a YouTube trailer (if available).

7. SearchBar:
Allows users to search for movies by title and filter by release year.

8. TopBar:
Displays the "Sort by Latest" or "Sort by Rating" options in the header, allowing the user to sort movie results.

9. FavoritesPage:
Shows a list of favorite movies that the user has added. The list is saved in localStorage.


## How It Works
Login: The app uses a hardcoded username (**_user123_**) and password (**_password123_**) to simulate user authentication. Once logged in, the app stores the authentication status in localStorage.

Movies Page: On the homepage, movies are displayed in a grid layout. Users can filter movies by genre, and sort them by rating or release date.

Favorites: Users can add movies to their favorite list. The favorite movies are saved to localStorage and can be viewed in the "Favorites" page.

Movie Details: Clicking on a movie card redirects to a detailed page with information about the movie, including its trailer (if available) and cast.

Theme: The app supports light and dark modes. Users can toggle between the modes using a button in the navbar.

## Troubleshooting
No movies found: Ensure the selected genre is valid, and the API key is correctly configured.

Unable to fetch data: Check if there are any network issues or API limits.

Authentication Error: Make sure localStorage is being cleared correctly after logout.

## License
This project is licensed under the MIT License
