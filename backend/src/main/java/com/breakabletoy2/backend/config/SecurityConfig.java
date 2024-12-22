package com.breakabletoy2.backend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Desactiva CSRF si no lo necesitas (útil para desarrollo)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/spotify/**").permitAll() // Permitir rutas de autenticación con Spotify
                .anyRequest().authenticated() // Bloquear cualquier otra ruta
            );
        return http.build();
    }
}
