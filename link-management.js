document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('linkForm');
  const linkNameInput = document.getElementById('linkName');
  const urlInput = document.getElementById('url');
  const linkTable = document.getElementById('linkItems');

  // 確保當頁面加載時，網址列表已經被載入
  loadLinks();

  // 當表單提交時
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // 取得表單數據
    const linkName = linkNameInput.value.trim();
    const url = urlInput.value.trim();

    if (linkName && url) {
      // 儲存網址資料
      addToLinks(linkName, url);

      // 清空表單
      linkNameInput.value = '';
      urlInput.value = '';
    }
  });

  // 將網址資料加入到列表中
  function addToLinks(linkName, url) {
    // 從 localStorage 讀取現有的網址列表
    const links = JSON.parse(localStorage.getItem('links')) || [];

    // 新的網址項目
    const newLinkItem = { linkName, url };

    // 將新的項目加入到陣列中
    links.push(newLinkItem);

    // 儲存回 localStorage
    localStorage.setItem('links', JSON.stringify(links));

    // 更新表格顯示
    loadLinks();
  }

  // 讀取並顯示網址
  function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];

    // 清空現有表格
    linkTable.innerHTML = '';

    // 顯示每一條網址
    links.forEach(function(item, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.linkName}</td>
        <td><a href="${item.url}" target="_blank">${item.url}</a></td>
        <td><button onclick="removeFromLinks(${index})">刪除</button></td>
      `;
      linkTable.appendChild(row);
    });
  }

  // 刪除網址項目
  window.removeFromLinks = function(index) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.splice(index, 1);  // 刪除指定索引的項目
    localStorage.setItem('links', JSON.stringify(links));  // 更新 localStorage
    loadLinks();  // 重新載入網址列表
  };
});
