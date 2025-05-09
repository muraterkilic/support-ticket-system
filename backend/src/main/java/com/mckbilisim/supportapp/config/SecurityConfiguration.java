package com.mckbilisim.supportapp.config;

import com.mckbilisim.supportapp.handler.CustomAccessDeniedHandler;
import com.mckbilisim.supportapp.security.AuthoritiesConstants;
import com.mckbilisim.supportapp.web.filter.SpaWebFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {

    @Value("${security.content-security-policy}")
    private String contentSecurityPolicy;

    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    public SecurityConfiguration(CustomAccessDeniedHandler customAccessDeniedHandler) {
        this.customAccessDeniedHandler = customAccessDeniedHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(List.of("*"));
                    corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                    corsConfiguration.setAllowedHeaders(List.of("*"));
                    return corsConfiguration;
                }))
                .csrf(csrf -> csrf.disable())
                .addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class)
                .headers(headers ->
                        headers
                                .contentSecurityPolicy(csp -> csp.policyDirectives(contentSecurityPolicy))
                                .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                                .referrerPolicy(referrer ->
                                        referrer.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                                )
                )
                .authorizeHttpRequests(authz ->
                        authz
                                .requestMatchers(
                                        mvc.pattern("/"),
                                        mvc.pattern("/index.html"),
                                        mvc.pattern("/*.js"),
                                        mvc.pattern("/*.css"),
                                        mvc.pattern("/*.ico"),
                                        mvc.pattern("/assets/**"),
                                        mvc.pattern("/locales/**"),
                                        mvc.pattern("/*.json"),
                                        mvc.pattern("/*.map"),
                                        mvc.pattern("/*.txt")
                                ).permitAll()
                                .requestMatchers(mvc.pattern("/index.html"), mvc.pattern("/*.js"), mvc.pattern("/*.txt"), mvc.pattern("/*.json"), mvc.pattern("/*.map"), mvc.pattern("/*.css")).permitAll()
                                .requestMatchers(mvc.pattern("/*.ico"), mvc.pattern("/*.png"), mvc.pattern("/*.svg"), mvc.pattern("/*.webapp")).permitAll()
                                .requestMatchers(mvc.pattern("/app/**")).permitAll()
                                .requestMatchers(mvc.pattern("/api/user/**")).hasAuthority("ROLE_USER")
                                .requestMatchers(mvc.pattern("/content/**")).permitAll()
                                .requestMatchers(mvc.pattern("/swagger-ui/**")).permitAll()
                                .requestMatchers(mvc.pattern("/v3/api-docs/**")).permitAll()
                                .requestMatchers(mvc.pattern(HttpMethod.POST, "/api/authenticate")).permitAll()
                                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/authenticate")).permitAll()
                                .requestMatchers(mvc.pattern("/api/register")).permitAll()
                                .requestMatchers(mvc.pattern("/api/admin/**")).hasAuthority(AuthoritiesConstants.ADMIN)
                                .requestMatchers(mvc.pattern("/api/**")).authenticated()
                                .requestMatchers(mvc.pattern("/management/health")).permitAll()
                                .requestMatchers(mvc.pattern("/management/health/**")).permitAll()
                                .requestMatchers(mvc.pattern("/management/info")).permitAll()
                                .requestMatchers(mvc.pattern("/management/**")).hasAuthority(AuthoritiesConstants.ADMIN)
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exceptions ->
                        exceptions
                                .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                                .accessDeniedHandler(customAccessDeniedHandler)
                )
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwtConfigurer -> jwtConfigurer
                                .jwtAuthenticationConverter(new CustomJwtAuthenticationConverter())
                        )
                );

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector handlerMappingIntrospector) {
        return new MvcRequestMatcher.Builder(handlerMappingIntrospector);
    }
}
