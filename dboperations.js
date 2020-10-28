var config = require('./dbconfig');
const sql = require('mssql');

async function getQuotations() {
    try {
        let pool = await sql.connect(config);
        let quotations = await pool.request().query("SELECT * from Cotizaciones");
        return quotations.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
// Metodo de inserción a la DB
async function addQuotation(quotation) {

    try {

        let pool = await sql.connect(config);
        let insertQuotation = await pool.request()
            
            .input('NombreCliente', sql.NVarChar, quotation.NombreCliente)
            .input('TelefonoCliente', sql.NVarChar, quotation.TelefonoCliente)
            .input('EmailCliente', sql.NVarChar, quotation.EmailCliente)
            .input('EdadCliente', sql.Int, quotation.EdadCliente)
            .input('GeneroCliente', sql.NVarChar, quotation.GeneroCliente)
            .input('CiudadCliente', sql.NVarChar, quotation.CiudadCliente)
            .input('EtniaCliente', sql.NVarChar, quotation.EtniaCliente)
            .input('EducacionCliente', sql.NVarChar, quotation.EducacionCliente)
            .input('IngresosCliente', sql.Money, quotation.IngresosCliente)
            .input('NombreConcesionario', sql.NVarChar, quotation.NombreConcesionario)
            .input('TelefonoConcesionario', sql.NVarChar, quotation.TelefonoConcesionario)
            .input('EmailConcesionario', sql.NVarChar, quotation.EmailConcesionario)
            .input('NombreAgente', sql.NVarChar, quotation.NombreAgente)
            .input('TelefonoAgente', sql.NVarChar, quotation.TelefonoAgente)
            .input('EmailAgente', sql.NVarChar, quotation.EmailAgente)
            .input('MarcaVehiculo', sql.NVarChar, quotation.MarcaVehiculo)
            .input('ModeloVehiculo', sql.NVarChar, quotation.ModeloVehiculo)
            .input('TipoVehiculo', sql.NVarChar, quotation.TipoVehiculo)
            .execute('SP_INSERTAR_COTIZACION');
        return insertQuotation.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {
    getQuotations: getQuotations,
    addQuotation: addQuotation
}