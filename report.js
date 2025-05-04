let costRevenueChartInstance;
let profitChartInstance;
let categorySalesChartInstance;
let profitPercentageChartInstance;

// 訂單數據
const orders = [
    { date: '2025-04-01', cost: 100, price: 150, category: '衣服' },
    { date: '2025-04-02', cost: 200, price: 300, category: '食品' },
    { date: '2025-04-03', cost: 150, price: 250, category: '美妝' },
    // 添加更多訂單數據
];

// 設置默認年份和月份
function setDefaultDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    // 填充年份選項
    const yearSelect = document.getElementById('yearSelect');
    for (let i = 2020; i <= year; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
    yearSelect.value = year; // 默認選擇當前年份

    // 填充月份選項
    const monthSelect = document.getElementById('monthSelect');
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = String(i).padStart(2, '0');
        option.textContent = String(i).padStart(2, '0');
        monthSelect.appendChild(option);
    }
    monthSelect.value = month; // 默認選擇當前月份
}

// 生成報表和更新圖表
function generateCharts() {
    const year = document.getElementById('yearSelect').value;
    const month = document.getElementById('monthSelect').value;

    // 過濾訂單資料 (篩選指定年份和月份)
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        const orderYear = orderDate.getFullYear();
        const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
        return (year ? orderYear === parseInt(year) : true) && (month ? orderMonth === month : true);
    });

    // 計算統計資料
    const totalCost = filteredOrders.reduce((acc, order) => acc + order.cost, 0);
    const totalRevenue = filteredOrders.reduce((acc, order) => acc + order.price, 0);
    const totalProfit = totalRevenue - totalCost;

    // 更新統計圖表
    updateCostRevenueChart(totalCost, totalRevenue);
    updateProfitChart(totalProfit);
    updateCategorySalesChart(filteredOrders);
    updateProfitPercentageChart(totalProfit, totalRevenue);
}

// 更新成本與售價圖表（柱狀圖）
function updateCostRevenueChart(totalCost, totalRevenue) {
    const ctx = document.getElementById('costRevenueChart').getContext('2d');
    destroyChartInstance(costRevenueChartInstance);  // 銷毀舊圖表
    costRevenueChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['成本', '售價'],
            datasets: [{
                label: '成本與售價',
                data: [totalCost, totalRevenue],
                backgroundColor: ['#ff7f7f', '#7fff7f'],
                borderColor: ['#ff4d4d', '#4dff4d'],
                borderWidth: 1
            }]
        }
    });
}

// 更新利潤圖表（折線圖）
function updateProfitChart(totalProfit) {
    const ctx = document.getElementById('profitChart').getContext('2d');
    destroyChartInstance(profitChartInstance);  // 銷毀舊圖表
    profitChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['利潤'],
            datasets: [{
                label: '利潤',
                data: [totalProfit],
                borderColor: '#ffcc00',
                fill: false,
                borderWidth: 2
            }]
        }
    });
}

// 更新商品分類銷售圖表（圓餅圖）
function updateCategorySalesChart(filteredOrders) {
    const categories = [...new Set(filteredOrders.map(order => order.category))];
    const categorySales = categories.map(category => {
        return filteredOrders.filter(order => order.category === category).reduce((acc, order) => acc + order.price, 0);
    });

    const ctx = document.getElementById('categorySalesChart').getContext('2d');
    destroyChartInstance(categorySalesChartInstance);  // 銷毀舊圖表
    categorySalesChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: categorySales,
                backgroundColor: ['#ff7f7f', '#ffcc00', '#7fff7f', '#ff66cc'],
            }]
        }
    });
}

// 更新利潤百分比圖表（圓餅圖）
function updateProfitPercentageChart(totalProfit, totalRevenue) {
    const profitPercentage = (totalProfit / totalRevenue) * 100;
    const ctx = document.getElementById('profitPercentageChart').getContext('2d');
    destroyChartInstance(profitPercentageChartInstance);  // 銷毀舊圖表
    profitPercentageChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['利潤', '非利潤'],
            datasets: [{
                data: [profitPercentage, 100 - profitPercentage],
                backgroundColor: ['#00cc99', '#cccccc'],
            }]
        }
    });
}

// 銷毀現有圖表
function destroyChartInstance(instance) {
    if (instance) {
        instance.destroy();
    }
}

// 匯出 Excel 報表
function exportExcel() {
    const year = document.getElementById('yearSelect').value;
    const month = document.getElementById('monthSelect').value;

    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        const orderYear = orderDate.getFullYear();
        const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
        return (year ? orderYear === parseInt(year) : true) && (month ? orderMonth === month : true);
    });

    let csvContent = "訂單日期, 商品類別, 成本, 售價\n";
    filteredOrders.forEach(order => {
        csvContent += `${order.date}, ${order.category}, ${order.cost}, ${order.price}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, `${year}-${month}_報表.csv`);
}

document.getElementById('generateReportBtn').addEventListener('click', generateCharts);
document.getElementById('exportExcelBtn').addEventListener('click', exportExcel);

// 初始化頁面
setDefaultDate();
generateCharts();
