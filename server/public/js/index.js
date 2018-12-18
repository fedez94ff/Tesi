window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  axios.get('/api/dates').then(res => {
    const {dates} = res.data;
    const septemberDates = dates
      .map(d => moment(d, 'DD/MMM/YYYY:HH:mm:ss Z').format('YYYY-MM-DD'))
      .filter(f => moment(f).isBetween('2018-09-01', '2018-09-30'));

    const accessCount = new Array(20).fill(5);
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: septemberDates,
        datasets: [{data: accessCount}]
      }
    });
  });
});
