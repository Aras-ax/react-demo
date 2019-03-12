This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# 缓存

> 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
>
> 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

## 强缓存

强缓存不会向服务器发送请求，直接从缓存中读取资源，在 chrome 控制台的 Network 选项中可以看到该请求返回`200`的状态码，并且`Size`显示`from disk cache`或`from memory cache`。强缓存可以通过设置两种 HTTPHeader 实现：`Expires`和`Cache-Control`。

### 1. Expires

缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。也就是说，`Expires=max-age + 请求时间`，需要和`Last-modified`结合使用。Expires 是 Web 服务器响应消息头字段，在响应 http 请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。
Expires 是 HTTP/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效。`Expires: Wed, 22 Oct 2018 08:41:00`GMT 表示资源会在`Wed, 22 Oct 2018 08:41:00 GMT`后过期，需要再次请求。

### 2. Cache-Control

在 HTTP/1.1 中，`Cache-Control`是最重要的规则，主要用于控制网页缓存。比如当`Cache-Control:max-age=300`时，则代表在这个请求正确返回时间（浏览器也会记录下来）的 5 分钟内再次加载资源，就会命中强缓存。
`Cache-Control`可以在请求头或者响应头中设置，并且可以组合使用多种指令：

| 指令         | 作用                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| public       | 响应可被客户端和代理服务器缓存                                                          |
| private      | 响应只可被客户端缓存                                                                    |
| max-age=30   | 缓存 30 秒后过期，需要重新请求                                                          |
| s-maxage=30  | 覆盖`max-age`，作用一样，只是在代理服务器中生效                                         |
| no-store     | 不缓存任何响应                                                                          |
| no-cache     | 资源被缓存，但是立即失效，下次会发起请求验证资源是否过期，配合[协商缓存](#协商缓存)使用 |
| max-stale=30 | 30 秒内，即使缓存过期也使用该缓存                                                       |
| min-fresh=30 | 希望在 30 秒内获取最新的响应                                                            |

**详细说明：**

- `public`：所有内容都将被缓存（客户端和代理服务器都可缓存）。具体来说响应可被任何中间节点缓存，如 `Browser`<--`proxy1`<--`proxy2`<--`Server`，中间的`proxy`可以缓存资源，比如下次再请求同一资源`proxy1`直接把自己缓存的东西给`Browser`而不再向`proxy2`要。

- `private`：所有内容只有客户端可以缓存，`Cache-Control`的`默认取值`。具体来说，表示中间节点不允许缓存，对于`Browser`<--`proxy1`<--`proxy2`<--`Server`，`proxy`会老老实实把`Server`返回的数据发送给`proxy1`,自己不缓存任何数据。当下次`Browser`再次请求时`proxy`会做好请求转发而不是自作主张给自己缓存的数据。

- `no-cache`：客户端缓存内容，是否使用缓存则需要经过[协商缓存](#协商缓存)来验证决定。表示不使用`Cache-Control`的缓存控制方式做前置验证，而是使用[Etag](#)或者[Last-Modified](#1.Last-Modified和If-Modified-Since)字段来控制缓存。

  > 需要注意的是，`no-cache`这个名字有一点误导。设置了`no-cache`之后，并不是说浏览器就不再缓存数据，只是浏览器在使用缓存数据时，需要先确认一下数据是否还跟服务器保持一致。

- `no-store`：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存

- `max-age`：`max-age=xxx`(xxx is numeric)表示缓存内容将在 xxx 秒后失效

- `s-maxage`（单位为 s)：同`max-age`作用一样，只在代理服务器中生效（比如 CDN 缓存）。比如当`s-maxage=60`时，在这 60 秒中，即使更新了 CDN 的内容，浏览器也不会进行请求。`max-age`用于普通缓存，而`s-maxage`用于代理缓存。`s-maxage`的优先级高于`max-age`。如果存在 s-maxage，则会覆盖掉`max-age`和`Expires`header。

- `max-stale`：能容忍的最大过期时间。`max-stale`指令标示了客户端愿意接收一个已经过期了的响应。如果指定了`max-stale`的值，则最大容忍时间为对应的秒数。如果没有指定，那么说明浏览器愿意接收任何 age 的响应（age 表示响应由源站生成或确认的时间与当前时间的差值）。

- `min-fresh`：能够容忍的最小新鲜度。`min-fresh`标示了客户端不愿意接受新鲜度不多于当前的 age 加上 min-fresh 设定的时间之和的响应。

### 3. Expires 和 Cache-Control 两者对比

其实这两者差别不大，区别就在于 Expires 是 http1.0 的产物，Cache-Control 是 http1.1 的产物，两者同时存在的话，Cache-Control 优先级高于 Expires；在某些不支持 HTTP1.1 的环境下，Expires 就会发挥用处。所以 Expires 其实是过时的产物，现阶段它的存在只是一种兼容性的写法。

强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已经更新，这可能会导致加载文件不是服务器端最新的内容，那我们如何获知服务器端内容是否已经发生了更新呢？此时我们需要用到协商缓存策略。

## 协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况：

- 协商缓存生效，返回`304`和`Not Modified`
- 协商缓存失效，返回`200`和请求结果

协商缓存可以通过设置两种 HTTP 头`Modified`和`ETag`。

### 1.Last-Modified 和 If-Modified-Since

浏览器在第一次访问资源时，服务器返回资源的同时，在 response header 中添加`Last-Modified`的 header，值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和 header；

```
Last-Modified: Fri, 22 Jul 2016 01:47:00 GMT
```

浏览器下一次请求这个资源，浏览器检测到有`Last-Modified`这个 header，于是添加`If-Modified-Since`这个 header，值就是`Last-Modified`中的值；服务器再次收到这个资源请求，会根据`If-Modified-Since`中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回 304 和空的响应体，直接从缓存读取，如果`If-Modified-Since`的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和`200`.

但是 Last-Modified 存在一些弊端：

如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源.因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源.既然根据文件修改时间来决定是否缓存尚有不足，能否可以直接根据文件内容是否修改来决定缓存策略？所以在 HTTP/1.1 出现了`ETag`和`If-None-Match`;

### 2.ETag 和 If-None-Match

`Etag`是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag 就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的 Etag 值放到 request header 里的`If-None-Match`里，服务器只需要比较客户端传来的 If-None-Match 跟自己服务器上该资源的 ETag 是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现 ETag 匹配不上，那么直接以常规`GET 200`回包形式将新的资源（当然也包括了新的 ETag）发给客户端；如果 ETag 是一致的，则直接返回`304`知会客户端直接使用本地缓存即可。

### 3.两者之间对比

- 首先在精确度上，Etag 要优于 Last-Modified。

  Last-Modified 的时间单位是秒，如果某个文件在 1 秒内改变了多次，那么他们的 Last-Modified 其实并没有体现出来修改，但是 Etag 每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的 Last-Modified 也有可能不一致。

- 第二在性能上，Etag 要逊于 Last-Modified，毕竟 Last-Modified 只需要记录时间，而 Etag 需要服务器通过算法来计算出一个 hash 值。

- 第三在优先级上，服务器校验优先考虑 Etag。

强制缓存优先于协商缓存进行，若强制缓存(Expires 和 Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since 和 Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回 200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回 304，继续使用缓存。

## 实际场景应用缓存策略

### 1.频繁变动的资源

```
Cache-Control: no-cache
```

对于频繁变动的资源，首先需要使用`Cache-Control: no-cache`使浏览器每次都请求服务器，然后配合`ETag`或者`Last-Modified`来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

### 2.不常变化的资源

```
Cache-Control: max-age=31536000
```

通常在处理这类资源时，给它们的`Cache-Control`配置一个很大的`max-age=31536000`(一年)，这样浏览器之后请求相同的 URL 会命中强制缓存。而为了解决更新的问题，就需要在文件名(或者路径)中添加 hash，版本号等动态字符，之后更改动态字符，从而达到更改引用 URL 的目的，让之前的强制缓存失效(其实并未立即失效，只是不再使用了而已)。
