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

### 1. Clone the repository

git clone https://github.com/yourusername/movie-explorer-app.git
cd movie-explorer-app
