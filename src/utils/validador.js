const campos = 'Some required fields are missing';
const validaLogin = (
  req, res, next,
) => {
  const {
    email, password,
  } = req.body;
  if (!email || !password) {
    return res.status(400)
      .json({
        message: campos,
      });
  }
  next();
};

module.exports = {
  validaLogin,
};
