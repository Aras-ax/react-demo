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
  middleWare: {},
  /**
   * Moc扩展
   */
  mockExtend: {}
};
