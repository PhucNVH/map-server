const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(403);
};
module.exports = isNotAuthenticated;
