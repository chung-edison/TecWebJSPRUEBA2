/**
 * BodegaController
 *
 * @description :: Server-side logic for managing Bodegas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearBodega: function (req, res) {
    if (req.method == 'POST') {
      var parametros = req.allParams();
      if (parametros.nombre && parametros.direccion && parametros.capacidadEnToneladas) {
        var nuevaBodega = {
          nombre: parametros.nombre,
          direccion: parametros.direccion,
          capacidadEnToneladas: parametros.capacidadEnToneladas,
          items: []
      }
        Bodega.create(nuevaBodega).exec(function (err, bodegaCreada) {
          if (err) {
            return res.view('error', {
              error: {
                descripcion: "Fallo al crear la bodega.",
                rawError: "err",
                url: "/nuevabodega"
              }
            })
          }
          return res.view('crearbodega');
        })
      } else {
        return res.view('error', {
          error: {
            descripcion: "Llene todos los parámetros: nombre, direccion y capacidad.",
            rawError: "Fallo en envío de parámetros",
            url: "/nuevabodega"
          }
        });
      }
    } else {
      return res.view('error', {
        error: {
          descripcion: "Error en el uso del método HTTP.",
          rawError: "HTTP inválido",
          url: "/nuevabodega"
        }
      });
    }
  }
};

