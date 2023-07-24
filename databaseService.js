
const databaseService = () => {

    const knex = require('knex')({
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        }
    });

    const table = 'Administradores';
    const table2 = 'Finca';
    const table3 = 'Vaca';
    const table4 = 'Eventos';


    const leerAdministradores = () => {
        return knex(table).select();
    };

    const leerFincas = () => {
        return knex(table2).select();
    };
    const leerVacas = () => {
        return knex(table3).select();
    };

    const leerEventos = () => {
        return knex(table4).select();
    };
    /*  consultas especificas*/

    const obtenerAdministradoresID = async (Administradores) => {
        const resultado = await knex(table)
            .select()
            .where({ idPersonas: Administradores })
            .first();
        return resultado;
    };

    const obtenerAdministradores = async (Administradores) => {
        const resultado = await knex(table)
            .select()
            .where({ email: Administradores })
            .first();
        return resultado;
    };

    const obtenerFincas = async (Finca) => {
        const resultado = await knex(table2)
            .select()
            .where({ idFinca: Finca })
            .first();
        return resultado;
    };
    const obtenerVacaFinca = async (Vacas) => {
        const resultado = await knex(table3)
            .select()
            .where({ fincaPertenece: Vacas });
        return resultado;
    };

    const obtenerVacaID = async (Vacas) => {
        const resultado = await knex(table3)
            .select()
            .where({ idVaca: Vacas })
            .first();
        return resultado;
    };

    const obtenerTrabajadoresFinca = async (TrabajadoresFinca) => {
        const resultado = await knex(table)
            .select()
            .where({ idFincaRef: TrabajadoresFinca });
        return resultado;
    };

    const obtenerFincaCorreo = async (FincaCorreo) => {
        const resultado = await knex(table2)
            .select()
            .where({ creadaPersona: FincaCorreo })
            .first();
        return resultado;
    };
    /*  */

    const obtenerEventos = async (Eventos) => {
        const resultado = await knex(table4)
            .select(`${table4}.*`, `${table3}.nombre as nombre_vaca`, `${table3}.areteVaca`)
            .join(table3, `${table4}.idVaca`, `${table3}.idVaca`)
            .where(`${table4}.idFincaRef`, Eventos)
            .andWhere(`${table4}.fecha_Reinsidio`, '<=', knex.fn.now()); // Excluimos eventos futuros
        return resultado;
    };

/* para notificaciones */
    const obtenerEventosCargada = async (idFinca) => {
        const resultado = await knex(table4)
            .select(`${table4}.*`, `${table3}.nombre as nombre_vaca`)
            .join(table3, `${table4}.idVaca`, `${table3}.idVaca`)
            .where(`${table4}.idFincaRef`, idFinca)
            .andWhere(`${table4}.asunto`, 'Cargada')
            .andWhere(`${table4}.fecha_Reinsidio`, '>', knex.fn.now());
        return resultado;
    };

