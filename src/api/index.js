import axios from "axios";

function getGoods() {
  return axios.post("/getGoods");
}

function getArticles() {
  return axios.post("/getArticles");
}

function setArticle(data) {
  return axios.post("/setArticle", data);
}

function getComments() {
  return axios.post("/getComments");
}

export { getGoods, getArticles, setArticle, getComments };
