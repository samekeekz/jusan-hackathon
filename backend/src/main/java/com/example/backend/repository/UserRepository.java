package com.example.backend.repository;

import com.example.backend.model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(int id);

//    @Query("select CASE when count(s) > 0 then true else false end from User s where s.username = ?1")
//    Boolean selectExistsUsername(String username);
}
