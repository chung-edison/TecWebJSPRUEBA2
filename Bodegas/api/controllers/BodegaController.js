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
  },

  borrarBodega: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Bodega.destroy({
        id: parametros.id
      }).exec(function (err, bodegaBorrada) {
        if (err) {
          res.view('error', {
            error: {
              descripcion: "Error inesperado",
              rawError: err,
              url: "/bodegas"
            }
          });
        }
        res.redirect('/bodegas');
      })
    } else {
      res.view('error', {
        error: {
          descripcion: "Necesitamos el ID para borrar la bodega.",
          rawError: "No envía ID",
          url: "/bodegas"
        }
      });
    }
  },

  editarBodega: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id && (parametros.nombre || parametros.direccion || parametros.capacidadEnToneladas)) {

      var bodega = {
        nombre: parametros.nombre,
        direccion: parametros.direccion,
        capacidadEnToneladas: parametros.capacidadEnToneladas
      }

      if (bodega.nombre == "") {
        delete bodega.nombre
      }
      if (bodega.direccion == "") {
        delete bodega.direccion
      }
      if (bodega.capacidadEnToneladas == "") {
        delete bodega.capacidadEnToneladas
      }

      Bodega.update({
        id: parametros.id
      }, bodega).exec(function (err, bodegaActualizada) {
        if (err) {
          res.view('error', {
            error: {
              descripcion: "Tuvimos un error inesperado",
              rawError: err,
              url: "/bodegas"
            }
          });
        }
        res.redirect('/bodegas');
      })
    } else {
      res.view('error', {
        error: {
          descripcion: "Necesitamos el ID",
          rawError: "No envía ID",
          url: "/bodegas"
        }
      });
    }
  },
};

