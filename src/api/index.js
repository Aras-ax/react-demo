import axios from "axios";

function getGoods() {
  return axios.post("/getGoods");
}

function getQAList() {
  return axios.post("/qaList");
}

function setQAList() {}

export { getGoods, getQAList, setQAList };
