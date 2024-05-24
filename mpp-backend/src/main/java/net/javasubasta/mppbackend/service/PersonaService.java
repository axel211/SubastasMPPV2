package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.PersonaDTO;

public interface PersonaService {
    PersonaDTO registrarPersona(PersonaDTO personaDto);
    PersonaDTO buscarPersonaPorDNI(String dni);
    PersonaDTO buscarPersonaPorRuc(String ruc);

}
