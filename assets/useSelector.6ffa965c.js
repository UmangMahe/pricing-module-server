import{r as e,c as b,p as m,q as h}from"./index.0a253438.js";function g(){var r=e.exports.useContext(b);return r}var y=function(s,t){return s===t};function k(r,s,t,p){var i=e.exports.useReducer(function(c){return c+1},0),v=i[1],o=e.exports.useMemo(function(){return m(t,p)},[t,p]),u=e.exports.useRef(),a=e.exports.useRef(),x=e.exports.useRef(),n=e.exports.useRef(),d=t.getState(),f;try{if(r!==a.current||d!==x.current||u.current){var R=r(d);n.current===void 0||!s(R,n.current)?f=R:f=n.current}else f=n.current}catch(c){throw u.current&&(c.message+=`
The error may be correlated with this previous error:
`+u.current.stack+`

`),c}return h(function(){a.current=r,x.current=d,n.current=f,u.current=void 0}),h(function(){function c(){try{var l=t.getState();if(l===x.current)return;var S=a.current(l);if(s(S,n.current))return;n.current=S,x.current=l}catch(C){u.current=C}v()}return o.onStateChange=c,o.trySubscribe(),c(),function(){return o.tryUnsubscribe()}},[t,o]),f}function E(r){r===void 0&&(r=b);var s=r===b?g:function(){return e.exports.useContext(r)};return function(p,i){i===void 0&&(i=y);var v=s(),o=v.store,u=v.subscription,a=k(p,i,o,u);return e.exports.useDebugValue(a),a}}var V=E();export{V as a,g as u};
