package net.javasubasta.mppbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class MppBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MppBackendApplication.class, args);
	}

}

