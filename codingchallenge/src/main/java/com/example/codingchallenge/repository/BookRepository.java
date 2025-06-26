package com.example.codingchallenge.repository;

import com.example.codingchallenge.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, String> {
}