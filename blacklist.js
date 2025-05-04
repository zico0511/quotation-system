document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('blacklistForm');
  const lineIdInput = document.getElementById('lineId');
  const reasonInput = document.getElementById('reason');
  const blacklistTable = document.getElementById('currentUserId');

  // 確保當頁面加載時，黑名單資料已經被載入
  loadBlacklist();

  // 當表單提交時
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // 取得表單數據
    const lineId = lineIdInput.value.trim();
    const reason = reasonInput.value.trim();

    if (lineId && reason) {
      // 儲存黑名單資料
      addToBlacklist(lineId, reason);

      // 清空表單
      lineIdInput.value = '';
      reasonInput.value = '';
    }
  });

  // 將黑名單資料加入到列表中
  function addToBlacklist(lineId, reason) {
    // 從 localStorage 讀取現有的黑名單
    const blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];

    // 新的黑名單項目
    const newBlacklistItem = { lineId, reason };

    // 將新的項目加入到陣列中
    blacklist.push(newBlacklistItem);

    // 儲存回 localStorage
    localStorage.setItem('blacklist', JSON.stringify(blacklist));

    // 更新表格顯示
    loadBlacklist();
  }

  // 讀取並顯示黑名單
  function loadBlacklist() {
    const blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];

    // 清空現有表格
    blacklistTable.innerHTML = '';

    // 顯示每一條黑名單
    blacklist.forEach(function(item, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.lineId}</td>
        <td>${item.reason}</td>
        <td><button onclick="removeFromBlacklist(${index})">刪除</button></td>
      `;
      blacklistTable.appendChild(row);
    });
  }

  // 刪除黑名單項目
  window.removeFromBlacklist = function(index) {
    const blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
    blacklist.splice(index, 1);  // 刪除指定索引的項目
    localStorage.setItem('blacklist', JSON.stringify(blacklist));  // 更新 localStorage
    loadBlacklist();  // 重新載入黑名單
  };
});

// 模擬登入的操作，這裡假設使用者ID已經存放在 sessionStorage 中
sessionStorage.setItem('operatorId',); // 假設操作人員ID為 admin123

// 當頁面加載時，將操作人員ID填入表單中的 "操作人員 ID" 欄位
document.addEventListener('DOMContentLoaded', function () {
  const operatorId = sessionStorage.getItem('operatorId');
  document.getElementById('operatorId').value = operatorId;
});

// 黑名單表單提交事件
document.getElementById('blacklistForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const lineId = document.getElementById('lineId').value;
  const reason = document.getElementById('reason').value;
  const operatorId = document.getElementById('operatorId').value;

  const blacklistItems = JSON.parse(localStorage.getItem('blacklist')) || [];
  blacklistItems.push({ lineId, reason, operatorId });

  localStorage.setItem('blacklist', JSON.stringify(blacklistItems));
  updateBlacklistTable();
  document.getElementById('blacklistForm').reset();
});

// 更新黑名單表格
function updateBlacklistTable() {
  const blacklistItems = JSON.parse(localStorage.getItem('blacklist')) || [];
  const tableBody = document.getElementById('blacklistItems');
  tableBody.innerHTML = '';

  blacklistItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.lineId}</td>
      <td>${item.reason}</td>
      <td>${item.operatorId}</td>
      <td><button onclick="removeFromBlacklist('${item.lineId}')">移除</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// 移除黑名單項目
function removeFromBlacklist(lineId) {
  let blacklistItems = JSON.parse(localStorage.getItem('blacklist')) || [];
  blacklistItems = blacklistItems.filter(item => item.lineId !== lineId);
  localStorage.setItem('blacklist', JSON.stringify(blacklistItems));
  updateBlacklistTable();
}

// 頁面加載時更新表格
updateBlacklistTable();
// 頁面加載時自動填充操作人員 ID
document.addEventListener('DOMContentLoaded', function () {
  const operatorId = sessionStorage.getItem('operatorId');
  document.getElementById('operatorId').value = operatorId || '未知';
  
  // 加載現有的黑名單資料
  loadBlacklist();
});

// 黑名單表單提交處理
document.getElementById('blacklistForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const lineId = document.getElementById('lineId').value;
  const reason = document.getElementById('reason').value;
  const operatorId = document.getElementById('operatorId').value;

  // 檢查是否所有欄位都有填寫
  if (!lineId || !reason || !operatorId) {
    alert('請完整填寫所有欄位');
    return;
  }

  // 新增黑名單資料
  const blacklistItem = {
    lineId: lineId,
    reason: reason,
    operatorId: operatorId
  };

  // 儲存資料到本地存儲
  let blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
  blacklist.push(blacklistItem);
  localStorage.setItem('blacklist', JSON.stringify(blacklist));

  // 清空表單
  document.getElementById('lineId').value = '';
  document.getElementById('reason').value = '';

  // 加載並顯示黑名單資料
  loadBlacklist();
});

// 加載黑名單資料
function loadBlacklist() {
  const blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
  const tableBody = document.getElementById('blacklistItems');
  tableBody.innerHTML = '';

  blacklist.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.lineId}</td>
      <td>${item.reason}</td>
      <td>${item.operatorId}</td>
      <td><button onclick="deleteItem('${item.lineId}')">刪除</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// 刪除黑名單項目
function deleteItem(lineId) {
  let blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
  blacklist = blacklist.filter(item => item.lineId !== lineId);
  localStorage.setItem('blacklist', JSON.stringify(blacklist));

  // 重新加載黑名單資料
  loadBlacklist();
}
