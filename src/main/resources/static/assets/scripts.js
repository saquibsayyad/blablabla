var allTweets = [];
var positiveTweets = [];
var negativeTweets = [];
var affiliates = [];
var affiliateTweets = [];
var affilatePositiveTweets = [];
var affilateNegativeTweets = [];

function loadAffiliates(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var json = JSON.parse(this.responseText);
      var account = json._embedded.socialAccounts;
      if (account) {
        account.forEach(function (value) {
          affiliates.push(value.affiliate);
          affiliateTweets.push(0);
          affilatePositiveTweets.push(0);
          affilateNegativeTweets.push(0);
        });
      }
    }
  }
  xhttp.open("GET", "../socialAccounts?size=1000", true);
  xhttp.send();
}

function loadData(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if (json) {
        json.forEach(function (value) {
          allTweets.push({
            'x': value.tweetTime,
            'y': Math.round(value.score * 100) / 100,
            'affiliate': value.affiliate,
            'tweet': value.tweet
          })
        });
        prepareData();
        loadDashboard();
        loadRecentTweets();
      }
    }
  };

  xhttp.open("GET", "../blablabla/tweets?size=1000", true);
  xhttp.send();
}


function prepareData(){
  allTweets.forEach(function (tweet) {
    if(tweet.y >= 0.0){
      positiveTweets.push(tweet);
      affilatePositiveTweets[affiliates.indexOf(tweet.affiliate)]++;
    }else{
      negativeTweets.push(tweet);
      affilateNegativeTweets[affiliates.indexOf(tweet.affiliate)]++;
    }
    affiliateTweets[affiliates.indexOf(tweet.affiliate)]++;
  });
}


function loadRecentTweets(){
  var doc = $("#recentTweets");
  var recentTweets = allTweets.slice(Math.max(allTweets.length - 3, 1)).reverse();

  recentTweets.forEach(function(tweet){
    doc.append('<div class="tweet">' +
        tweet.tweet +
        '</div>');
  });


}

