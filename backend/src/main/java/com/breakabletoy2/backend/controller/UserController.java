package com.breakabletoy2.backend.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.breakabletoy2.utils.RequestUtil;

@RestController
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(@RequestHeader("Authorization") String authorizationHeader) {
        return RequestUtil.RequestGet(authorizationHeader, "/me");
    }

    @GetMapping("/me/top/artists")
    public ResponseEntity<Map<String, Object>> getTopArtists(@RequestHeader("Authorization") String authorizationHeader) {
        return RequestUtil.RequestGet(authorizationHeader, "/me/top/artists?limit=6");
    }

    @GetMapping("/search")
    public String search(@RequestParam String query) {
        // Lógica para buscar artistas, álbumes o pistas
        return "Resultados de búsqueda para: " + query;
    }
}
