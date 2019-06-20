module.exports = {
  getAllProperties(req, res) {
    return res.render('properties', { title: 'Properties',data: 'All properties !' });
  },
};