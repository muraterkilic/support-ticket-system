package com.mckbilisim.supportapp.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequestDto {

    @NotNull
    @Size(min = 2, max = 50)
    private String username;

    @NotNull
    @Size(min = 2, max = 255)
    private String password;

    private boolean rememberMe;

    public LoginRequestDto(String username, String password, boolean rememberMe) {
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
    }
}
