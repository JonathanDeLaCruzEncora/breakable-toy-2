package com.breakabletoy2.backend.service;

import java.net.URI;
import java.util.Map;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Service
public class AuthService {
    @Value("${spotify.client.id}")
    private String clientId;

    @Value("${spotify.client.secret}")
    private String clientSecret;

    // @GetMapping("/auth/spotify")
    public URI getAuthUri() {
        
        String redirectUri = "http://localhost:3000/callback";
        String scope = "user-top-read user-read-private";
        String encodedRedirectUri = URLEncoder.encode(redirectUri, StandardCharsets.UTF_8);
        String encodedScope = URLEncoder.encode(scope, StandardCharsets.UTF_8);
        String authUrl = "https://accounts.spotify.com/authorize" +
                        "?client_id=" + clientId +
                        "&response_type=code" +
                        "&redirect_uri=" + encodedRedirectUri +
                        "&scope=" + encodedScope;
        // HttpHeaders headers = new HttpHeaders();
        return URI.create(authUrl);
        // headers.setLocation(URI.create(authUrl));
        // return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    // @GetMapping("/auth/spotify/callback")
    public ResponseEntity<Map> handleSpotifyCallback(@RequestParam String code) {
            RestTemplate restTemplate = new RestTemplate();
            String tokenUrl = "https://accounts.spotify.com/api/token";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.setBasicAuth(clientId, clientSecret);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "authorization_code");
            body.add("code", code);
            body.add("redirect_uri", "http://localhost:3000/callback"); 
            
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
            return restTemplate.postForEntity(tokenUrl, request, Map.class);
    }

}
