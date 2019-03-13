module.exports = {
  getGoods: {
    "goods|5-20": [
      {
        "ID|+1": 1,
        "category|1": ["Sporting Goods", "Electronics", "Clothes", "Fruits"],
        "price|10-100.1-2": 49.99,
        "stocked|1": true,
        name: (function () {
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
          return function () {
            return obj[this.category].pop() || "unKnow";
          };
        })()
      }
    ]
  },
  getArticles: {
    "articles|2-5": [
      {
        "ID|+1": 1,
        title: "@title(1,10)",
        content: "@paragraph(1,10)",
        "like|-100-2000": 1,
        "comment|1-100": 1,
        "thank|2": false,
        "collection|1": true
      }
    ]
  },
  getComments: {
    refresh: true,
    template: {
      "comments|1-10": [
        {
          "ID|+1": 1,
          userName: "@word()",
          date: "@date('yyyy-MM-dd')",
          content: "@sentence(2,20)",
          "like|-100-2000": 1,
          "diss|1": true
        }
      ]
    }
  }
};
