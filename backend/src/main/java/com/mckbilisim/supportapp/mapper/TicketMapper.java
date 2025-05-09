package com.mckbilisim.supportapp.mapper;

import com.mckbilisim.supportapp.dto.request.TicketRequestDto;
import com.mckbilisim.supportapp.dto.response.ResponseTicketDTO;
import com.mckbilisim.supportapp.dto.response.TicketResponseDto;
import com.mckbilisim.supportapp.model.Ticket;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TicketMapper {
    Ticket toEntity(TicketRequestDto dto);

    @Mapping(target = "adminResponse", source = "adminResponse")
    @Mapping(target = "username", source = "user.username")
    TicketResponseDto toDto(Ticket ticket);

    List<TicketResponseDto> toDto(List<Ticket> tickets);

    ResponseTicketDTO toAdminResponseDto(Ticket ticket);
}
