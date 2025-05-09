package com.mckbilisim.supportapp.bootstrap;

import com.mckbilisim.supportapp.model.Role;
import com.mckbilisim.supportapp.model.User;
import com.mckbilisim.supportapp.repository.RoleRepository;
import com.mckbilisim.supportapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BootstrapData implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public BootstrapData(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        createRolesIfNotExists();
        createAdminUserIfNotExists();
        createUserIfNotExists();
    }

    private void createRolesIfNotExists() {
        List<String> roles = List.of("ROLE_ADMIN", "ROLE_USER");

        for (String roleName : roles) {
            roleRepository.findByName(roleName).orElseGet(() -> {
                Role role = new Role();
                role.setName(roleName);
                return roleRepository.save(role);
            });
        }
    }

    private void createAdminUserIfNotExists() {
        if (userRepository.findOneByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));

            List<Role> allRoles = roleRepository.findAll();
            admin.setRoles(allRoles);
            userRepository.save(admin);
        }
    }

    private void createUserIfNotExists() {
        if (userRepository.findOneByUsername("user").isEmpty()) {
            Role userRole = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user"));
            user.addRole(userRole);

            userRepository.save(user);
        }
    }
}
