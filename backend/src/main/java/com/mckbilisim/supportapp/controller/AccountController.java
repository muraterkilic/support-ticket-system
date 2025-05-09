package com.mckbilisim.supportapp.controller;

import com.mckbilisim.supportapp.dto.request.UserRequestDto;
import com.mckbilisim.supportapp.dto.response.UserResponseDto;
import com.mckbilisim.supportapp.mapper.UserMapper;
import com.mckbilisim.supportapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping(value = "createRegister")
    public UserResponseDto createRegister(@RequestBody UserRequestDto dto) {
        return userService.createRegister(dto);
    }

    @GetMapping
    public UserResponseDto getAccount(){
        return userService
                .getUserWithAuthorities()
                .map(userMapper::toDto)
                .orElseThrow(() -> new RuntimeException("User could not be found"));
    }

    @GetMapping("/{id}")
    public UserResponseDto findByUserId(@PathVariable Long userId) {
        return userService.finByUserId(userId);
    }
}