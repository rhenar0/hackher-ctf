import{m as o,C as a,h as g,T as p,d as C,M as l,c}from"./index.5a84c1a7.js";import{g as v}from"./scoreboard.ef861fbd.js";import{e as d}from"./index.1d8ca426.js";import{s as r,c as f}from"./clipboard.f24da0ba.js";import{g as u}from"./userscore.b81eb940.js";import"./echarts.128204f2.js";function h(e){let t=new DOMParser().parseFromString(e,"text/html");return t.querySelectorAll('a[href*="://"]').forEach(n=>{n.setAttribute("target","_blank")}),t.documentElement.outerHTML}window.Alpine=o;window.CTFd=a;o.store("challenge",{data:{view:""}});o.data("Hint",()=>({id:null,html:null,async showHint(e){if(e.target.open){let t=(await a.pages.challenge.loadHint(this.id)).data;if(t.content)this.html=h(t.html);else if(await a.pages.challenge.displayUnlock(this.id)){let n=await a.pages.challenge.loadUnlock(this.id);if(n.success){let w=(await a.pages.challenge.loadHint(this.id)).data;this.html=h(w.html)}else e.target.open=!1,a._functions.challenge.displayUnlockError(n)}else e.target.open=!1}}}));o.data("Challenge",()=>({id:null,next_id:null,submission:"",tab:null,solves:[],response:null,async init(){g()},getStyles(){let e={"modal-dialog":!0};try{switch(a.config.themeSettings.challenge_window_size){case"sm":e["modal-sm"]=!0;break;case"lg":e["modal-lg"]=!0;break;case"xl":e["modal-xl"]=!0;break;default:break}}catch(s){console.log("Error processing challenge_window_size"),console.log(s)}return e},async init(){g()},async showChallenge(){new p(this.$el).show()},async showSolves(){this.solves=await a.pages.challenge.loadSolves(this.id),this.solves.forEach(e=>(e.date=C(e.date).format("MMMM Do, h:mm:ss A"),e)),new p(this.$el).show()},getNextId(){return o.store("challenge").data.next_id},async nextChallenge(){let e=l.getOrCreateInstance("[x-ref='challengeWindow']");e._element.addEventListener("hidden.bs.modal",s=>{o.nextTick(()=>{this.$dispatch("load-challenge",this.getNextId())})},{once:!0}),e.hide()},async submitChallenge(){this.response=await a.pages.challenge.submitChallenge(this.id,this.submission),await this.renderSubmissionResponse()},async renderSubmissionResponse(){this.response.data.status==="correct"&&(this.submission=""),this.$dispatch("load-challenges")}}));o.data("ChallengeBoard",()=>({loaded:!1,challenges:[],challenge:null,async init(){if(this.challenges=await a.pages.challenges.getChallenges(),this.loaded=!0,window.location.hash){let e=decodeURIComponent(window.location.hash.substring(1)),s=e.lastIndexOf("-");if(s>=0){let i=[e.slice(0,s),e.slice(s+1)][1];await this.loadChallenge(i)}}},getCategories(){const e=[];this.challenges.forEach(s=>{const{category:t}=s;e.includes(t)||e.push(t)});try{const s=a.config.themeSettings.challenge_category_order;if(s){const t=new Function(`return (${s})`);e.sort(t())}}catch(s){console.log("Error running challenge_category_order function"),console.log(s)}return e},getChallenges(e){let s=this.challenges;e&&(s=this.challenges.filter(t=>t.category===e));try{const t=a.config.themeSettings.challenge_order;if(t){const i=new Function(`return (${t})`);s.sort(i())}}catch(t){console.log("Error running challenge_order function"),console.log(t)}return s},async loadChallenges(){this.challenges=await a.pages.challenges.getChallenges()},async loadChallenge(e){await a.pages.challenge.displayChallenge(e,s=>{s.data.view=h(s.data.view),o.store("challenge").data=s.data,o.nextTick(()=>{let t=l.getOrCreateInstance("[x-ref='challengeWindow']");t._element.addEventListener("hidden.bs.modal",i=>{history.replaceState(null,null," ")},{once:!0}),t.show(),history.replaceState(null,null,`#${s.data.name}-${e}`)})})}}));o.data("ScoreboardDetail",()=>({data:null,async init(){this.data=await a.pages.scoreboard.getScoreboardDetail(10);let e=v(a.config.userMode,this.data);d(this.$refs.scoregraph,e)}}));o.data("SettingsForm",()=>({success:null,error:null,initial:null,errors:[],init(){this.initial=r(this.$el)},async updateProfile(){this.success=null,this.error=null,this.errors=[];let e=r(this.$el,this.initial,!0);e.fields=[];for(const t in e)if(t.match(/fields\[\d+\]/)){let i={},n=parseInt(t.slice(7,-1));i.field_id=n,i.value=e[t],e.fields.push(i),delete e[t]}const s=await a.pages.settings.updateSettings(e);s.success?(this.success=!0,this.error=!1,setTimeout(()=>{this.success=null,this.error=null},3e3)):(this.success=!1,this.error=!0,Object.keys(s.errors).map(t=>{const i=s.errors[t];this.errors.push(i)}))}}));o.data("TokensForm",()=>({token:null,async generateToken(){const e=r(this.$el);e.expiration||delete e.expiration;const s=await a.pages.settings.generateToken(e);this.token=s.data.value,new l(this.$refs.tokenModal).show()},copyToken(){f(this.$refs.token)}}));o.data("Tokens",()=>({selectedTokenId:null,async deleteTokenModal(e){this.selectedTokenId=e,new l(this.$refs.confirmModal).show()},async deleteSelectedToken(){await a.pages.settings.deleteToken(this.selectedTokenId);const e=this.$refs[`token-${this.selectedTokenId}`];e&&e.remove()}}));o.data("UserGraphs",()=>({solves:null,fails:null,awards:null,solveCount:0,failCount:0,awardCount:0,getSolvePercentage(){return(this.solveCount/(this.solveCount+this.failCount)*100).toFixed(2)},getFailPercentage(){return(this.failCount/(this.solveCount+this.failCount)*100).toFixed(2)},getCategoryBreakdown(){const e=[],s={};this.solves.data.map(i=>{e.push(i.challenge.category)}),e.forEach(i=>{i in s?s[i]+=1:s[i]=1});const t=[];for(const i in s){const n=Number(s[i]/e.length*100).toFixed(2);t.push({name:i,count:s[i],color:c(i),percent:n})}return t},async init(){this.solves=await a.pages.users.userSolves("me"),this.fails=await a.pages.users.userFails("me"),this.awards=await a.pages.users.userAwards("me"),this.solveCount=this.solves.meta.count,this.failCount=this.fails.meta.count,this.awardCount=this.awards.meta.count,d(this.$refs.scoregraph,u(a.user.id,a.user.name,this.solves.data,this.awards.data))}}));o.store("inviteToken","");o.data("TeamEditModal",()=>({success:null,error:null,initial:null,errors:[],init(){this.initial=r(this.$el.querySelector("form"))},async updateProfile(){let e=r(this.$el,this.initial,!0);e.fields=[];for(const t in e)if(t.match(/fields\[\d+\]/)){let i={},n=parseInt(t.slice(7,-1));i.field_id=n,i.value=e[t],e.fields.push(i),delete e[t]}let s=await a.pages.teams.updateTeamSettings(e);s.success?(this.success=!0,this.error=!1,setTimeout(()=>{this.success=null,this.error=null},3e3)):(this.success=!1,this.error=!0,Object.keys(s.errors).map(t=>{const i=s.errors[t];this.errors.push(i)}))}}));o.data("TeamCaptainModal",()=>({success:null,error:null,errors:[],async updateCaptain(){let e=r(this.$el,null,!0),s=await a.pages.teams.updateTeamSettings(e);s.success?window.location.reload():(this.success=!1,this.error=!0,Object.keys(s.errors).map(t=>{const i=s.errors[t];this.errors.push(i)}))}}));o.data("TeamInviteModal",()=>({copy(){f(this.$refs.link)}}));o.data("TeamDisbandModal",()=>({errors:[],async disbandTeam(){let e=await a.pages.teams.disbandTeam();e.success?window.location.reload():this.errors=e.errors[""]}}));o.data("CaptainMenu",()=>({captain:!1,editTeam(){this.teamEditModal=new l(document.getElementById("team-edit-modal")),this.teamEditModal.show()},chooseCaptain(){this.teamCaptainModal=new l(document.getElementById("team-captain-modal")),this.teamCaptainModal.show()},async inviteMembers(){const e=await a.pages.teams.getInviteToken();if(e.success){const s=e.data.code,t=`${window.location.origin}${a.config.urlRoot}/teams/invite?code=${s}`;document.querySelector("#team-invite-modal input[name=link]").value=t,this.$store.inviteToken=t,this.teamInviteModal=new l(document.getElementById("team-invite-modal")),this.teamInviteModal.show()}},disbandTeam(){this.teamDisbandModal=new l(document.getElementById("team-disband-modal")),this.teamDisbandModal.show()}}));const y=e=>({solves:null,fails:null,awards:null,members:{},team:{},solveCount:0,failCount:0,awardCount:0,getSolvePercentage(){return(this.solveCount/(this.solveCount+this.failCount)*100).toFixed(2)},getFailPercentage(){return(this.failCount/(this.solveCount+this.failCount)*100).toFixed(2)},getCategoryBreakdown(){const s=[],t={};this.solves.data.map(n=>{s.push(n.challenge.category)}),s.forEach(n=>{n in t?t[n]+=1:t[n]=1});const i=[];for(const n in t)i.push({name:n,count:t[n],percent:(t[n]/s.length*100).toFixed(2),color:c(n)});return i},async init(){this.solves=await a.pages.teams.teamSolves(e),this.fails=await a.pages.teams.teamFails(e),this.awards=await a.pages.teams.teamAwards(e);const s=await a.fetch(`/api/v1/teams/${e}/members`,{method:"GET"});this.members=await s.json();const t=await a.fetch(`/api/v1/teams/${e}`,{method:"GET"});this.team=await t.json(),this.solveCount=this.solves.meta.count,this.failCount=this.fails.meta.count,this.awardCount=this.awards.meta.count,d(this.$refs.scoregraph,u(e,this.team.data.name,this.solves.data,this.awards.data))}});o.data("TeamGraphsPublic",e=>y(e));const k=e=>({solves:null,fails:null,awards:null,user:null,team:null,solveCount:0,failCount:0,awardCount:0,getSolvePercentage(){return(this.solveCount/(this.solveCount+this.failCount)*100).toFixed(2)},getFailPercentage(){return(this.failCount/(this.solveCount+this.failCount)*100).toFixed(2)},getCategoryBreakdown(){const s=[],t={};this.solves.map(n=>{s.push(n.challenge.category)}),s.forEach(n=>{n in t?t[n]+=1:t[n]=1});const i=[];for(const n in t){const m=Number(t[n]/s.length*100).toFixed(2);i.push({name:n,count:t[n],color:c(n),percent:m})}return i},async init(){this.solves=await a.pages.users.userSolves(e),this.fails=await a.pages.users.userFails(e),this.awards=await a.pages.users.userAwards(e);const s=await a.fetch(`/api/v1/users/${e}`,{method:"GET"});if(this.user=await s.json(),this.team={},this.user.data&&this.user.data.user_id){const t=await a.fetch(`/api/v1/teams/${this.user.data.team_id}`,{method:"GET"});this.team=await t.json()}this.solveCount=this.solves.meta.count,this.failCount=this.fails.meta.count,this.awardCount=this.awards.meta.count,d(this.$refs.scoregraph,u(this.user.data.id,this.user.data.name,this.solves.data,this.awards.data))}});o.data("UserGraphsPublic",e=>k(e));o.start();
