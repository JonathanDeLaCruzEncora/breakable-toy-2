package com.breakabletoy2.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.net.URI;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.breakabletoy2.backend.service.AuthService;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    void testAuthenticateWithSpotify_Redirect() throws Exception {
        // Mock the behavior of AuthService
        URI mockUri = URI.create("https://accounts.spotify.com/authorize?mockParam=value");
        when(authService.getAuthUri()).thenReturn(mockUri);

        // Perform the GET request and validate the redirect
        mockMvc.perform(get("/auth/spotify"))
               .andExpect(status().isFound()) // HTTP 302
               .andExpect(header().string(HttpHeaders.LOCATION, mockUri.toString()));

        verify(authService, times(1)).getAuthUri();
    }

    @Test
    void testHandleSpotifyCallback_Success() throws Exception {
        // Mock a successful response from AuthService
        Map<String, String> mockResponse = Map.of("accessToken", "mockAccessToken");
        ResponseEntity<Map> mockEntity = ResponseEntity.ok(mockResponse);
        when(authService.handleSpotifyCallback("valid_code")).thenReturn(mockEntity);

        // Perform the POST request and validate the response
        mockMvc.perform(post("/auth/spotify/callback").param("code", "valid_code"))
               .andExpect(status().isOk()) // HTTP 200
               .andExpect(jsonPath("$.accessToken").value("mockAccessToken"));

        verify(authService, times(1)).handleSpotifyCallback("valid_code");
    }

    @Test
    void testHandleSpotifyCallback_Unauthorized() throws Exception {
        // Mock an unauthorized response from AuthService
        Map<String, String> mockError = Map.of("error", "Token no válido o ausente");
        ResponseEntity<Map> mockEntity = ResponseEntity.status(401).body(mockError);
        when(authService.handleSpotifyCallback("invalid_code")).thenReturn(mockEntity);

        // Perform the POST request and validate the unauthorized response
        mockMvc.perform(post("/auth/spotify/callback").param("code", "invalid_code"))
               .andExpect(status().isUnauthorized()) // HTTP 401
               .andExpect(jsonPath("$.error").value("Token no válido o ausente"));

        verify(authService, times(1)).handleSpotifyCallback("invalid_code");
    }

    @Test
    void testHandleSpotifyCallback_InternalServerError() throws Exception {
        // Mock an exception thrown by AuthService
        when(authService.handleSpotifyCallback("error_code")).thenThrow(new RuntimeException("Mock exception"));

        // Perform the POST request and validate the error response
        mockMvc.perform(post("/auth/spotify/callback").param("code", "error_code"))
               .andExpect(status().isInternalServerError()) // HTTP 500
               .andExpect(jsonPath("$.error").value("Error procesando la solicitud"))
               .andExpect(jsonPath("$.details").value("Mock exception"));

        verify(authService, times(1)).handleSpotifyCallback("error_code");
    }
}
