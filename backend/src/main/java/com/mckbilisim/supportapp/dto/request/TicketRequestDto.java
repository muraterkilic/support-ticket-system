package com.mckbilisim.supportapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TicketRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull
    @Size(min = 10, message = "Description must be at least 10 characters long")
    private String description;


    @NotNull(message = "Category is required")
    private String category;


}
