import{d as c,c as f}from"./index.5a84c1a7.js";function g(n){let t=n.concat();for(let s=0;s<n.length;s++)t[s]=n.slice(0,s+1).reduce(function(o,e){return o+e});return t}function x(n,t){let s={title:{left:"center",text:"Top 10 "+(n==="teams"?"Teams":"Users")},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{type:"scroll",orient:"horizontal",align:"left",bottom:35,data:[]},toolbox:{feature:{dataZoom:{yAxisIndex:"none"},saveAsImage:{}}},grid:{containLabel:!0},xAxis:[{type:"time",boundaryGap:!1,data:[]}],yAxis:[{type:"value"}],dataZoom:[{id:"dataZoomX",type:"slider",xAxisIndex:[0],filterMode:"filter",height:20,top:35,fillerColor:"rgba(233, 236, 241, 0.4)"}],series:[]};const o=Object.keys(t);for(let e=0;e<o.length;e++){const r=[],l=[];for(let a=0;a<t[o[e]].solves.length;a++){r.push(t[o[e]].solves[a].value);const i=c(t[o[e]].solves[a].date);l.push(i.toDate())}const d=g(r);let m=l.map(function(a,i){return[a,d[i]]});s.legend.data.push(t[o[e]].name);const u={name:t[o[e]].name,type:"line",label:{normal:{position:"top"}},itemStyle:{normal:{color:f(t[o[e]].name+t[o[e]].id)}},data:m};s.series.push(u)}return s}export{g as c,x as g};
