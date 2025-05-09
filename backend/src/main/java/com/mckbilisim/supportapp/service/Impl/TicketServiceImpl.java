package com.mckbilisim.supportapp.service.Impl;

import com.mckbilisim.supportapp.dto.request.TicketRequestDto;
import com.mckbilisim.supportapp.dto.request.TicketUpdateRequestDto;
import com.mckbilisim.supportapp.dto.response.TicketResponseDto;
import com.mckbilisim.supportapp.exception.ResourceNotFoundException;
import com.mckbilisim.supportapp.mapper.TicketMapper;
import com.mckbilisim.supportapp.model.Ticket;
import com.mckbilisim.supportapp.model.User;
import com.mckbilisim.supportapp.repository.TicketRepository;
import com.mckbilisim.supportapp.repository.UserRepository;
import com.mckbilisim.supportapp.security.SecurityUtils;
import com.mckbilisim.supportapp.service.TicketService;
import com.mckbilisim.supportapp.utils.TicketEnumStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketMapper ticketMapper;

    @Transactional
    @Override
    @CacheEvict(value = {"userTickets", "allTickets", "ticketsByStatus", "ticketById"}, allEntries = true)
    public TicketResponseDto createTicket(TicketRequestDto dto) {
        String username = SecurityUtils.getCurrentUserLogin().orElseThrow();
        User user = userRepository.findOneByUsername(username).orElseThrow();

        Ticket ticket = ticketMapper.toEntity(dto);
        ticket.setUser(user);
        ticket.setStatus(TicketEnumStatus.OPEN);

        return ticketMapper.toDto(ticketRepository.save(ticket));
    }

    @Transactional(readOnly = true)
    @Override
    @Cacheable(value = "userTickets", key = "#username")
    public List<TicketResponseDto> getCurrentUserTickets(String username) {
        return ticketRepository.findAllByUser_Username(username)
                .stream()
                .map(ticketMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    @Override
    @Cacheable(value = "ticketById", key = "#ticketId + '_' + #username")
    public TicketResponseDto getTicketByIdForCurrentUser(Long ticketId, String username) {
        Ticket ticket = ticketRepository.findByIdAndUser_Username(ticketId, username)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found or not yours"));
        return ticketMapper.toDto(ticket);
    }

    @Transactional
    @Override
    @CacheEvict(value = {"ticketById", "userTickets", "allTickets", "ticketsByStatus"}, allEntries = true)
    public TicketResponseDto closeTicket(Long ticketId, String username) {
        Ticket ticket = ticketRepository.findByIdAndUser_Username(ticketId, username)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found or not yours"));

        ticket.setStatus(TicketEnumStatus.CLOSED);
        return ticketMapper.toDto(ticketRepository.save(ticket));
    }

    @Override
    @Cacheable(value = "ticketsByStatus", key = "#status + '_' + #pageable.pageNumber + '_' + #pageable.pageSize")
    public Page<TicketResponseDto> getTicketsByStatus(TicketEnumStatus status, Pageable pageable) {
        return ticketRepository.findByStatus(status, pageable)
                .map(ticketMapper::toDto);
    }

    @Override
    public Page<TicketResponseDto> getAllTickets(Pageable pageable) {
        return ticketRepository.findAll(pageable)
                .map(ticketMapper::toDto);
    }

    @Override
    @CacheEvict(value = {"ticketById", "allTickets", "ticketsByStatus", "adminTicket"}, allEntries = true)
    public TicketResponseDto updateTicket(Long id, TicketUpdateRequestDto dto) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));

        if (dto.getStatus() == TicketEnumStatus.RESPONDED || dto.getStatus() == TicketEnumStatus.CLOSED) {
            ticket.setStatus(dto.getStatus());
            ticket.setAdminResponse(dto.getAdminResponse());
        } else {
            throw new IllegalArgumentException("Yalnızca cevaplama (RESPONDED) veya kapatma (CLOSED) işlemleri yapılabilir.");
        }

        Ticket updated = ticketRepository.save(ticket);
        return ticketMapper.toDto(updated);
    }

    @Override
    @Cacheable(value = "adminTicket", key = "#id")
    public TicketResponseDto getTicketForAdmin(Long id) {
        return ticketRepository.findById(id)
                .map(ticketMapper::toDto)
                .orElseThrow();
    }
}
