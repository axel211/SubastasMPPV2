package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.entity.Persona;
import net.javasubasta.mppbackend.mapper.PersonaMapper;
import net.javasubasta.mppbackend.repository.PersonaRepository;
import net.javasubasta.mppbackend.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PersonaServiceImpl implements PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private PersonaMapper personaMapper;


    @Override
    public PersonaDTO registrarPersona(PersonaDTO personaDto) {
        Persona persona = personaMapper.toEntity(personaDto);
        persona = personaRepository.save(persona);
        return personaMapper.toDTO(persona);
    }
}
