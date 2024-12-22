package com.breakabletoy2.backend.controller;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class apiController {

    @Value("${spotify.client.id}")
    private String clientId;

    @Value("${spotify.client.secret}")
    private String clientSecret;

    @GetMapping("/auth/spotify")
    public ResponseEntity<Void> authenticateWithSpotify() {
        
        String redirectUri = "http://localhost:3000/callback";
        String scope = "user-top-read user-read-private";
        String encodedRedirectUri = URLEncoder.encode(redirectUri, StandardCharsets.UTF_8);
        String encodedScope = URLEncoder.encode(scope, StandardCharsets.UTF_8);
        String authUrl = "https://accounts.spotify.com/authorize" +
                        "?client_id=" + clientId +
                        "&response_type=code" +
                        "&redirect_uri=" + encodedRedirectUri +
                        "&scope=" + encodedScope;
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(authUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/auth/spotify/callback")
    public ResponseEntity<Map<String,Object>> handleSpotifyCallback(@RequestParam String code) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String tokenUrl = "https://accounts.spotify.com/api/token";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.setBasicAuth(clientId, clientSecret);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "authorization_code");
            body.add("code", code);
            body.add("redirect_uri", "http://localhost:3000/callback"); // Debe coincidir con la URI registrada en Spotify
            
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                // Map<String, Object> responseBody = response.getBody();
                // String accessToken = (String) responseBody.get("access_token");
                return ResponseEntity.ok(response.getBody());
            } else {
                // Error en la respuesta
                return ResponseEntity.status(response.getStatusCode())
                                     .body(Map.of("error", "Error al obtener el token", "details", response.getBody()));
            }
        } catch (Exception e) {
            // Manejo de errores
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", "Error procesando la solicitud", "details", e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(@RequestHeader("Authorization") String authorizationHeader) {
        // Verifica que la cabecera Authorization contiene "Bearer {access_token}"
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Token no válido o ausente"));
        }

        String accessToken = authorizationHeader.substring(7); // Quita "Bearer " del inicio
        String spotifyUrl = "https://api.spotify.com/v1/me";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                spotifyUrl,
                HttpMethod.GET,
                request,
                Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return ResponseEntity.ok(response.getBody());
            } else {
                return ResponseEntity.status(response.getStatusCode()).body(Map.of("error", "No se pudo obtener el perfil"));
            }

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(Map.of("error", e.getResponseBodyAsString()));
        }
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