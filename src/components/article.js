import React from "react";
import "./article.scss";
import { getComments, getArticles } from "../api/index";
import { formatNum, ActionType } from "../lib";
// formatDate
class WriteArticle extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      content: ""
    };
  }

  render() {
    return (
      <div className="content-publish">
        <input
          type="text"
          className="content-input"
          placeholder="写下你的标题"
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          className="content-input mid"
          placeholder="记录美好生活..."
        />

        <button className="btn-submit">发布</button>
      </div>
    );
  }
}

// class Article extends React.Component {
// constructor(props) {
//   super(props);
// }

// render() {
function Article(props) {
  let likeText = `赞同 ${formatNum(props.like)}`;
  return (
    <div className="contentItem">
      <h2 className="contentItem-title">{props.title}</h2>
      <div className="richcontent">
        <div className="richcontent-inner">{props.content}</div>
        <div className="contentItem-actions">
          <button
            type="button"
            onClick={e => {
              props.onLike(1, e);
            }}
            className="Button VoteButton VoteButton--up"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="TriangleUp"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="10"
                height="10"
              >
                <path
                  d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            {likeText}
          </button>
          <button
            type="button"
            onClick={e => {
              props.onLike(-1, e);
            }}
            className="Button VoteButton VoteButton--down"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                width="10"
                height="10"
              >
                <path
                  d="M20.044 3H3.956C2.876 3 2 3.517 2 4.9c0 .326.087.533.236.896L10.216 19c.355.571.87 1.143 1.784 1.143s1.429-.572 1.784-1.143l7.98-13.204c.149-.363.236-.57.236-.896 0-1.386-.876-1.9-1.956-1.9z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="Button contentItem-action Button--plain Button--withIcon Button--withLabel"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Comment Button-zi"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
              >
                <path
                  d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            {props.comment} 条评论
          </button>
          <button
            type="button"
            className="Button contentItem-action Button--plain Button--withIcon Button--withLabel"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Share Button-zi"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
              >
                <path
                  d="M2.931 7.89c-1.067.24-1.275 1.669-.318 2.207l5.277 2.908 8.168-4.776c.25-.127.477.198.273.39L9.05 14.66l.927 5.953c.18 1.084 1.593 1.376 2.182.456l9.644-15.242c.584-.892-.212-2.029-1.234-1.796L2.93 7.89z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            分享
          </button>
          <button
            type="button"
            onClick={e => {
              props.onAction(ActionType.collection, e);
            }}
            className="Button contentItem-action Button--plain Button--withIcon Button--withLabel"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Star Button-zi"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
              >
                <path
                  d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            {props.collection ? "取消收藏" : "收藏"}
          </button>
          <button
            type="button"
            onClick={e => {
              props.onAction(ActionType.thank, e);
            }}
            className="Button contentItem-action Button--plain Button--withIcon Button--withLabel"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Heart Button-zi"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
              >
                <path
                  d="M2 8.437C2 5.505 4.294 3.094 7.207 3 9.243 3 11.092 4.19 12 6c.823-1.758 2.649-3 4.651-3C19.545 3 22 5.507 22 8.432 22 16.24 13.842 21 12 21 10.158 21 2 16.24 2 8.437z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            {props.thank ? "取消感谢" : "感谢"}
          </button>
        </div>
      </div>
    </div>
  );
  // }
}

