package com.mckbilisim.supportapp.controller;

import com.mckbilisim.supportapp.dto.request.TicketUpdateRequestDto;
import com.mckbilisim.supportapp.dto.response.TicketResponseDto;
import com.mckbilisim.supportapp.service.TicketService;
import com.mckbilisim.supportapp.utils.TicketEnumStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/tickets")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminTicketController {

    private final TicketService ticketService;

    @GetMapping
    public ResponseEntity<Page<TicketResponseDto>> getAllTickets(
            @RequestParam(required = false) TicketEnumStatus status,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        if (status != null) {
            return ResponseEntity.ok(ticketService.getTicketsByStatus(status, pageable));
        }
        return ResponseEntity.ok(ticketService.getAllTickets(pageable));
    }

    @PatchMapping("/{id}/reply")
    public ResponseEntity<TicketResponseDto> replyToTicket(
            @PathVariable Long id,
            @RequestBody TicketUpdateRequestDto dto) {

        dto.setStatus(TicketEnumStatus.RESPONDED);
        return ResponseEntity.ok(ticketService.updateTicket(id, dto));
    }

    @PatchMapping("/{id}/close")
    public ResponseEntity<TicketResponseDto> closeTicket(@PathVariable Long id) {
        TicketUpdateRequestDto dto = new TicketUpdateRequestDto();
        dto.setStatus(TicketEnumStatus.CLOSED);
        dto.setAdminResponse("Talep kapatıldı.");
        return ResponseEntity.ok(ticketService.updateTicket(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDto> getTicketDetail(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicketForAdmin(id));
    }

}