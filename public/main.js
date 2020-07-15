var ctx = $('#lineChart');

var data = (document.getElementById("marks").innerHTML).split(",");

var myChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
    labels: [
      'Verbal-Linguistic',
      'Logical-Mathematical',
      'Visual-Spatial',
      'Musical',
      'Bodily-Kinesthetic',
      'Interpersonal',
      'Intrapersonal',
      'Naturalist'
    ],

    datasets: [
      {
        label: 'Score',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }
    ],
    showLine: true
  },

  options: {
    responsive: true,
    responsiveAnimationDuration: 1000,
    maintainAspectRatio: false,
    legend: {
      display: false,
      labels: {
          fontColor: 'rgb(255, 99, 132)'
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

var saveBtn = $("#save-btn");
saveBtn.click(function() {
  ctx.get(0).toBlob(function(blob) {
    saveAs(blob, "cpt_report.png");
  });
});
