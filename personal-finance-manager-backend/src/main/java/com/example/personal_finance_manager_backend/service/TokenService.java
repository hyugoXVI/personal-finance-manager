package com.example.personal_finance_manager_backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.personal_finance_manager_backend.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
public class TokenService {

    @Value("${spring.security.key}")
    private String secret;

    public String generateToken(User user){

        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.create()
                .withIssuer("pb-backend")
                .withSubject(user.getEmail())
                .withIssuedAt(Instant.now())
                .withExpiresAt(getExpireTime())
                .withClaim("roles", user.getRoles().stream()
                        .map(Enum::name).toList())
                .sign(algorithm);
    }

    public Optional<String> validateToken(String token) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return Optional.of(JWT.require(algorithm)
                    .withIssuer("pb-backend")
                    .build()
                    .verify(token)
                    .getSubject());
        } catch (JWTVerificationException e) {
            return Optional.empty();
        }
    }

    private Instant getExpireTime(){

        return Instant.now().plus(2, ChronoUnit.HOURS);
    }

}
