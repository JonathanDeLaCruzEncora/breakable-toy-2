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
@RequestMapping("/albums")
public class AlbumController {
    

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getArtistDetails(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String id) {
        String path = "/albums/" + id;
        return RequestUtil.RequestGet(authorizationHeader, path);
    }
}

