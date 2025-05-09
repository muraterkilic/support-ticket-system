package com.mckbilisim.supportapp.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter defaultGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        List<String> authorities = List.of(jwt.getClaimAsStringList("auth").toString().split("\\s+"));

        List<GrantedAuthority> grantedAuthorities = authorities.stream()
                .map(String::trim)
                .map(role -> role.replaceAll("[\\s\"\\[\\]]", ""))
                .filter(role -> !role.isBlank())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        if(grantedAuthorities.isEmpty()) {
            grantedAuthorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }

        Collection<GrantedAuthority> defaultAuthorities = defaultGrantedAuthoritiesConverter.convert(jwt);
        if (!defaultAuthorities.isEmpty()) {
            grantedAuthorities.addAll(defaultAuthorities);
        }

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        List<GrantedAuthority> finalGrantedAuthorities = grantedAuthorities;
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwts -> finalGrantedAuthorities);

        return jwtAuthenticationConverter.convert(jwt);
    }
}
