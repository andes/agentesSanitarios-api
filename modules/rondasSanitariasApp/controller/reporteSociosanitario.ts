const request = require('request');

export function esPacienteValidado(paciente) {
    return new Promise( async (resolve: any, reject: any) => {
        let url = `http://localhost:3002/api/core/mpi/pacientes/search`;
        url += `?documento=32589654`;


        const options = {
            url,
            method: 'GET',
            json: true,
            query: {
                documento: paciente.documento
            },
            headers: {
                Authorization: ''
            }
        };
        let x = await request(options);
    });
}

