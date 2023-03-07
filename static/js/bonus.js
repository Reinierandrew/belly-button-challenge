function creategauge(activesample) {
    d3.json(data_source).then((d) => {
      let gaugedata = d.metadata.filter((x) => x.id == activesample);
     
      let gauge = [
        {domain: { x: [0, 1], y: [0, 1] },
          value: gaugedata[0].wfreq,
          title: {text: "Belly Button Washing Frequency <br><sub>Scrubs per Week</sub> ",font: { size: 18 },},
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 10], dtick: 1 },
            bar: { color: "red" },
            steps: [
              { range: [0, 1], color: "#d3f2db" },
              { range: [1, 2], color: "#9cf0b2" },
              { range: [2, 3], color: "#6ef091" },
              { range: [3, 4], color: "#27d956" },
              { range: [4, 5], color: "#32c259" },
              { range: [5, 6], color: "#39b359" },
              { range: [6, 7], color: "#3fa159" },
              { range: [7, 8], color: "#439158" },
              { range: [8, 9], color: "#488558" },
              { range: [9, 10], color: "#466e51" },
            ],
          },
        },
      ];
  
      layout = {
        width: 500,
        height: 500,
        margin: { t: 25, b: 25, l: 25, r: 25 },
      };
  
      Plotly.newPlot("gauge", gauge, layout);
    });
  }