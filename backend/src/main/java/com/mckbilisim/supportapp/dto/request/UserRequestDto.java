package com.mckbilisim.supportapp.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class UserRequestDto {

    @NotNull
    private String username;
    @NotNull
    private String password;
    private List<String> roles;
}
