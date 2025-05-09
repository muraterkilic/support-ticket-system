package com.mckbilisim.supportapp.repository;

import com.mckbilisim.supportapp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findByNameIn(List<String> names);
    Optional<Role> findByName(String roleName);
}
