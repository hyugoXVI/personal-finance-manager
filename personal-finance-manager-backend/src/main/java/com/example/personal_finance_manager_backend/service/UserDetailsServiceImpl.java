package com.example.personal_finance_manager_backend.service;

import com.example.personal_finance_manager_backend.model.User;
import com.example.personal_finance_manager_backend.model.UserDetailsImpl;
import com.example.personal_finance_manager_backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public final class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("Invalid credentials."));

        return new UserDetailsImpl(user);
    }
}