function Comment(props) {
  return (
    <div className="commentItem">
      <div className="commentItem-meta flex">
        <span className="UserLink commentItem-avatar">
          <a className="avatar" target="_blank" href="/">
            {props.userName[0]}
          </a>
        </span>
        <span className="commentItem-name">
          <a className="UserLink-link" href="/">
            {props.userName}
          </a>
        </span>
        <span className="commentItem-time">{props.date}</span>
      </div>
      <div className="commentItem-metaSibling">
        <div className="commentItem-footer">
          <button
            type="button"
            className="Button commentItem-likeBtn Button--plain"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Like margin-r-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  d="M14.445 9h5.387s2.997.154 1.95 3.669c-.168.51-2.346 6.911-2.346 6.911s-.763 1.416-2.86 1.416H8.989c-1.498 0-2.005-.896-1.989-2v-7.998c0-.987.336-2.032 1.114-2.639 4.45-3.773 3.436-4.597 4.45-5.83.985-1.13 3.2-.5 3.037 2.362C15.201 7.397 14.445 9 14.445 9zM3 9h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            {props.like}
          </button>
          <button
            type="button"
            className="Button commentItem-talkBtn Button--plain"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Comments margin-r-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  d="M11 2c5.571 0 9 4.335 9 8 0 6-6.475 9.764-11.481 8.022-.315-.07-.379-.124-.78.078-1.455.54-2.413.921-3.525 1.122-.483.087-.916-.25-.588-.581 0 0 .677-.417.842-1.904.064-.351-.14-.879-.454-1.171A8.833 8.833 0 0 1 2 10c0-3.87 3.394-8 9-8zm10.14 9.628c.758.988.86 2.009.86 3.15 0 1.195-.619 3.11-1.368 3.938-.209.23-.354.467-.308.722.12 1.073.614 1.501.614 1.501.237.239-.188.562-.537.5-.803-.146-1.495-.42-2.546-.811-.29-.146-.336-.106-.563-.057-2.043.711-4.398.475-6.083-.927 5.965-.524 8.727-3.03 9.93-8.016z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            查看回复
          </button>
          <button
            type="button"
            className="Button commentItem-hoverBtn Button--plain"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Repl margin-r-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  d="M22.959 17.22c-1.686-3.552-5.128-8.062-11.636-8.65-.539-.053-1.376-.436-1.376-1.561V4.678c0-.521-.635-.915-1.116-.521L1.469 10.67a1.506 1.506 0 0 0-.1 2.08s6.99 6.818 7.443 7.114c.453.295 1.136.124 1.135-.501V17a1.525 1.525 0 0 1 1.532-1.466c1.186-.139 7.597-.077 10.33 2.396 0 0 .396.257.536.257.892 0 .614-.967.614-.967z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            回复
          </button>
          <button
            type="button"
            className="Button commentItem-hoverBtn Button--plain"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Like margin-r-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  d="M14.445 9h5.387s2.997.154 1.95 3.669c-.168.51-2.346 6.911-2.346 6.911s-.763 1.416-2.86 1.416H8.989c-1.498 0-2.005-.896-1.989-2v-7.998c0-.987.336-2.032 1.114-2.639 4.45-3.773 3.436-4.597 4.45-5.83.985-1.13 3.2-.5 3.037 2.362C15.201 7.397 14.445 9 14.445 9zM3 9h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            {props.diss ? "踩" : "取消踩"}
          </button>
          <button
            type="button"
            className="Button commentItem-hoverBtn Button--plain"
          >
            <span className="logo-svg">
              &#8203;
              <svg
                className="Zi Zi--Report margin-r-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  d="M19.947 3.129c-.633.136-3.927.639-5.697.385-3.133-.45-4.776-2.54-9.949-.888-.997.413-1.277 1.038-1.277 2.019L3 20.808c0 .3.101.54.304.718a.97.97 0 0 0 .73.304c.275 0 .519-.102.73-.304.202-.179.304-.418.304-.718v-6.58c4.533-1.235 8.047.668 8.562.864 2.343.893 5.542.008 6.774-.657.397-.178.596-.474.596-.887V3.964c0-.599-.42-.972-1.053-.835z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            举报
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentList(props) {
  let comments = [];
  if (props.comments.length > 0) {
    props.comments.map(comment => {
      return comments.push(<Comment key={comment.ID} {...comment} />);
    });
  } else {
    comments = [<div>暂无评论!</div>];
  }
  return <div className="comment-list">{comments}</div>;
}

class ArticleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      comments: []
    };
    this.toggleComments = this.toggleComments.bind(this);
  }

  toggleComments() {
    this.setState(preState => {
      return {
        showComments: !preState.showComments
      };
    });
  }

  loadData() {
    getComments()
      .then(data => {
        this.setState({
          comments: data.data.comments
        });
      })
      .catch(err => {
        console.log(`load comments data error!`);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showComments) {
      this.loadData();
    }
  }

  render() {
    let { onLike, onAction, ID, ...articleProps } = this.props;
    return (
      <div className="article">
        <Article
          {...articleProps}
          onLike={type => {
            onLike(type, ID);
          }}
          onAction={type => {
            onAction(type, ID);
          }}
        />
        {this.state.showComments && (
          <CommentList comments={this.state.comments} />
        )}
      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };

    this.idToIndex = {};
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    getArticles()
      .then(data => {
        data = data.data.articles;
        this.setState({
          articles: data
        });

        this.idToIndex = {};
        data.forEach((item, index) => {
          this.idToIndex[item.ID] = index;
        });
      })
      .catch(err => {
        this.idToIndex = {};
        this.setState({
          articles: []
        });
        console.log(`Log Article Data Error!`);
      });
  }

  handleLike(type, id) {
    let index = this.idToIndex[id];
    if (index === undefined) {
      return;
    }

    let data = this.state.articles.slice();
    if (data && data[index]) {
      data[index][ActionType.like] += Number(type);
      this.setState({
        articles: data
      });
    }
  }

  handleActions(type, id) {
    let index = this.idToIndex[id];
    if (index === undefined) {
      return;
    }

    let data = this.state.articles.slice();
    if (data && data[index]) {
      let typeData = data[index][type];
      data[index][type] = !typeData;
      this.setState({
        articles: data
      });
    }
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="content-box">
        <WriteArticle onSubmit={this.loadData} />

        {this.state.articles.map(article => {
          return (
            <ArticleComment
              key={article.ID}
              {...article}
              onLike={(type, id) => {
                this.handleLike(type, id);
              }}
              onAction={(type, id) => {
                this.handleActions(type, id);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Content;
