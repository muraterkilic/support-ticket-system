package com.mckbilisim.supportapp.security;

import com.mckbilisim.supportapp.model.Role;
import com.mckbilisim.supportapp.model.User;
import com.mckbilisim.supportapp.repository.UserRepository;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class DomainUserDetailService implements UserDetailsService {

    private static final Logger LOG = LoggerFactory.getLogger(DomainUserDetailService.class);

    private final UserRepository userRepository;

    public DomainUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(final String login) {
        LOG.debug("Authenticating {}", login);

        boolean isEmail = new EmailValidator().isValid(login, null);
        String loginKey = isEmail ? login : login.toLowerCase(Locale.ENGLISH);

        return userRepository
                .findOneWithRolesByUsername(loginKey)
                .map(user -> createSpringSecurityUser(loginKey, user))
                .orElseThrow(() -> new UsernameNotFoundException("User " + loginKey + " was not found in the database"));
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String login, User user) {
        List<SimpleGrantedAuthority> grantedAuthorities = user.getRoles().stream()
                .map(Role::getName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                grantedAuthorities
        );
    }
}
