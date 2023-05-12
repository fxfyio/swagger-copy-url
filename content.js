
function showToast(message, duration = 3000) {
  // 创建一个div元素来作为toast
  const toast = document.createElement('div');

  // 设置toast的样式
  toast.style.position = 'fixed';
  toast.style.top = '100px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  toast.style.color = 'white';
  toast.style.padding = '10px';
  toast.style.borderRadius = '5px';
  toast.style.zIndex = '9999';
  toast.style.textAlign = 'center';

  // 设置toast的内容
  toast.textContent = message;

  // 添加toast到页面
  document.body.appendChild(toast);

  // 在指定的持续时间后移除toast
  setTimeout(() => {
      document.body.removeChild(toast);
  }, duration);
}


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
                showToast(url + ' 已成功复制到剪切板')
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
                  showToast(url + ' 已成功复制到剪切板')
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


