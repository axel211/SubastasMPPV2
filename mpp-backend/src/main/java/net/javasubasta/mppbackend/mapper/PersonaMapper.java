package net.javasubasta.mppbackend.mapper;

import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.entity.Persona;
import org.springframework.stereotype.Component;

@Component
public class PersonaMapper {
    public Persona toEntity (PersonaDTO personaDTO) {
        Persona persona = new Persona();

        persona.setId(personaDTO.getId());
        persona.setTipo(personaDTO.getTipo());
        persona.setDni(personaDTO.getDni());
        persona.setRuc(personaDTO.getRuc());
        persona.setApellido(personaDTO.getApellido());
        persona.setRazonsocial(personaDTO.getRazonsocial());

        return persona;
    }

    public PersonaDTO toDTO (Persona persona) {
        PersonaDTO personaDTO = new PersonaDTO();
        personaDTO.setId(persona.getId());
        personaDTO.setTipo(persona.getTipo());
        personaDTO.setDni(persona.getDni());
        personaDTO.setRuc(persona.getRuc());
        personaDTO.setApellido(persona.getApellido());
        personaDTO.setRazonsocial(persona.getRazonsocial());

        return personaDTO;
    }
}
