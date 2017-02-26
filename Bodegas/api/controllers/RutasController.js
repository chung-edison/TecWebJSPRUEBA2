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
  listarItems: function (req, res) {
    var params = req.allParams();
    Item.find(Item.idBodega == params.id).exec(function (err, listaitems) {
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
  crearItem: function (req, res) {
    var params = req.allParams();
    res.view('crearitem', {
      idBodega: params.idBodega,
    });
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
