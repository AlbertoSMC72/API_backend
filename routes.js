const { data } = require("vis-network");

module.exports = function (app, databaseService) {


    app.get('/', (request, response) => {
        response.json({ "msj": "to bien" });
    });

    /*........................ administradores.................... */

    app.post('/Administradores', (request, response) => {
        const nuevoAdministradores = request.body;
        console.log(nuevoAdministradores)
        databaseService.crearAdministradores(nuevoAdministradores)
            .then(() => {
                response.json({ 'msj': 'Administradores creado' })
            }).catch(e => {
                response.status(500).json(e);
            })
    });

    app.get('/Administradores', (request, response) => {
        databaseService.leerAdministradores()
            .then(Administradores => {
                response.json(Administradores)
            }).catch(e => response.status(500).json(e))
    });

    app.get('/Administradoresesp', (request, response) => {
        const { Administradores } = request.query;
        databaseService.obtenerAdministradores(Administradores)
            .then(Administradores => {
                response.json(Administradores);
            }).catch(e => response.status(500).json(e));
    });

    app.get('/AdministradoresID', (request, response) => {
        const { AdministradoresID } = request.query;
        databaseService.obtenerAdministradoresID(AdministradoresID)
            .then(AdministradoresID => {
                response.json(AdministradoresID);
            }).catch(e => response.status(500).json(e));
    });

    app.get('/TrabajadoresFinca', (request, response) => {
        const { TrabajadoresFinca } = request.query;
        databaseService.obtenerTrabajadoresFinca(TrabajadoresFinca)
            .then(TrabajadoresFinca => {
                response.json(TrabajadoresFinca);
            }).catch(e => response.status(500).json(e));
    });

    app.delete('/BorrarAdministradores', (request, response) => {
        const { Administradores } = request.query;
        databaseService.eliminarAdministradores(Administradores)
            .then(() => {
                response.json({ 'msj': 'Administradores eliminado' })
            }).catch(e => response.status(500).json(e));
    });

    app.put('/Administradores', (request, response) => {
        const { Administradores } = request.query;
        const nuevoAdministradores = request.body;
        databaseService.actualizarAdministradores(Administradores, nuevoAdministradores)
            .then(() => {
                response.json({ 'msj': 'Administradores actualizado' })
            }).catch(e => response.status(500).json(e));
    });

    /*........................ fincas.................... */

    app.get('/Finca', (request, response) => {
        databaseService.leerFincas()
            .then(Finca => {
                response.json(Finca)
            }).catch(e => response.status(500).json(e))
    });

    app.post('/Finca', (request, response) => {
        const nuevoFinca = request.body;
        console.log(nuevoFinca)
        databaseService.crearFinca(nuevoFinca)
            .then(() => {
                response.json({ 'msj': 'Nueva finca creada' })
            }).catch(e => {
                response.status(500).json(e);
            })
    });

    app.get('/FincaEsp', (request, response) => {
        const { Fincas } = request.query;
        databaseService.obtenerFincas(Fincas)
            .then(Fincas => {
                response.json(Fincas);
            }).catch(e => response.status(500).json(e));
    });

    app.get('/TrabajadoresFinca', (request, response) => {
        const { TrabajadoresFinca } = request.query;
        databaseService.obtenerTrabajadoresFinca(TrabajadoresFinca)
            .then(TrabajadoresFinca => {
                response.json(TrabajadoresFinca);
            }).catch(e => response.status(500).json(e));
    });

    app.delete('/TodoFinca', (request, response) => {
        const { idFinca } = request.query;
        databaseService.eliminarFinca(idFinca)
            .then(() => {
                response.json({ 'msj': 'Finca eliminado' })
            }).catch(e => response.status(500).json(e));
    });

    app.put('/Finca', (request, response) => {
        const { Finca } = request.query;
        const nuevoFinca = request.body;
        databaseService.actualizarFinca(Finca, nuevoFinca)
            .then(() => {
                response.json({ 'msj': 'Finca actualizado' })
            }).catch(e => response.status(500).json(e));
    });

    app.get('/FincaEspCorreo', (request, response) => {
        const { FincaCorreo } = request.query;
        databaseService.obtenerFincaCorreo(FincaCorreo)
            .then(FincaCorreo => {
                response.json(FincaCorreo);
            }).catch(e => response.status(500).json(e));
    });
    /* enviar idfinca */
    app.get('/eventosFinca', (request, response) => {
        const { EventosFinca } = request.query;
        databaseService.obtenerEventos(EventosFinca)
            .then(EventosFinca => {
                response.json(EventosFinca);
            }).catch(e => response.status(500).json(e));
    });

    /*........................ vacas.................... */
    app.get('/Vacas', (request, response) => {
        databaseService.leerVacas()
            .then(Finca => {
                response.json(Finca)
            }).catch(e => response.status(500).json(e))
    });

    app.post('/Vacas', (request, response) => {
        const nuevoVaca = request.body;
        console.log(nuevoVaca)
        databaseService.crearVaca(nuevoVaca)
            .then(() => {
                response.json({ 'msj': 'Nueva Vaca creada' })
            }).catch(e => {
                response.status(500).json(e);
            })
    });
    /* para las vacas de la finca */
    app.get('/VacasFincaEsp', (request, response) => {
        const { VacaFinca } = request.query;
        databaseService.obtenerVacaFinca(VacaFinca)
            .then(VacaFinca => {
                response.json(VacaFinca);
            }).catch(e => response.status(500).json(e));
    });
    /* para ID de vacas */
    app.get('/VacasEsp', (request, response) => {
        const { VacaID } = request.query;
        databaseService.obtenerVacaID(VacaID)
            .then(VacaID => {
                response.json(VacaID);
            }).catch(e => response.status(500).json(e));
    });

    /* para nombres CON ID FINCA*/
    app.get('/VacasEspNombreFinca', (request, response) => {
        const { VacaNombre } = request.query;
        const { VacaFinca } = request.query;
        databaseService.obtenerVacaNombre(VacaNombre, VacaFinca)
            .then(VacaNombre => {
                response.json(VacaNombre);
            }).catch(e => response.status(500).json(e));
    });

    /* para aretes Padre */
    app.get('/VacasEspPadre', (request, response) => {
        const { VacaPadre } = request.query;
        databaseService.obtenerVacaPadre(VacaPadre)
            .then(VacaPadre => {
                response.json(VacaPadre);
            }).catch(e => response.status(500).json(e));
    });


    /* para aretes Madre */
    app.get('/VacasEspMadre', (request, response) => {
        const { VacaMadre } = request.query;
        databaseService.obtenerVacaMadre(VacaMadre)
            .then(VacaMadre => {
                response.json(VacaMadre);
            }).catch(e => response.status(500).json(e));
    });


    /* hijos */
    app.get('/VacasEspHijos', (request, response) => {
        const { VacaHijos } = request.query;
        databaseService.todosHijos(VacaHijos)
            .then(VacaHijos => {
                response.json(VacaHijos);
            }).catch(e => response.status(500).json(e));
    });

    /* eventos cargada */
    app.get('/VacasEspCargada', (request, response) => {
        const { VacaCargada } = request.query;
        databaseService.obtenerEventosCargada(VacaCargada)
            .then(VacaCargada => {
                response.json(VacaCargada);
            }).catch(e => response.status(500).json(e));
    });

    /* eventos vacuna */
    app.get('/VacasEspVacuna', (request, response) => {
        const { VacaVacuna } = request.query;
        databaseService.obtenerEventosVacuna(VacaVacuna)
            .then(VacaVacuna => {
                response.json(VacaVacuna);
            }).catch(e => response.status(500).json(e));
    });

    app.delete('/EliminarVaca', (request, response) => {
        const { Vacas } = request.query;
        databaseService.eliminarVacas(Vacas)
            .then(() => {
                response.json({ 'msj': 'Vacas eliminado' })
            }).catch(e => response.status(500).json(e));
    });

    app.put('/ModificarVacas', (request, response) => {
        const { Vacas } = request.query;
        const nuevoVaca = request.body;
        databaseService.actualizarVacas(Vacas, nuevoVaca)
            .then(() => {
                response.json({ 'msj': 'Vacas actualizado' })
            }).catch(e => response.status(500).json(e));
    });

    /*........................ eventos.................... */
    app.get('/Eventos', (request, response) => {
        databaseService.leerEventos()
            .then(Eventos => {
                response.json(Eventos)
            }).catch(e => response.status(500).json(e))
    });

    app.get('/EventoEsp', (request, response) => {
        const { Eventos } = request.query;
        databaseService.obtenerEventos(Eventos)
            .then(Eventos => {
                response.json(Eventos);
            }).catch(e => response.status(500).json(e));
    });

    app.post('/nuevoEventos', (request, response) => {
        const nuevoEvento = request.body;
        console.log(nuevoEvento)
        databaseService.crearEvento(nuevoEvento)
            .then(() => {
                response.json({ 'msj': 'Nuevo Evento creado' })
            }).catch(e => {
                response.status(500).json(e);
            })
    });

    app.delete('/borraEventoEsp', (request, response) => {
        const { Eventos } = request.query;
        databaseService.eliminarEvento(Eventos)
            .then(() => {
                response.json({ 'msj': 'Eventos eliminado' })
            }).catch(e => response.status(500).json(e));
    });

    app.put('/ModificarEventos', (request, response) => {
        const { idVacaEdit } = request.query;
        const nuevoEvento = request.body;
        databaseService.actualizarEvento(idVacaEdit, nuevoEvento)
            .then(() => {
                response.json({ 'msj': 'Eventos actualizado' })
            }).catch(e => response.status(500).json(e));
    });


};