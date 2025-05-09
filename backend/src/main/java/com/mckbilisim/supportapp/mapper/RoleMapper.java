package com.mckbilisim.supportapp.mapper;

import com.mckbilisim.supportapp.dto.request.RoleRequestDto;
import com.mckbilisim.supportapp.dto.response.RoleResponseDto;
import com.mckbilisim.supportapp.model.Role;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(target = "users", ignore = true)
    Role toEntity(RoleRequestDto dto);

    RoleResponseDto toDto(Role role);

    List<RoleResponseDto> toDto(List<Role> roles);
}
