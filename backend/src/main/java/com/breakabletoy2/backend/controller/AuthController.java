package com.breakabletoy2.backend.controller;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.breakabletoy2.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @GetMapping("/spotify")
    public ResponseEntity<Void> authenticateWithSpotify () {
        URI redirectUri = authService.getAuthUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(redirectUri);
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @PostMapping("/spotify/callback")
    public ResponseEntity<Map> handleSpotifyCallback(@RequestParam String code) {
        try {
            ResponseEntity<Map> response = authService.handleSpotifyCallback(code);
            if (response.getStatusCode() != HttpStatus.OK) 
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body(Map.of("error", "Token no válido o ausente"));
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Map.of("error", "Error procesando la solicitud", "details", e.getMessage()));
        }
    }

    @PostMapping("/spotify/refresh")
    public ResponseEntity<Map> refreshSpotifyToken(@RequestParam String refresh_token) {
       
        try {
            Map<String, Object> newTokens = authService.refreshAccessToken(refresh_token);
            return ResponseEntity.ok(newTokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Map.of("error", "Error al refrescar el token", "details", e.getMessage()));
        }
    }

}
