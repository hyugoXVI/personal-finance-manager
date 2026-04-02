package com.example.personal_finance_manager_backend.exception;

import java.time.LocalDateTime;

public record ErrorResponse(LocalDateTime timestamp,
                            int status,
                            String error,
                            String message,
                            String path
                            ) {}
