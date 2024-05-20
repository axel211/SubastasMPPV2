package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.LoteRecuperarDTO;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class LoteController {
    @Autowired
    private LoteService loteService;

    @PostMapping("/lotes/subasta/{subastaId}")
    public ResponseEntity<?> agregarLoteConFotos(@PathVariable int subastaId, @ModelAttribute LoteDTO loteDTO) {
        try {
            Lote lote = loteService.guardarLoteConFotos(loteDTO, subastaId);
            return ResponseEntity.ok("Lote registrado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el lote y las fotos.");
        }
    }

    @GetMapping("/subasta/{subastaId}/lotes")
    public ResponseEntity<List<LoteRecuperarDTO>> obtenerLotesPorSubastaId(@PathVariable int subastaId) throws Exception {
        System.out.println("CLICK");
        List<LoteRecuperarDTO> lotes = loteService.obtenerLotesPorSubastaId(subastaId);
        return ResponseEntity.ok(lotes);
    }

    @GetMapping("/lote/{id}")
    public LoteRecuperarDTO obtenerLotePorID(@PathVariable int id) throws Exception {
        LoteRecuperarDTO lote = loteService.obtenerLotePorID(id);
        return lote ;
    }

}
