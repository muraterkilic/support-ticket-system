package com.mckbilisim.supportapp.dto.request;

import com.mckbilisim.supportapp.utils.TicketEnumStatus;
import lombok.Data;

@Data
public class TicketUpdateRequestDto {
    private TicketEnumStatus status;
    private String adminResponse;
}
