package com.mckbilisim.supportapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SupportappApplication {

	public static void main(String[] args) {
		SpringApplication.run(SupportappApplication.class, args);
	}

}
