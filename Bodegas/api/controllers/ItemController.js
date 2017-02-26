/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearItem: function (req, res) {
    if (req.method == 'POST') {
      var parametros = req.allParams();
      if (parametros.nombre && parametros.cantidad && parametros.peso && parametros.idBodega) {
        var nuevoItem = {
          nombre: parametros.nombre,
          cantidad: parametros.cantidad,
          peso: parametros.peso,
          idBodega: parametros.idBodega
        }
        Item.create(nuevoItem).exec(function (err, itemCreado) {
          if (err) {
            return res.view('error', {
              error: {
                descripcion: "Fallo al crear el item.",
                rawError: "err",
                url: "/nuevoitem"
              }
            })
          }
          res.redirect("Item/listaritems?id=" + parametros.idBodega);
        })
      } else {
        return res.view('error', {
          error: {
            descripcion: "Llene todos los parámetros: nombre, cantidad y peso.",
            rawError: "Fallo en envío de parámetros",
            url: "/nuevoitem"
          }
        });
      }
    } else {
      return res.view('error', {
        error: {
          descripcion: "Error en el uso del método HTTP.",
          rawError: "HTTP inválido",
          url: "/nuevoitem"
        }
      });
    }
  },
  listarItems: function (req, res) {
    var params = req.allParams();
    Item.find({idBodega: params.id}).exec(function (err, listaitems) {
      if (err) {
        res.view('error', {
          error: {
            descripcion: "Hubo un problema.",
            rawError: err,
            url: "/bodegas"
          }
        })
      }
      res.view('listaritems', {
        idBodega: params.id,
        items: listaitems
      });
    })
  },
};

