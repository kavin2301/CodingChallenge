package com.example.codingchallenge.controller;

import com.example.codingchallenge.entity.Book;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private Book testBook;

    @BeforeEach
    public void setup() throws Exception {
        testBook = new Book("9999999999999", "JUnit Basics", "Test Author", 2025);

        mockMvc.perform(delete("/api/books/" + testBook.getIsbn()));

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testBook)))
                .andExpect(status().isCreated());
    }

    @Test
    public void testAddBook() throws Exception {
        Book newBook = new Book("8888888888888", "New Book", "New Author", 2024);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newBook)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.isbn").value("8888888888888"));
    }

    @Test
    public void testGetAllBooks() throws Exception {
        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetBookByIsbn() throws Exception {
        mockMvc.perform(get("/api/books/" + testBook.getIsbn()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isbn").value(testBook.getIsbn()));
    }

    @Test
    public void testUpdateBook() throws Exception {
        Book updated = new Book(testBook.getIsbn(), "Updated Title", "Updated Author", 2026);

        mockMvc.perform(put("/api/books/" + testBook.getIsbn())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Title"));
    }

    @Test
    public void testDeleteBook() throws Exception {
        mockMvc.perform(delete("/api/books/" + testBook.getIsbn()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/books/" + testBook.getIsbn()))
                .andExpect(status().isNotFound());
    }
}