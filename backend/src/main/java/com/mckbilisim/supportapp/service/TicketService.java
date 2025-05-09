package com.mckbilisim.supportapp.service;

import com.mckbilisim.supportapp.dto.request.TicketRequestDto;
import com.mckbilisim.supportapp.dto.request.TicketUpdateRequestDto;
import com.mckbilisim.supportapp.dto.response.TicketResponseDto;
import com.mckbilisim.supportapp.utils.TicketEnumStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TicketService {

    TicketResponseDto createTicket(TicketRequestDto dto);

    List<TicketResponseDto> getCurrentUserTickets(String username);

    TicketResponseDto getTicketByIdForCurrentUser(Long ticketId, String username);

    TicketResponseDto closeTicket(Long ticketId, String username);

    Page<TicketResponseDto> getTicketsByStatus(TicketEnumStatus status, Pageable pageable);

    Page<TicketResponseDto> getAllTickets(Pageable pageable);

    TicketResponseDto updateTicket(Long id, TicketUpdateRequestDto dto);

    TicketResponseDto getTicketForAdmin(Long id);
}