function loadDashboard(){
  Apex.grid = {
    padding: {
      right: 0,
      left: 0
    }
  }

  Apex.dataLabels = {
    enabled: false
  }

  var randomizeArray = function (arg) {
    var array = arg.slice();
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

// data for the sparklines that appear below header area
  var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

// the default colorPalette for this dashboard
//var colorPalette = ['#01BFD6', '#5564BE', '#F7A600', '#EDCD24', '#F74F58'];
  var colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']

  var spark1 = {
    chart: {
      id: 'sparkline1',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 1,
    },
    series: [{
      name: 'Score',
      data: allTweets
    }],
    labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
  yaxis: {
    min: -1,
    max: 1
  },
  xaxis: {
    type: 'datetime',
  },
  colors: ['#007bff'],
      title: {
    text: allTweets.length,
        offsetX: 30,
        style: {
      fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
    }
  },
  subtitle: {
    text: 'Total Tweets',
        offsetX: 30,
        style: {
      fontSize: '20px',
          cssClass: 'apexcharts-yaxis-title',
          color: '#007bff'
    }
  }
}

  var spark2 = {
    chart: {
      id: 'sparkline2',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 1,
    },
    series: [{
      name: 'Positive Tweets',
      data: positiveTweets
    }],
    labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
  yaxis: {
    min: -1,
    max: 1
  },
  xaxis: {
    type: 'datetime',
  },
  colors: ['#20c997'],
      title: {
    text: positiveTweets.length,
        offsetX: 30,
        style: {
      fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
    }
  },
  subtitle: {
    text: 'Positive Tweets',
        offsetX: 30,
        style: {
          fontSize: '20px',
          cssClass: 'apexcharts-yaxis-title',
          color: '#20c997'
    }
  }
}

  var spark3 = {
    chart: {
      id: 'sparkline3',
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 1,
    },
    series: [{
      name: 'Negative Tweets',
      data: negativeTweets
    }],
    labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: -1,
    max: 1
  },
  colors: ['#dc3545'],
      //colors: ['#5564BE'],
      title: {
    text: negativeTweets.length,
        offsetX: 30,
        style: {
      fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
    }
  },
  subtitle: {
    text: 'Negative Tweets',
        offsetX: 30,
        style: {
      fontSize: '20px',
          cssClass: 'apexcharts-yaxis-title',
          color: '#dc3545'
    }
  }
}

  var monthlyEarningsOpt = {
    chart: {
      type: 'area',
      height: 260,
      background: '#eff4f7',
      sparkline: {
        enabled: true
      },
      offsetY: 20
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    series: [{
      data: randomizeArray(sparklineData)
    }],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    yaxis: {
      min: 0,
      max: 130
    },
    colors: ['#dce6ec'],

    title: {
      text: 'Total Earned',
      offsetX: -30,
      offsetY: 100,
      align: 'right',
      style: {
        color: '#7c939f',
        fontSize: '16px',
        cssClass: 'apexcharts-yaxis-title'
      }
    },
    subtitle: {
      text: '$135,965',
      offsetX: -30,
      offsetY: 100,
      align: 'right',
      style: {
        color: '#7c939f',
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title'
      }
    }
  }


  new ApexCharts(document.querySelector("#spark1"), spark1).render();
  new ApexCharts(document.querySelector("#spark2"), spark2).render();
  new ApexCharts(document.querySelector("#spark3"), spark3).render();



  var allTweetOptions = {
    chart: {
      height: 350,
      type: 'area',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: true
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    series: [{
      data: allTweets
    }],
    title: {
      text: 'Twitter Sentiments for All Affiliates',
      align: 'left'
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
      // range: XAXISRANGE,
    },
    yaxis: {
      max: 1,
      min: -1
    },
    legend: {
      show: true
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        return '' +
            '<span>' + allTweets[dataPointIndex].tweet + '</span>' +
            ''
      }
    }
  };


  new ApexCharts(document.querySelector("#allTweets"), allTweetOptions).render();


  // var monthlyEarningsChart = new ApexCharts(document.querySelector("#monthly-earnings-chart"), monthlyEarningsOpt);


  // var optionsArea = {
  //   chart: {
  //     height: 340,
  //     type: 'area',
  //     zoom: {
  //       enabled: false
  //     },
  //   },
  //   stroke: {
  //     curve: 'straight'
  //   },
  //   colors: colorPalette,
  //   series: [
  //     {
  //       name: "Blog",
  //       data: [{
  //         x: 0,
  //         y: 0
  //       }, {
  //         x: 4,
  //         y: 5
  //       }, {
  //         x: 5,
  //         y: 3
  //       }, {
  //         x: 9,
  //         y: 8
  //       }, {
  //         x: 14,
  //         y: 4
  //       }, {
  //         x: 18,
  //         y: 5
  //       }, {
  //         x: 25,
  //         y: 0
  //       }]
  //     },
  //     {
  //       name: "Social Media",
  //       data: [{
  //         x: 0,
  //         y: 0
  //       }, {
  //         x: 4,
  //         y: 6
  //       }, {
  //         x: 5,
  //         y: 4
  //       }, {
  //         x: 14,
  //         y: 8
  //       }, {
  //         x: 18,
  //         y: 5.5
  //       }, {
  //         x: 21,
  //         y: 6
  //       }, {
  //         x: 25,
  //         y: 0
  //       }]
  //     },
  //     {
  //       name: "External",
  //       data: [{
  //         x: 0,
  //         y: 0
  //       }, {
  //         x: 2,
  //         y: 5
  //       }, {
  //         x: 5,
  //         y: 4
  //       }, {
  //         x: 10,
  //         y: 11
  //       }, {
  //         x: 14,
  //         y: 4
  //       }, {
  //         x: 18,
  //         y: 8
  //       }, {
  //         x: 25,
  //         y: 0
  //       }]
  //     }
  //   ],
  //   fill: {
  //     opacity: 1,
  //   },
  //   title: {
  //     text: 'Daily Visits Insights',
  //     align: 'left',
  //     style: {
  //       fontSize: '18px'
  //     }
  //   },
  //   markers: {
  //     size: 0,
  //     style: 'hollow',
  //     hover: {
  //       opacity: 5,
  //     }
  //   },
  //   tooltip: {
  //     intersect: true,
  //     shared: false,
  //   },
  //   xaxis: {
  //     tooltip: {
  //       enabled: false
  //     },
  //     labels: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     }
  //   },
  //   yaxis: {
  //     tickAmount: 4,
  //     max: 12,
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     },
  //     labels: {
  //       style: {
  //         color: '#78909c'
  //       }
  //     }
  //   },
  //   legend: {
  //     show: false
  //   }
  // }
  //
  // var chartArea = new ApexCharts(document.querySelector('#area'), optionsArea);
  // chartArea.render();

  // var optionsBar = {
  //   chart: {
  //     type: 'bar',
  //     height: 380,
  //     width: '100%',
  //     stacked: true,
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '45%',
  //     }
  //   },
  //   colors: colorPalette,
  //   series: [{
  //     name: "Tweets",
  //     data: affiliateTweets,
  //   }],
  //   labels: affiliates,
  //   xaxis: {
  //     labels: {
  //       show: true
  //     },
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     },
  //   },
  //   yaxis: {
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     },
  //     labels: {
  //       style: {
  //         color: '#78909c'
  //       }
  //     }
  //   },
  //   title: {
  //     text: 'Monthly Sales',
  //     align: 'left',
  //     style: {
  //       fontSize: '18px'
  //     }
  //   }
  //
  // }

  var optionsBar = {
    chart: {
      height: 350,
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },

    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    colors:['#007bff', '#dc3545'],
    series: [{
      name: 'Positive Tweets',
      data: affilatePositiveTweets
    },{
      name: 'Negative Tweets',
      data: affilateNegativeTweets
    }],
    title: {
      text: 'Tweets per Affiliate'
    },
    xaxis: {
      categories: affiliates,
      labels: {
        formatter: function(val) {
          return val + "K"
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      },

    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val;
        }
      }
    },
    fill: {
      opacity: 1

    },

    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
  chartBar.render();


  var optionDonut = {
    chart: {
      type: 'donut',
      width: '100%'
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
        offsetY: 20,
      },
      stroke: {
        colors: undefined
      }
    },
    colors: colorPalette,
    title: {
      text: 'Tweets distribution over affiliates',
      style: {
        fontSize: '18px'
      }
    },
    series: affiliateTweets,
    labels: affiliates,
    legend: {
      position: 'left',
      offsetY: 80
    }
  }

  var donut = new ApexCharts(
      document.querySelector("#donut"),
      optionDonut
  )
  donut.render();


  function trigoSeries(cnt, strength) {
    var data = [];
    for (var i = 0; i < cnt; i++) {
      data.push((Math.sin(i / strength) * (i / strength) + i / strength+1) * (strength*2));
    }

    return data;
  }



