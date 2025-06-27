package com.example.codingchallenge.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserHomeController {

    @GetMapping("/home")
    public String userHome() {
        return "Welcome, USER!";
    }
}