/* para notificaciones */
    const obtenerEventosVacuna = async (idFinca) => {
        const resultado = await knex(table4)
            .select(`${table4}.*`, `${table3}.nombre as nombre_vaca`)
            .join(table3, `${table4}.idVaca`, `${table3}.idVaca`)
            .where(`${table4}.idFincaRef`, idFinca)
            .andWhere(`${table4}.asunto`, 'Vacuna')
            .andWhere(`${table4}.fecha_Reinsidio`, '>', knex.fn.now());
        return resultado;
    };


    const obtenerVacaPadre = async (VacaPadre) => {
        try {
            const resultado = await knex(table3)
                .select()
                .where({ areteVaca: VacaPadre })
                .first();
            return resultado;
        } catch (error) {
            console.error('Error en la consulta obtenerVacaPadre:', error);
            return null;
        }
    };

    const obtenerVacaMadre = async (VacaMadre) => {
        try {
            const resultado = await knex(table3)
                .select()
                .where({ areteVaca: VacaMadre })
                .first();
            return resultado;
        } catch (error) {
            console.error('Error en la consulta obtenerVacaMadre:', error);
            return null;
        }
    };

    const todosHijos = async (aretePADRE) => {
        try {
            const resultado = await knex(table3)
                .select()
                .where({ areteMadre: aretePADRE })
                .orWhere({ areteToro: aretePADRE });
            return resultado;
        } catch (error) {
            console.error('Error en la consulta todosHijos:', error);
            return [];
        }
    };

    const obtenerVacaNombre = async (nombre, idfinca) => {
        try {
            const resultado = await knex(table3)
                .select()
                .where({ nombre: nombre })
                .andWhere({ fincaPertenece: idfinca })
                .first();
            return resultado;
        } catch (error) {
            console.error('Error en la consulta obtenerVaca:', error);
            return null;
        }
    };

    /* creacion de datos en la tabla */
    const crearAdministradores = ({ idPersonas, nombre, apellidoP, apellidoM, curp, numeroSeguroSocial, password, email, idFincaRef }) => {
        return knex(table).insert({
            idPersonas: idPersonas,
            nombre: nombre,
            apellidoP: apellidoP,
            apellidoM: apellidoM,
            curp: curp,
            numeroSeguroSocial: numeroSeguroSocial,
            password: password,
            email: email,
            idFincaRef: idFincaRef,
        })
    };

    const crearFinca = ({ idFinca, nombreFinca, contraseñaIngreso, creadaPersona, ubicacion, tipoClima, marcaFierro }) => {
        return knex(table2).insert({
            idFinca: idFinca,
            nombreFinca: nombreFinca,
            contraseñaIngreso: contraseñaIngreso,
            creadaPersona: creadaPersona,
            ubicacion: ubicacion,
            tipoClima: tipoClima,
            marcaFierro: marcaFierro,
        })
    };

    const crearVaca = ({ idVaca, siniiga, areteVaca, areteToro, areteMadre, nombre, raza, calidadLeche, genero, fechaNacimiento, fotoPerfil, pedigri, lugarMarca, fincaPertenece }) => {
        return knex(table3).insert({
            idVaca: idVaca,
            siniiga: siniiga,
            areteVaca: areteVaca,
            areteToro: areteToro,
            areteMadre: areteMadre,
            nombre: nombre,
            raza: raza,
            calidadLeche: calidadLeche,
            genero: genero,
            fechaNacimiento: fechaNacimiento,
            fotoPerfil: fotoPerfil,
            pedigri: pedigri,
            lugarMarca: lugarMarca,
            fincaPertenece: fincaPertenece,
        })
    }

    const crearEvento = ({ idEvento, idVaca, idFincaRef, titulo, asunto, fecha_Reporte, descripcion, fecha_Reinsidio }) => {
        return knex(table4).insert({
            idEvento: idEvento,
            idVaca: idVaca,
            idFincaRef: idFincaRef,
            titulo: titulo,
            asunto: asunto,
            fecha_Reporte: fecha_Reporte,
            descripcion: descripcion,
            fecha_Reinsidio: fecha_Reinsidio,
        })
    }
    /* EMILINADORES */

    const eliminarAdministradores = (idPersonas) => {
        return knex(table).where({ idPersonas: idPersonas }).del();
    };

    const eliminarFinca = async (idFinca) => {
        try {
            await knex.transaction(async (trx) => {
                await trx(table4).where({ idFinca: idFinca }).del();
                await trx(table3).where({ fincaPertenece: idFinca }).del();
                await trx(table).where({ idFincaRef: idFinca }).del();
                await trx(table2).where({ idFinca: idFinca }).del();
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const eliminarVacas = (idVaca) => {
        return knex(table3).where({ idVaca: idVaca }).del();
    };

    const eliminarEvento = (idEvento) => {
        return knex(table4).where({ idEvento: idEvento }).del();
    };

    /* MODIFICADORES DE INFO */

    const actualizarVacas = (idVaca, nuevoVaca) => {
        return knex(table3).where({ idVaca: idVaca }).update(nuevoVaca);
    };

    const actualizarFinca = (idFinca, nuevoFinca) => {
        return knex(table2).where({ idFinca: idFinca }).update(nuevoFinca);
    };

    const actualizarAdministradores = (idPersonas, nuevoAdministradores) => {
        return knex(table).where({ idPersonas: idPersonas }).update(nuevoAdministradores);
    };

    const actualizarEvento = (idEvento, nuevoEvento) => {
        return knex(table4).where({ idEvento: idEvento }).update(nuevoEvento);
    };


    return {
        leerAdministradores, leerFincas, leerVacas, leerEventos,
        obtenerAdministradoresID, obtenerAdministradores, obtenerFincas, obtenerVacaFinca, obtenerVacaID, obtenerTrabajadoresFinca, obtenerFincaCorreo, obtenerEventos,
        obtenerVacaPadre, obtenerVacaMadre, todosHijos, obtenerEventosCargada, obtenerEventosVacuna, obtenerVacaNombre,
        crearAdministradores, crearFinca, crearVaca, crearEvento,
        eliminarAdministradores, eliminarFinca, eliminarVacas, eliminarEvento,
        actualizarVacas, actualizarFinca, actualizarAdministradores, actualizarEvento

    }
};
module.exports = {
    databaseService
};