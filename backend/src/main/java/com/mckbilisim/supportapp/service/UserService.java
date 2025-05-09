package com.mckbilisim.supportapp.service;

import com.mckbilisim.supportapp.dto.request.UserRequestDto;
import com.mckbilisim.supportapp.dto.response.UserResponseDto;
import com.mckbilisim.supportapp.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserResponseDto> findAll();

    UserResponseDto finByUserId(Long userId);

    UserResponseDto createRegister(UserRequestDto dto);

    Optional<User> getUserWithAuthorities();
}
