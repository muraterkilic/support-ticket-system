package com.mckbilisim.supportapp.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketResponseDto {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String status;
    private String adminResponse;
    private String username;
    private LocalDateTime createdAt;

}
