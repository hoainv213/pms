module.exports = (req, res, next) => {
  let body = req.body;
  if (typeof body === 'undefined') {
    return next(new Error('form-values must be used after body-parser'));
  }
  let bodyKeys = Object.keys(req.body);
  res.locals.posted = function (name, defaultValue) {
    if (bodyKeys.indexOf(name) === -1) {
      if (typeof defaultValue === 'undefined')
        return '';
      return defaultValue;
    } else {
      return req.body[name];
    }
  };
  return next();
};