//   var optionsLine = {
//     chart: {
//       height: 340,
//       type: 'line',
//       zoom: {
//         enabled: false
//       }
//     },
//     plotOptions: {
//       stroke: {
//         width: 4,
//         curve: 'smooth'
//       },
//     },
//     colors: colorPalette,
//     series: [
//       {
//         name: "Day Time",
//         data: trigoSeries(52, 20)
//       },
//       {
//         name: "Night Time",
//         data: trigoSeries(52, 27)
//       },
//     ],
//     title: {
//       floating: false,
//       text: 'Customers',
//       align: 'left',
//       style: {
//         fontSize: '18px'
//       }
//     },
//     subtitle: {
//       text: '168,215',
//       align: 'center',
//       margin: 30,
//       offsetY: 40,
//       style: {
//         color: '#222',
//         fontSize: '24px',
//       }
//     },
//     markers: {
//       size: 0
//     },
//
//     grid: {
//
//     },
//     xaxis: {
//       labels: {
//         show: false
//       },
//       axisTicks: {
//         show: false
//       },
//       tooltip: {
//         enabled: false
//       }
//     },
//     yaxis: {
//       tickAmount: 2,
//       labels: {
//         show: false
//       },
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false
//       },
//       min: 0,
//     },
//     legend: {
//       position: 'top',
//       horizontalAlign: 'left',
//       offsetY: -20,
//       offsetX: -30
//     }
//
//   }
//
//   var chartLine = new ApexCharts(document.querySelector('#line'), optionsLine);
//
// // a small hack to extend height in website sample dashboard
//   chartLine.render().then(function () {
//     var ifr = document.querySelector("#wrapper");
//     if (ifr.contentDocument) {
//       ifr.style.height = ifr.contentDocument.body.scrollHeight + 20 + 'px';
//     }
//   });


// on smaller screen, change the legends position for donut
  var mobileDonut = function() {
    if($(window).width() < 768) {
      donut.updateOptions({
        plotOptions: {
          pie: {
            offsetY: -15,
          }
        },
        legend: {
          position: 'bottom'
        }
      }, false, false)
    }
    else {
      donut.updateOptions({
        plotOptions: {
          pie: {
            offsetY: 20,
          }
        },
        legend: {
          position: 'left'
        }
      }, false, false)
    }
  }

  $(window).resize(function() {
    mobileDonut()
  })
}