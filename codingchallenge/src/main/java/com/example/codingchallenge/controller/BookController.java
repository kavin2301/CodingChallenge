package com.example.codingchallenge.controller;

import com.example.codingchallenge.entity.Book;
import com.example.codingchallenge.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll(); 
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable String isbn) {
        return ResponseEntity.of(bookRepository.findById(isbn));
    }

    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        return bookRepository.existsById(book.getIsbn())
                ? ResponseEntity.status(HttpStatus.CONFLICT).body("Book already exists")
                : ResponseEntity.status(HttpStatus.CREATED).body(bookRepository.save(book));
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<Book> updateBook(@PathVariable String isbn, @RequestBody Book updatedBook) {
        Book existing = bookRepository.findById(isbn)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        existing.setTitle(updatedBook.getTitle());
        existing.setAuthor(updatedBook.getAuthor());
        existing.setPublicationYear(updatedBook.getPublicationYear());

        return ResponseEntity.ok(bookRepository.save(existing));
    }


    @DeleteMapping("/{isbn}")
    public ResponseEntity<String> deleteBook(@PathVariable String isbn) {
        if (!bookRepository.existsById(isbn)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
        }
        bookRepository.deleteById(isbn);
        return ResponseEntity.ok("Book deleted successfully");
    }
}