!function(){var t={body:document.querySelector("body"),btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop")},n=null;function e(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.btnStart.addEventListener("click",(function(){t.btnStart.disabled=!0,n=setInterval(e,1e3)})),t.btnStop.addEventListener("click",(function(){t.btnStart.disabled=!1,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.ac9241ca.js.map
