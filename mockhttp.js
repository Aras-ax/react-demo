module.exports = {
  defaultDataFile: "index.js",
  baseDist: "/src/data",
  port: 8090,
  openBrowser: false,
  /**
   * 中间件，拦截请求之类的操作
   * req: express请求参数， res:express返回参数， next：express传递, server: 当前数据操作的server对象
   * function(req, res, next， server)
   */
  middleWare: {
    api: "/setArticle",
    callback: function(req, res, next, server) {
      console.log("中间件，劫持请求 /setArticle");
      let data = req.body;
      server
        .loadData("getArticles")
        .then(result => {
          data.ID = result.articles.length + 1;
          data.like = 0;
          data.comment = 0;
          data.thank = false;
          data.collection = false;
          result.articles.unshift(data);
          server.updateData("getArticles", result);
          res.send("ok");
        })
        .catch(err => {
          console.log(err);
          next();
        });
    }
  }
};
