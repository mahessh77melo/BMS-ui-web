require("regenerator-runtime");var e,t=(e=require("axios"))&&e.__esModule?e.default:e;require("core-js/modules/es.math.hypot.js");let r,o=[];const n=function(e){const t=document.getElementById("myChart"),r=[e.batteryCurrent,e.batteryVoltage,e.SOC,e.speed,e.torque,e.armatureCurrent];return new Chart(t,{type:"bar",data:{labels:["Battery Current","Battery Voltage","SOC","Speed","Torque","Armature Current"],datasets:[{label:"Units",data:r,backgroundColor:["rgba(249, 65, 68, 0.65)","rgba(243, 114, 44, 0.65)","rgba(248, 150, 30, 0.65)","rgba(249, 199, 79, 0.65)","rgba(144, 190, 109, 0.65)","rgba(67, 170, 139, 0.65)","rgba(87, 117, 144, 0.65)"],borderColor:["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590"],borderWidth:1,borderRadius:3}]},options:{scales:{y:{beginAtZero:!0}},layout:{padding:20},animation:{easing:"easeOutBounce"},font:{size:26},plugins:{legend:{display:!1},tooltip:{displayColors:!0,backgroundColor:"#c3ecec",bodyColor:"#6930c3",titleColor:"#7400b8",titleMarginBottom:10,padding:"10",titleFont:{family:"Lato",size:16},bodyFont:{family:"Lato",size:14},animation:{easing:"easeOutBounce"},bodyAlign:"right"}}}})},a=async function(e){let t=0;setInterval((()=>{const r=[o[t].batteryCurrent,o[t].batteryVoltage,o[t].SOC,o[t].speed,o[t].torque,o[t].armatureCurrent];!function(e,t){e.data.datasets[0].data=t,e.update()}(e,r),t+=1,t==o.length&&(t=0)}),1e3)},c=document.querySelector("form#register-form"),i=document.querySelector("form#login-form"),s=document.querySelector(".section__chart"),l=document.querySelector(".section__footer"),u=document.querySelector(".section__lander");let d={id:null,username:null,carNumber:null,password:null,isLoggedIn:!1};const m=function(...e){return e.some((e=>0===e.length))},y=function(e){[...e.querySelectorAll(".form__input")].forEach((e=>e.value=""))},f=async function(e){const r=c.querySelector('.form__input[name="username"]').value,o=c.querySelector('.form__input[name="password"]').value,n=c.querySelector('.form__input[name="carNumber"]').value;if(o!==c.querySelector('.form__input[name="passwordSecond"]').value)return void h("Passwords don't match, Check it once  again");if(m(r,o))return void h("Empty fields");const a={username:r,password:o,carNumber:n};t.post("/register",a).then((e=>{e.data?(O(),h(`Car number ${e.data.carNumber} registered successfully with username: ${e.data.username}`),y(c)):h("Username already registered, use a different one.")})).catch((e=>{h(e.message)}))},p=async function(e){const c=i.querySelector('.form__input[name="username"]').value,s=i.querySelector('.form__input[name="password"]').value,l={username:c,password:s};m(c,s)?h("Empty fields"):t.post("/login",l).then((e=>{e.data&&""!==e.data?(O(),h(`Logged in as ${e.data.username}!`),g(e.data),async function(){try{await t.get("/values").then((e=>{console.log(e.data),o=e.data,o.length?(r=n(o[0]),a(r)):h("There was no data received from the backend! ;(")}))}catch(e){console.log(e),h("There was an error while retrieving the values of the chart")}}(),_(),y(i)):h("Invalid credentials")})).catch((e=>{console.log(e),h(`Error logging in! Try again after checking the credentials :)\n${e.message}`)}))},g=function(e){d={id:e._id,username:e.username,password:e.password,carNumber:e.carNumber,isLoggedin:!0}},_=function(){const e=`\n\tWelcome ${d.username}!\n\t`;u.querySelector(".right").innerHTML=e,s.style.display="block",l.style.paddingTop="4rem",l.style.marginTop="0",s.scrollIntoView()},h=function(e){const t=`\n\t<div class="alert">\n\t\t<div class="alert__message">\n\t\t${e}\n\t\t</div>\n\t\t<div class="alert__close">X</div>\n\t</div>\n\t`;document.querySelector("body").insertAdjacentHTML("beforeend",t);const r=document.querySelector(".alert"),o=function(){r.style.transform="translateX(-50%) translateY(10rem)",setTimeout((()=>{r.style.display="none",r.remove(),[...document.querySelectorAll(".alert")].forEach((e=>e.remove()))}),250)};r.querySelector(".alert__close").addEventListener("click",o),setTimeout(o,4e3)};c.addEventListener("submit",(e=>{e.preventDefault(),f(e)})),i.addEventListener("submit",(e=>{e.preventDefault(),p(e)}));const b=document.querySelector(".section__lander"),v=document.querySelector(".section__features"),q=document.querySelector(".section__map"),S=document.querySelector(".section__chart"),w=(document.querySelector(".section__footer"),document.querySelector(".nav__item#features")),E=document.querySelector(".nav__item#map"),C=document.querySelector(".nav__item#chart"),k=document.querySelector(".footer__link#home"),T=document.querySelector(".btn-login"),A=document.querySelector(".footer__link#register"),M=document.querySelector("#login-overlay"),B=document.querySelector("#register-overlay"),O=function(){[M,B].forEach((e=>e.style.display="none"))};exports.hideBoth=O;const x=function(e){e.addEventListener("click",(()=>{const t=[...document.querySelectorAll(".form__input.input-password")];" visibility_off "===e.innerHTML?e.innerHTML=" visibility ":e.innerHTML=" visibility_off ",t.forEach((e=>{"password"===e.type?e.type="text":e.type="password"}))}))};!function(){var e;null===(e=navigator.geolocation)||void 0===e||e.getCurrentPosition(function({coords:e}){const{latitude:t,longitude:r}=e,o=L.map("mapid").setView([t,r],13);L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(o),L.marker([t,r]).addTo(o).bindPopup("This is your current location right now.").openPopup(),L.circle([t,r],{color:"#4ea8de",fillColor:"#64dfdf",fillOpacity:.5,radius:500}).addTo(o)}.bind(this),(()=>{alert("We weren't able to access your current location")}),{enableHighAccuracy:!0})}(),function(){const e=function(e,t){e.addEventListener("click",(()=>{t.scrollIntoView()}))};e(w,v),e(E,q),e(C,S),e(k,b)}(),[...document.querySelectorAll("#show-password")].forEach((e=>x(e))),T.addEventListener("click",(()=>{M.style.display="flex"})),A.addEventListener("click",(()=>{B.style.display="flex"})),[...document.querySelectorAll(".close-button")].forEach((e=>e.addEventListener("click",O))),[...document.querySelectorAll(".overlay")].forEach((e=>e.addEventListener("click",O))),window.addEventListener("keyup",(e=>{"Escape"==e.key&&O()}));
//# sourceMappingURL=index.686c4c97.js.map