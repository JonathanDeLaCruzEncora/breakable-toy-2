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
@RequestMapping("/artists")
public class ArtistController {

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getArtistDetails(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String path = "/artists/" + id;
        return RequestUtil.RequestGet(authorizationHeader, path);
    }

    @GetMapping("/{id}/top-tracks")
    public ResponseEntity<Map<String, Object>> getTopSongs(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String path = "/artists/" + id + "/top-tracks";
        return RequestUtil.RequestGet(authorizationHeader, path);
    }

    @GetMapping("/{id}/albums")
    public ResponseEntity<Map<String, Object>> getArtistAlbums(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String path = "/artists/" + id + "/albums?include_groups=album,single";
        return RequestUtil.RequestGet(authorizationHeader, path);
    }

}
