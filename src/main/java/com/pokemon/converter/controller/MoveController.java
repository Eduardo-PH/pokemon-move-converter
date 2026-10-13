package com.pokemon.converter.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MoveController {

    @GetMapping("/status")
    public Map<String, String> verificarStatus() {
        return Map.of(
            "status", "online",
            "mensagem", "Servidor Pokémon Move Converter funcionando!"
        );
    }

    @PostMapping("/test")
    public Map<String, String> testarEntrada(
            @RequestBody Map<String, String> dados) {

        String movimento = dados.get("movimento");

        return Map.of(
            "mensagem", "Texto recebido pelo Java com sucesso!",
            "movimentoRecebido", movimento == null ? "" : movimento
        );
    }
}

