package com.breakabletoy2.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class apiController {

    @PostMapping("/auth/spotify")
    public String authenticateWithSpotify() {
        // Lógica para manejar el flujo de OAuth 2.0 y devolver el token de acceso
        return "Access token obtenido";
    }

    @GetMapping("/me/top/artists")
    public String getTopArtists() {
        // Lógica para recuperar los artistas más escuchados del usuario desde Spotify
        return "Lista de artistas principales";
    }

    @GetMapping("/artists/{id}")
    public String getArtistDetails(@PathVariable String id) {
        // Lógica para obtener detalles de un artista específico
        return "Detalles del artista con ID: " + id;
    }

    @GetMapping("/albums/{id}")
    public String getAlbumDetails(@PathVariable String id) {
        // Lógica para obtener detalles de un álbum específico
        return "Detalles del álbum con ID: " + id;
    }

    @GetMapping("/search")
    public String search(@RequestParam String query) {
        // Lógica para buscar artistas, álbumes o pistas
        return "Resultados de búsqueda para: " + query;
    }
}