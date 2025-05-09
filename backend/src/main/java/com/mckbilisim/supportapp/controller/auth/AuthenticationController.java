package com.mckbilisim.supportapp.controller.auth;

import com.mckbilisim.supportapp.dto.request.LoginRequestDto;
import com.mckbilisim.supportapp.security.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.mckbilisim.supportapp.security.SecurityUtils.AUTHORITIES_KEY;
import static com.mckbilisim.supportapp.security.SecurityUtils.JWT_ALGORITHM;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationController.class);
    private final JwtEncoder jwtEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Value("${security.authentication.jwt.token-validity-in-seconds:0}")
    private long tokenValidityInSeconds;

    @Value("${security.authentication.jwt.token-validity-in-seconds-for-remember-me:0}")
    private long tokenValidityInSecondsForRememberMe;

    public AuthenticationController(JwtEncoder jwtEncoder, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.jwtEncoder = jwtEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginRequestDto loginDto, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(),
                loginDto.getPassword()
        );

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = this.createToken(authentication, loginDto.isRememberMe());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(jwt);

        boolean isAuthenticated = SecurityUtils.isAuthenticated();
        Stream<String> authoritiess = SecurityUtils.getAuthorities(authentication);
        authoritiess.forEach(auth -> System.out.println(auth));
        System.out.println(isAuthenticated);

        return new ResponseEntity<>(new JWTToken(jwt, loginDto.getUsername()), httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/authenticate/check")
    public ResponseEntity<Boolean> isAuthenticated() {
        return new ResponseEntity<>(SecurityUtils.isAuthenticated(), HttpStatus.OK);
    }

    public String createToken(Authentication authentication, boolean rememberMe) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));

        Instant now = Instant.now();
        Instant validity;
        if (rememberMe) {
            validity = now.plus(this.tokenValidityInSecondsForRememberMe, ChronoUnit.SECONDS);
        } else {
            validity = now.plus(this.tokenValidityInSeconds, ChronoUnit.SECONDS);
        }

        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }
}
