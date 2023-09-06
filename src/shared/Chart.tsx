import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

export default function Chart() {
  const range = (start: number, end: number) => {
    const result: number[] = [];
    for (let i: any = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const xAxisFormatter = (value: number) => {
    let valSum = value + value;
    return valSum.toString().padStart(2, '0');
  };
  const yAxisFormatter = (num: any, digits: number) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0';
  };
  const state = {
    options: {
      yaxis: {
        labels: {
          formatter: function (val: any) {
            return yAxisFormatter(val, 1);
          },
          style: { colors: '#ABB6CC', fontSize: '12px', fontWeight: 500 }
        }
      },
      chart: {
        id: 'apexchart-example',
        toolbar: { show: false }
      },
      stroke: { curve: 'smooth', width: 4 },
      colors: ['#5600D6', '#01D5FF'],

      grid: { borderColor: '#eee', strokeDashArray: 8 },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetX: 0,
        offsetY: -40,
        markers: {
          radius: 4
        }
      },
      title: {
        text: 'Overview',
        align: 'left',
        offsetX: 0
      },
      xaxis: {
        categories: range(0, 16),
        labels: {
          formatter: function (val: any) {
            return xAxisFormatter(val);
          },
          style: { colors: '#ABB6CC', fontSize: '12px', fontWeight: 500 }
        }
      }
    },
    series: [
      {
        name: 'Budget Change',
        data: [
          800, 1300, 300, 1200, 800, 1600, 500, 1200, 600, 1400, 200, 1200, 100,
          1600, 400, 1000
        ]
      },
      {
        name: 'Starting Capacity',
        data: [
          400, 200, 1300, 300, 1500, 400, 1600, 100, 1000, 200, 1800, 300, 1300,
          300, 1200, 100
        ]
      }
    ]
  };
  return (
    <div className='chartWrapper'>
      <Card style={{ height: '330px' }}>
        <Card.Body>
          <div id='chart'>
            <ReactApexChart
              height={300}
              type={'line'}
              // @ts-ignore
              options={state.options}
              series={state.series}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
