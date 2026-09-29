const datasets = {
    yearly: {
        categories: ['2016','2017','2018','2019','2020','2021','2022','2023'],
        values:     [8000, 10000, 30000, 55000, 8000, 14000, 55000, 100000]
    },
    monthly: {
        categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        values:     [4000, 6000, 8000, 12000, 18000, 25000, 30000, 34000, 38000, 42000, 46000, 50000]
    },
    all: {
        categories: ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
        values:     [8000, 10000, 20000, 35000, 28000, 45000, 62000, 78000, 90000, 110000]
    }
};

const baseOptions = {
    chart: {
        type: 'area',
        height: 250,
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit'
    },
    stroke: {
        curve: 'straight',
        width: 2,
        dashArray: 6,
        colors: ['#25CD25']
    },
    fill: {
        type: 'gradient',
        gradient: {
            gradientToColors: ['#25CD25', '#25CD25'],
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 1000]
        }
    },
    colors: ['#25CD25'],
    markers: { size: 0, hover: { size: 5 } },
    dataLabels: { enabled: false },
    tooltip: {
        enabled: true,
        shared: false,
        intersect: false,
        x: { show: true },
        y: { formatter: (v) => v.toLocaleString('en-US') },
        marker: { show: false },
        theme: 'light',
        style: { fontSize: '13px' }
    },
    grid: {
        borderColor: '#F1F1F1',
        strokeDashArray: 0,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
    },
    xaxis: {
        labels: { style: { colors: '#8b8b8b', fontSize: '14px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false }
    },
    yaxis: {
        min: 0,
        max: 100000,
        tickAmount: 4,
        labels: {
            formatter: function (value) {
                if (value === 0) return '0';
                if (value === 25000) return '10k';
                if (value === 50000) return '20k';
                if (value === 75000) return '50k';
                if (value === 100000) return '100k';
                return value;
            },
            style: { colors: '#8b8b8b', fontSize: '14px' }
        }
    }
};

const chartEl = document.querySelector('#growthChart');
const chart = new ApexCharts(chartEl, {
    ...baseOptions,
    series: [{ name: 'Growth', data: datasets.yearly.values }],
    xaxis: { ...baseOptions.xaxis, categories: datasets.yearly.categories }
});
chart.render();

function updateChart(period) {
    const ds = datasets[period];
    if (!ds) return;

    chart.updateOptions({
        series: [{ name: 'Growth', data: ds.values }],
        xaxis: { ...baseOptions.xaxis, categories: ds.categories }
    }, false, true);
}

document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.widget-dropdown-button');
    if (trigger) {
        e.stopPropagation();

        const dropdown = trigger.closest('.widget-dropdown-wrap');

        document.querySelectorAll('.widget-dropdown-wrap.is-active').forEach((el) => {
            if (el !== dropdown) el.classList.remove('is-active');
        });

        dropdown.classList.toggle('is-active');
        return;
    }

    const option = e.target.closest('.widget-dropdown li button');
    if (option) {
        const dropdown = option.closest('.widget-dropdown-wrap');
        const button = dropdown.querySelector('.widget-dropdown-button');
        const span = button.querySelector('span');

        const label = option.textContent.trim();
        const value = option.dataset.value;

        if (span) span.textContent = label;
        button.dataset.value = value;

        dropdown.classList.remove('is-active');

        if (dropdown.id === 'chart-period') {
            updateChart(value);
        }
        return;
    }

    document.querySelectorAll('.widget-dropdown-wrap.is-active').forEach((el) => {
        el.classList.remove('is-active');
    });
});
