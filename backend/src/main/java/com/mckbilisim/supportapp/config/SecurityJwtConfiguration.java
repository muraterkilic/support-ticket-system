package com.mckbilisim.supportapp.config;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.*;

import static com.mckbilisim.supportapp.security.SecurityUtils.JWT_ALGORITHM;

@Configuration
public class SecurityJwtConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityJwtConfiguration.class);

    @Value("${security.authentication.jwt.base64-secret}")
    private String jwtKey;

    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(getSecretKey()).macAlgorithm(JWT_ALGORITHM).build();
        return token -> {
            try {
                Jwt decodedJwt = jwtDecoder.decode(token);
                LOG.info("JWT decoded claims: {}", decodedJwt.getClaims());
                LOG.info("JWT headers: {}", decodedJwt.getHeaders());

                return decodedJwt;
            } catch (Exception e) {
                LOG.warn("JWT decoding error: {}", e.getMessage());
                throw e;
            }
        };
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(getSecretKey()));
    }

    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.from(jwtKey).decode();
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, JWT_ALGORITHM.getName());
    }
}
