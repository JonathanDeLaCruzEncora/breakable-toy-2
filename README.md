# Breakable Toy II - by Jonathan De La Cruz 

This is an app that uses the Spotify API 🎵 that allows you to fetch your Top Artists, but also any Artist, Album, Track or public Playlist.

The app was made with:
- **Frontend:** React, Next.js and TypeScript 🖥️
- **Styling:** Material UI 🎨
- **Backend:** Java and Spring Boot 🛠️
- **Testing:** JUnit and Jest ✍️

> [!NOTE]
> This project uses Docker to simplify setup. You can follow the steps below to run the app in Docker.

## Running the App with Docker

1. **Clone the repository**:
    ```bash
    git clone https://github.com/JonathanDeLaCruzEncora/breakable-toy-2
    cd breakable-toy-2
    ```

2. **Build and run the Docker containers**:
    In the root of the project, run:
    ```bash
    docker-compose up --build
    ```
    This command will build the frontend and backend containers and start them.

3. **Access the app**:
    - The frontend should now be available at [http://localhost:3000](http://localhost:3000).
    - The backend should be running on [http://localhost:8080](http://localhost:8080).


After this the app should be running 🙏.
