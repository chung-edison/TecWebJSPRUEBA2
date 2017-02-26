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
  borrarItem: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Item.destroy({
        id: parametros.id
      }).exec(function (err, itemBorrado) {
        if (err) {
          res.view('error', {
            error: {
              descripcion: "Error inesperado",
              rawError: err,
              url: '/Item/listaritems?id=' + parametros.bodega
            }
          });
        }
        res.redirect('/Item/listaritems?id=' + parametros.bodega);
      })
    } else {
      res.view('error', {
        error: {
          descripcion: "Necesitamos el ID para borrar.",
          rawError: "No envía ID",
          url: '/Item/listaritems?id=' + parametros.bodega
        }
      });
    }
  },
  editarItem: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros)
    if (parametros.id && (parametros.nombre || parametros.cantidad || parametros.peso)) {

      var item = {
        nombre: parametros.nombre,
        cantidad: parametros.cantidad,
        peso: parametros.peso
      }

      if (item.nombre == "") {
        delete item.nombre
      }
      if (item.direccion == "") {
        delete item.direccion
      }
      if (item.peso == "") {
        delete item.peso
      }

      Item.update({
        id: parametros.id
      }, item).exec(function (err, itemActualizado) {
        if (err) {
          res.view('error', {
            error: {
              descripcion: "Tuvimos un error inesperado",
              rawError: err,
              url: "/Item/listaritems?id=" + parametros.bodega
            }
          });
        }
        res.redirect("/Item/listaritems?id=" + parametros.bodega);
      })
    } else {
      res.view('error', {
        error: {
          descripcion: "Necesitamos el ID",
          rawError: "No envía ID",
          url: "/Item/listaritems?id=" + parametros.bodega
        }
      });
    }
  },
};

