(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[975],{7484:function(t){var e,n,s,r,i,a,c,o,u,d,h,l,f,m,$,v,p,x,y,g,j;t.exports=(e="millisecond",n="second",s="minute",r="hour",i="week",a="month",c="quarter",o="year",u="date",d="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,l=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},($={})[m="en"]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||"th")+"]"}},v=function(t){return t instanceof g},p=function t(e,n,s){var r;if(!e)return m;if("string"==typeof e){var i=e.toLowerCase();$[i]&&(r=i),n&&($[i]=n,r=i);var a=e.split("-");if(!r&&a.length>1)return t(a[0])}else{var c=e.name;$[c]=e,r=c}return!s&&r&&(m=r),r||!s&&m},x=function(t,e){if(v(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new g(n)},(y={s:f,z:function(t){var e=-t.utcOffset(),n=Math.abs(e);return(e<=0?"+":"-")+f(Math.floor(n/60),2,"0")+":"+f(n%60,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),r=e.clone().add(s,a),i=n-r<0,c=e.clone().add(s+(i?-1:1),a);return+(-(s+(n-r)/(i?r-c:c-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return({M:a,y:o,w:i,d:"day",D:u,h:r,m:s,s:n,ms:e,Q:c})[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}}).l=p,y.i=v,y.w=function(t,e){return x(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})},j=(g=function(){function t(t){this.$L=p(t.locale,null,!0),this.parse(t)}var f=t.prototype;return f.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(h);if(s){var r=s[2]-1||0,i=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,i)):new Date(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,i)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},f.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},f.$utils=function(){return y},f.isValid=function(){return this.$d.toString()!==d},f.isSame=function(t,e){var n=x(t);return this.startOf(e)<=n&&n<=this.endOf(e)},f.isAfter=function(t,e){return x(t)<this.startOf(e)},f.isBefore=function(t,e){return this.endOf(e)<x(t)},f.$g=function(t,e,n){return y.u(t)?this[e]:this.set(n,t)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(t,e){var c=this,d=!!y.u(e)||e,h=y.p(t),l=function(t,e){var n=y.w(c.$u?Date.UTC(c.$y,e,t):new Date(c.$y,e,t),c);return d?n:n.endOf("day")},f=function(t,e){return y.w(c.toDate()[t].apply(c.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),c)},m=this.$W,$=this.$M,v=this.$D,p="set"+(this.$u?"UTC":"");switch(h){case o:return d?l(1,0):l(31,11);case a:return d?l(1,$):l(0,$+1);case i:var x=this.$locale().weekStart||0,g=(m<x?m+7:m)-x;return l(d?v-g:v+(6-g),$);case"day":case u:return f(p+"Hours",0);case r:return f(p+"Minutes",1);case s:return f(p+"Seconds",2);case n:return f(p+"Milliseconds",3);default:return this.clone()}},f.endOf=function(t){return this.startOf(t,!1)},f.$set=function(t,i){var c,d=y.p(t),h="set"+(this.$u?"UTC":""),l=((c={}).day=h+"Date",c[u]=h+"Date",c[a]=h+"Month",c[o]=h+"FullYear",c[r]=h+"Hours",c[s]=h+"Minutes",c[n]=h+"Seconds",c[e]=h+"Milliseconds",c)[d],f="day"===d?this.$D+(i-this.$W):i;if(d===a||d===o){var m=this.clone().set(u,1);m.$d[l](f),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else l&&this.$d[l](f);return this.init(),this},f.set=function(t,e){return this.clone().$set(t,e)},f.get=function(t){return this[y.p(t)]()},f.add=function(t,e){var c,u=this;t=Number(t);var d=y.p(e),h=function(e){var n=x(u);return y.w(n.date(n.date()+Math.round(e*t)),u)};if(d===a)return this.set(a,this.$M+t);if(d===o)return this.set(o,this.$y+t);if("day"===d)return h(1);if(d===i)return h(7);var l=((c={})[s]=6e4,c[r]=36e5,c[n]=1e3,c)[d]||1,f=this.$d.getTime()+t*l;return y.w(f,this)},f.subtract=function(t,e){return this.add(-1*t,e)},f.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var s=t||"YYYY-MM-DDTHH:mm:ssZ",r=y.z(this),i=this.$H,a=this.$m,c=this.$M,o=n.weekdays,u=n.months,h=function(t,n,r,i){return t&&(t[n]||t(e,s))||r[n].slice(0,i)},f=function(t){return y.s(i%12||12,t,"0")},m=n.meridiem||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:c+1,MM:y.s(c+1,2,"0"),MMM:h(n.monthsShort,c,u,3),MMMM:h(u,c),D:this.$D,DD:y.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(i),HH:y.s(i,2,"0"),h:f(1),hh:f(2),a:m(i,a,!0),A:m(i,a,!1),m:String(a),mm:y.s(a,2,"0"),s:String(this.$s),ss:y.s(this.$s,2,"0"),SSS:y.s(this.$ms,3,"0"),Z:r};return s.replace(l,function(t,e){return e||$[t]||r.replace(":","")})},f.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},f.diff=function(t,e,u){var d,h=y.p(e),l=x(t),f=(l.utcOffset()-this.utcOffset())*6e4,m=this-l,$=y.m(this,l);return $=((d={})[o]=$/12,d[a]=$,d[c]=$/3,d[i]=(m-f)/6048e5,d.day=(m-f)/864e5,d[r]=m/36e5,d[s]=m/6e4,d[n]=m/1e3,d)[h]||m,u?$:y.a($)},f.daysInMonth=function(){return this.endOf(a).$D},f.$locale=function(){return $[this.$L]},f.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=p(t,e,!0);return s&&(n.$L=s),n},f.clone=function(){return y.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},t}()).prototype,x.prototype=j,[["$ms",e],["$s",n],["$m",s],["$H",r],["$W","day"],["$M",a],["$y",o],["$D",u]].forEach(function(t){j[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),x.extend=function(t,e){return t.$i||(t(e,g,x),t.$i=!0),x},x.locale=p,x.isDayjs=v,x.unix=function(t){return x(1e3*t)},x.en=$[m],x.Ls=$,x.p={},x)},619:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reservation/detail",function(){return n(3792)}])},3792:function(t,e,n){"use strict";n.r(e);var s=n(5893),r=n(4184),i=n.n(r),a=n(7294),c=n(1163),o=n(7484),u=n.n(o),d=n(6154),h=n(6167);e.default=function(t){var e=t.fadeState,n=(0,c.useRouter)(),r=n.query;return((0,a.useEffect)(function(){r&&r.reservationNumber||n.push("/")}),r)?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(h.Z,{title:"예약 조회",description:"한옥스테이 여여의 예약 조회 페이지입니다.",siteTitle:"한옥스테이 여여"}),(0,s.jsx)("div",{className:i()("reservation-detail-wrap ".concat(e)),children:(0,s.jsxs)("div",{className:"section-wrap",children:[(0,s.jsxs)("div",{className:i()("content-wrap"),children:[(0,s.jsx)("div",{className:i()("header border-none"),children:(0,s.jsxs)("strong",{children:[r.roomName," 예약이 완료되었습니다."]})}),(0,s.jsxs)("div",{className:i()("content__schedule"),children:[(0,s.jsxs)("div",{className:i()("content__schedule-content check-in"),children:[(0,s.jsx)("strong",{children:"체크인"}),(0,s.jsx)("span",{className:i()("date"),children:r.startDate}),(0,s.jsx)("span",{className:i()("time"),children:"오후 3:00"})]}),(0,s.jsx)("div",{className:i()("content-contour")}),(0,s.jsxs)("div",{className:i()("content__schedule-content check-out"),children:[(0,s.jsx)("strong",{children:"체크아웃"}),(0,s.jsx)("span",{className:i()("date"),children:r.endDate}),(0,s.jsx)("span",{className:i()("time"),children:"오전 11:00"})]})]})]}),(0,s.jsx)("div",{className:i()("section-contour")}),(0,s.jsxs)("div",{className:i()("section"),children:[(0,s.jsx)("div",{className:i()("header"),children:(0,s.jsx)("strong",{children:"예약 세부정보"})}),(0,s.jsx)("div",{className:i()("content__normal"),children:(0,s.jsxs)("div",{className:i()("content"),children:[(0,s.jsx)("strong",{children:"게스트"}),(0,s.jsxs)("span",{children:["게스트 ",r.guestCount,"명"]})]})}),(0,s.jsx)("div",{className:i()("content__normal"),children:(0,s.jsxs)("div",{className:i()("content"),children:[(0,s.jsx)("strong",{children:"예약 번호"}),(0,s.jsx)("span",{children:r.reservationNumber})]})}),(0,s.jsx)("div",{className:i()("content__refund"),children:(0,s.jsxs)("div",{className:i()("content"),children:[(0,s.jsx)("strong",{children:"환불정책"}),(0,s.jsxs)("span",{children:[u()(r.startDate).subtract(10,"day").format("MM/DD")," 이전에 취소하면 전액 환불을 받으실 수 있습니다. 그 이후에는 취소 시점에 따라 환불액이 결정됩니다."," "]}),(0,s.jsx)("div",{className:i()("button-wrap"),children:(0,s.jsx)("button",{type:"button",onClick:function(){if(window.confirm("해당 예약을 취소하시겠습니까?")){var t={phoneNumber:r.phoneNumber,reason:"",reservationId:Number(r.reservationNumber)};(0,d.Z)({method:"delete",url:"payment/refund",data:t}).then(function(){alert("정상적으로 예약이 취소되었습니다."),n.push("/")}).catch(function(){return alert("정상적으로 취소되지 않았습니다.")})}else console.log("Thing was not saved to the database.")},children:"예약 취소"})})]})})]}),(0,s.jsx)("div",{className:i()("section-contour")}),(0,s.jsxs)("div",{className:i()("section"),children:[(0,s.jsx)("div",{className:i()("header"),children:(0,s.jsx)("strong",{children:"결제 정보"})}),(0,s.jsx)("div",{className:i()("content__normal"),children:(0,s.jsxs)("div",{className:i()("content"),children:[(0,s.jsx)("strong",{children:"총비용"}),(0,s.jsxs)("span",{children:["₩ ",r.paidAmount," KRW"]})]})})]})]})})]}):null}},6167:function(t,e,n){"use strict";n.d(e,{Z:function(){return a}});var s=n(5893),r=n(9008),i=n.n(r);function a(t){var e=t.title,n=t.description,r=t.siteTitle;return(0,s.jsxs)(i(),{children:[(0,s.jsx)("title",{children:"".concat(e," | ").concat(r)}),(0,s.jsx)("meta",{name:"description",content:n}),(0,s.jsx)("meta",{property:"og:type",content:"website"}),(0,s.jsx)("meta",{property:"og:title",content:e}),(0,s.jsx)("meta",{property:"og:description",content:n}),(0,s.jsx)("meta",{property:"og:site_name",content:r})]})}}},function(t){t.O(0,[774,888,179],function(){return t(t.s=619)}),_N_E=t.O()}]);