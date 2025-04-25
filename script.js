console.warn = () => {};
const data = [
    {
        "category": "Выручка, руб",
        "today": 500521,
        "yesterday": 480521,
        "change": "4%",
        "weekDay": 4805121
    },
    {
        "category": "Наличные",
        "today": 300000,
        "yesterday": 300000,
        "change": "0%",
        "weekDay": 300000
    },
    {
        "category": "Безналичный расчет",
        "today": 100000,
        "yesterday": 100000,
        "change": "0%",
        "weekDay": 100000
    },
    {
        "category": "Кредитные карты",
        "today": 100521,
        "yesterday": 100521,
        "change": "0%",
        "weekDay": 100521
    },
    {
        "category": "Средний чек, руб",
        "today": 1300,
        "yesterday": 900,
        "change": "44%",
        "weekDay": 900
    },
    {
        "category": "Средний гость, руб",
        "today": 1200,
        "yesterday": 800,
        "change": "50%",
        "weekDay": 800
    },
    {
        "category": "Удаления из чека (после оплаты), руб",
        "today": 1000,
        "yesterday": 1100,
        "change": "-9%",
        "weekDay": 900
    },
    {
        "category": "Удаления из чека (до оплаты), руб",
        "today": 1300,
        "yesterday": 1300,
        "change": "0%",
        "weekDay": 900
    },
    {
        "category": "Количество чеков",
        "today": 34,
        "yesterday": 36,
        "change": "-6%",
        "weekDay": 34
    },
    {
        "category": "Количество гостей",
        "today": 34,
        "yesterday": 36,
        "change": "-6%",
        "weekDay": 32
    }
];

const table = document.querySelector('table tbody');

let chart = null;

const chartRow = document.createElement('tr');
chartRow.innerHTML = '<td colspan="4"><div id="chart-container"></div></td>';

data.forEach(function (elem, index) {
    const tr = document.createElement('tr');
    tr.dataset.index = index;
    table.append(tr);

    const category = document.createElement('td');
    category.innerHTML = elem.category;
    tr.append(category);

    const today = document.createElement('td');
    today.innerHTML = elem.today; 
    tr.append(today);

    const yesterday = document.createElement('td');
    yesterday.classList.add('yesterday');
    switch (true) {
    case parseFloat(elem.change) > 0 :
        yesterday.classList.add('green');
        break;
    case parseFloat(elem.change) < 0 :
        yesterday.classList.add('red');
        break;
    default: 
        yesterday.classList.add('gray');
    }
    yesterday.innerHTML = '<span>' + elem.yesterday + '</span>';
    yesterday.innerHTML += '<span>' + elem.change + '</span>';
    tr.append(yesterday);

    const weekDay = document.createElement('td');
    weekDay.innerHTML = elem.weekDay; 
    tr.append(weekDay);

    tr.addEventListener('click', function() {
        document.querySelector('tr').classList.remove('selected-row');
        this.classList.add('selected-row');

        this.parentElement.insertBefore(chartRow, this.nextSibling);

        createChart(data[index]);
    });
});

function createChart(item) {

    if (chart) {
        chart.destroy();
    }
    chart = Highcharts.chart('chart-container', {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Текущий день', 'Вчера', 'Этот день недели'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Значение'
            }
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                colorByPoint: true,
                colors: ['#7cb5ec', '#f7a35c', '#90ee7e']
            }
        },
        series: [{
            name: item.category,
            data: [item.today, item.yesterday, item.weekDay],
            showInLegend: false
        }],
        credits: {
            enabled: false
        }
    });
}
