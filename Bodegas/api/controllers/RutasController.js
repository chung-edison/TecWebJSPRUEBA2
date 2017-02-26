/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  listarBodegas: function (req, res) {
    Bodega.find().exec(function (err, listabodegas) {
      if (err) {
        res.view('error', {
          error: {
            descripcion: "Hubo un problema.",
            rawError: err,
            url: "/listarbodegas"
          }
        })
      }
      res.view('listarbodegas', {
        bodegas: listabodegas
      });
    })
  },

  editarBodega: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Bodega.findOne({
        id: parametros.id
      }).exec(function (err, bodegaAEditar) {
        if (err) {
          res.view('error', {
            error: {
              descripcion: "Error inesperado",
              rawError: err,
              url: "/bodegas"
            }
          });
        }
        res.view('editarbodega', {
          bodega: bodegaAEditar
        });
      })
    } else {
      res.view('error', {
        error: {
          descripcion: "Necesitamos el ID para editar la bodega.",
          rawError: "No envía ID",
          url: "/bodegas"
        }
      });
    }
  },
  crearItem: function (req, res) {
    var params = req.allParams();
    res.view('crearitem', {
      idBodega: params.idBodega,
    });
  },
  editarItem: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Item.findOne({
        id: parametros.id
      }).exec(function (err, itemAEditar) {
        if (err) {
          res.view('error', {
            error: {
              descripcion: "Error inesperado",
              rawError: err,
              url: '/Item/listaritems?id=' + parametros.bodega
            }
          });
        }
        res.view('editaritem', {
          item: itemAEditar
        });
      })
    } else {
      res.view('error', {
        error: {
          descripcion: "Necesitamos el ID para editar la bodega.",
          rawError: "No envía ID",
          url: '/Item/listaritems?id=' + parametros.bodega
        }
      });
    }
  },
  error: function (req, res) {
    return res.view('error', {
      error: {
        descripcion: "Usted está por error en esta ruta. Diríjase a Inicio",
        rawError: "Ruta equivocada",
        url: "/home"
      }
    });
  }

};

