package com.mckbilisim.supportapp.controller;

import com.mckbilisim.supportapp.dto.request.TicketRequestDto;
import com.mckbilisim.supportapp.dto.response.TicketResponseDto;
import com.mckbilisim.supportapp.security.SecurityUtils;
import com.mckbilisim.supportapp.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/tickets")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_USER')")
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<TicketResponseDto> createTicket(
            @Valid @RequestBody TicketRequestDto dto
    ) {
        return ResponseEntity.ok(ticketService.createTicket(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<TicketResponseDto> getMyTickets() {
        String username = SecurityUtils.getCurrentUserLogin().orElseThrow();
        return ticketService.getCurrentUserTickets(username);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDto> getTicketDetail(@PathVariable Long id) {
        String username = SecurityUtils.getCurrentUserLogin().orElseThrow();
        return ResponseEntity.ok(ticketService.getTicketByIdForCurrentUser(id, username));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<TicketResponseDto> closeTicket(@PathVariable Long id) {
        String username = SecurityUtils.getCurrentUserLogin().orElseThrow();
        return ResponseEntity.ok(ticketService.closeTicket(id, username));
    }
}
