module.exports = function(app) {
  var Vendor  = app.Models.Vendor;

  return {
    idParam: function(req, res, next) {
      Vendor.find({where: {id: req.params.vendor_id}})
        .then(function(vendor) {
          if (!vendor) {
            throw new Error('vendor not found');
          }
          req.vendor = vendor;
        })
        .done(next, next);
    },

    get: function(req, res) {
      res.json(req.vendor);
    },

    index: function(req, res, next) {
      Vendor.findAll({
        order: "name ASC"
      }).then(function(vendors) {
        res.json(vendors);
      }).catch(next);
    }
  }
}
