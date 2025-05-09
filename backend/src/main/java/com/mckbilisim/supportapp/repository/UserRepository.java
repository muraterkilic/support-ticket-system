package com.mckbilisim.supportapp.repository;

import com.mckbilisim.supportapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneWithRolesByUsername(String login);

    Optional<User> findOneByUsername(String username);
}
