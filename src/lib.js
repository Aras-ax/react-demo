const ActionType = {
  like: "like",
  thank: "thank",
  collection: "collection",
  diss: "diss"
};

function formatNum(num) {
  if (num < 1000) {
    return num;
  }

  return (num / 1000).toFixed(1) + "K";
}

function formatDate(date) {}

const direction = {
  horizontal: 1,
  vertical: 2,
  leftOblique: 3,
  rightOblique: 4
};

/**
 * 判断当前游戏是否结束
 * @param {Array} arr
 * @param {Number} x 当前棋子的横坐标
 * @param {Number} y 当前棋子的纵坐标
 * 赢的情况
 * 连续的五个棋子相同
 * 横线，竖线，左斜线，右斜线四种情况
 */
function checkWin(arr, x, y) {
  let target = arr[x][y],
    rowLen = arr.length,
    colLen = arr[0].length,
    startNode = { x, y },
    nodeList;

  function check(node) {
    if (node.x >= rowLen || node.x < 0 || node.y >= colLen || node.y < 0) {
      return false;
    }
    if (arr[node.x][node.y] === target) {
      return true;
    }
    return false;
  }

  for (let i = 1; i <= 4; i++) {
    nodeList = [startNode];
    let left = startNode,
      right = startNode,
      leftVal = true,
      rightVal = true;

    // 从当前节点出发，左右或者上下同时检测
    while (leftVal || rightVal) {
      if (leftVal) {
        left = getCoordinate(i, left, -1);
        leftVal = check(left) && nodeList.push(left);
      }
      if (rightVal) {
        right = getCoordinate(i, right, 1);
        rightVal = check(right) && nodeList.push(right);
      }

      if (nodeList.length === 5) {
        return nodeList;
      }
    }
  }
  return nodeList;
}

function getCoordinate(direct, node, tag) {
  let newNode;
  switch (direct) {
    case direction.horizontal:
      newNode = {
        x: node.x,
        y: node.y + tag
      };
      break;
    case direction.vertical:
      newNode = {
        x: node.x + tag,
        y: node.y
      };
      break;
    case direction.leftOblique:
      newNode = {
        x: node.x + tag,
        y: node.y + tag
      };
      break;
    case direction.rightOblique:
      newNode = {
        x: node.x - tag,
        y: node.y + tag
      };
      break;
    default:
      newNode = {
        x: -1,
        y: -1
      };
  }
  return newNode;
}

export { formatNum, formatDate, ActionType, checkWin };
