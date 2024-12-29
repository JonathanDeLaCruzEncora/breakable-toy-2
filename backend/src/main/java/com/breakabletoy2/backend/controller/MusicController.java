package com.breakabletoy2.backend.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.breakabletoy2.utils.RequestUtil;

@RestController
public class MusicController {
    
    @GetMapping("/albums/{id}")
    public ResponseEntity<Map<String, Object>> getArtistDetails(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String path = "/albums/" + id;
        return RequestUtil.RequestGet(authorizationHeader, path);
    }

    @GetMapping("/tracks/{id}")
    public ResponseEntity<Map<String, Object>> getTrackDetails(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String path = "/tracks/" + id;
        return RequestUtil.RequestGet(authorizationHeader, path);
    }

    @GetMapping("/playlists/{id}")
    public ResponseEntity<Map<String, Object>> getPlaylistDetails(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String path = "/playlists/" + id;
        return RequestUtil.RequestGet(authorizationHeader, path);
    }
}

