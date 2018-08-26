import * as express from 'express';
const Router = express.Router();

Router.get('/', (req, res) => {
  res.json({
    success: true
  });
});

export default Router;
