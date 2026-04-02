package com.example.personal_finance_manager_backend.service;

import com.example.personal_finance_manager_backend.dto.LoginRequest;
import com.example.personal_finance_manager_backend.dto.TokenResponse;
import com.example.personal_finance_manager_backend.dto.RegisterRequest;
import com.example.personal_finance_manager_backend.dto.UserDTO;
import com.example.personal_finance_manager_backend.exception.ResourceNotFoundException;
import com.example.personal_finance_manager_backend.model.Roles;
import com.example.personal_finance_manager_backend.model.User;
import com.example.personal_finance_manager_backend.model.UserDetailsImpl;
import com.example.personal_finance_manager_backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder encoder, TokenService tokenService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    public TokenResponse registerUser(RegisterRequest request){

        Optional<User> userOptional = userRepository.findByEmail(request.email());

        if (userOptional.isPresent()) throw new RuntimeException("This e-mail is already taken!");

        User user = userRepository.save(new User(request.email(), request.name(),
                encoder.encode(request.password())));
        user.getRoles().add(Roles.ROLE_USER);

        userRepository.save(user);

        return this.loginUser(new LoginRequest(request.email(), request.password()));
    }

    public TokenResponse loginUser (LoginRequest request){

        try {
            UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(request.email(),
                    request.password());

            UserDetailsImpl userDetails = (UserDetailsImpl) authenticationManager.authenticate(login).getPrincipal();

            return new TokenResponse(tokenService.generateToken(userDetails.getUser()));
        } catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid credentials!");
        } catch (AuthenticationException e){
            throw new RuntimeException("Error to authenticate: ");
        }
    }

    public UserDTO getUserData(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated() && authentication != null){

            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

            return new UserDTO(user.getId(), user.getEmail(), user.getName());
        }

        return null;
    }
}
