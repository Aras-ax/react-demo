module.exports = {
  getGoods: {
    "goods|5-20": [
      {
        "ID|+1": 1,
        "category|1": ["Sporting Goods", "Electronics", "Clothes", "Fruits"],
        "price|10-100.1-2": 49.99,
        "stocked|1": true,
        name: (function() {
          let obj = {
            "Sporting Goods": [
              "Football",
              "Tennis",
              "Basketball",
              "Ping Pong",
              "volleyball",
              "Billiard",
              "Shot Put",
              "Rugby",
              "Water Polo",
              "Golf"
            ],
            Electronics: [
              "Iphone",
              "Ipod",
              "Ipad",
              "Mac",
              "Mac-Pro",
              "HomePod",
              "AirPod"
            ],
            Clothes: [
              "Pants",
              "Jeans",
              "Casual Pants",
              "Shorts",
              "Shirt",
              "T-Shirt",
              "Long Sleeve",
              "Sweater"
            ],
            Fruits: [
              "Apple",
              "Banana",
              "Pear",
              "Dragon fruit",
              "Watermelon",
              "Mangosteen",
              "Durian",
              "Avocado",
              "Grape",
              "Orange"
            ]
          };
          return function() {
            return obj[this.category].pop() || "unKnow";
          };
        })()
      }
    ]
  }
};
