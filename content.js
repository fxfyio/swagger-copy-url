// 设置观察选项：哪些变动将被观察
const config = { childList: true, subtree: true };

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(function(mutationsList, observer) {
    const rows = Array.from(document.querySelectorAll(".opblock-summary"));
    if (rows.length > 0) {
        rows.forEach((row) => {
          const copyVarBtn = document.createElement("button");
          copyVarBtn.textContent = "复制变量名";
          copyVarBtn.style.cssText = "width: 120px; height: 36px; background-color: blue; color: white; border: none; border-radius: 5px; margin:8px";
          row.appendChild(copyVarBtn);

          copyVarBtn.addEventListener("click", (event) => {
              const urlElement = row.querySelector(".opblock-summary-path");
              var url = urlElement.textContent.trim();
              url = url 
              .replace(/^\//, '') // 删除路径开始的斜杠
              .split('/') // 将路径分割成段
              .map((segment, index) => {
                  // 如果是第一个段，就不需要大写第一个字符，否则需要大写第一个字符
                  return index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1);
              })
              .join('');

              navigator.clipboard.writeText(url).then(function() {
                  alert(url + '已成功复制到剪切板');
              }, function(err) {
                  alert('错误: ', err);
              });
          });

            const copyBtn = document.createElement("button");
            copyBtn.textContent = "复制URL路径";
            copyBtn.style.cssText = "width: 120px; height: 36px; background-color: blue; color: white; border: none; border-radius: 5px;  margin:8px";
            row.appendChild(copyBtn);

            copyBtn.addEventListener("click", (event) => {
                const urlElement = row.querySelector(".opblock-summary-path");
                const url = urlElement.textContent.trim();
                navigator.clipboard.writeText(url).then(function() {
                    alert(url + '已成功复制到剪切板');
                }, function(err) {
                    alert('错误: ', err);
                });
            });




        });
        // 一旦我们找到了目标元素，就停止观察
        observer.disconnect();
    }
});

// 开始观察目标节点，使用配置参数
observer.observe(document.body, config);
