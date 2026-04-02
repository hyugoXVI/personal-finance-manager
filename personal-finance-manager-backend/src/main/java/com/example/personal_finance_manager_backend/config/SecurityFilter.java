package com.example.personal_finance_manager_backend.config;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.personal_finance_manager_backend.model.User;
import com.example.personal_finance_manager_backend.model.UserDetailsImpl;
import com.example.personal_finance_manager_backend.repository.UserRepository;
import com.example.personal_finance_manager_backend.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final TokenService tokenService;

    public SecurityFilter(UserRepository userRepository, TokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Optional<String> tokenOptional = recoverToken(request);

        if (tokenOptional.isPresent()){

            String email = tokenService.validateToken(tokenOptional.get()).orElseThrow(() ->
                    new JWTVerificationException("Invalid token!"));

            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid credentials."));
            UserDetailsImpl userDetails = new UserDetailsImpl(user);

            UsernamePasswordAuthenticationToken loginAuthentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                   userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(loginAuthentication);
        }

        filterChain.doFilter(request, response);
    }

    private Optional<String> recoverToken(HttpServletRequest request){

        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")){
            return Optional.of(token.replace("Bearer ",""));
        }

        return Optional.empty();
    }
}
