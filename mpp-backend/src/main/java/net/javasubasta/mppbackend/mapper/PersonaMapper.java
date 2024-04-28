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
        persona.setNombres(personaDTO.getNombres());
        persona.setApellido(personaDTO.getApellido());
        persona.setFechaNacimiento(personaDTO.getFechaNacimiento());
        persona.setSexo(personaDTO.getSexo());
        persona.setEstadoCivil(personaDTO.getEstadoCivil());
        persona.setTelefono(personaDTO.getTelefono());

        persona.setNombreComercial(personaDTO.getNombreComercial());
        persona.setRuc(personaDTO.getRuc());
        persona.setActividadEconomica(personaDTO.getActividadEconomica());

        persona.setDepartamento(personaDTO.getDepartamento());
        persona.setProvincia(personaDTO.getProvincia());
        persona.setDistrito(personaDTO.getDistrito());
        persona.setDireccion(personaDTO.getDireccion());
        persona.setNumero(personaDTO.getNumero());
        persona.setPiso(personaDTO.getPiso());

        persona.setActivo(personaDTO.getActivo());
        return persona;
    }

    public PersonaDTO toDTO (Persona persona) {
        PersonaDTO personaDTO = new PersonaDTO();
        personaDTO.setId(persona.getId());
        personaDTO.setTipo(persona.getTipo());
        personaDTO.setDni(persona.getDni());
        personaDTO.setNombres(persona.getNombres());
        personaDTO.setApellido(persona.getApellido());
        personaDTO.setFechaNacimiento(persona.getFechaNacimiento());
        personaDTO.setSexo(persona.getSexo());
        personaDTO.setEstadoCivil(persona.getEstadoCivil());
        personaDTO.setTelefono(persona.getTelefono());

        personaDTO.setNombreComercial(persona.getNombreComercial());
        personaDTO.setRuc(persona.getRuc());
        personaDTO.setActividadEconomica(persona.getActividadEconomica());

        personaDTO.setDepartamento(persona.getDepartamento());
        personaDTO.setProvincia(persona.getProvincia());
        personaDTO.setDistrito(persona.getDistrito());
        personaDTO.setDireccion(persona.getDireccion());
        personaDTO.setNumero(persona.getNumero());
        personaDTO.setPiso(persona.getPiso());

        return personaDTO;
    }
}
