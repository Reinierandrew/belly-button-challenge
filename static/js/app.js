// get the data from the specified location
let data_source =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// add IDs to "selDataset" amd initialise the page with data from the first ID
function init() {
  d3.json(data_source).then((d) => {
    // retrieve all data for the dropdown
    let ids = d.names;
    console.log(ids);

    // select the dropdown selector in the html and append with the ids
    let dropdown = d3.select("#selDataset");
    ids.map((x) => {
      dropdown
        .append("option")
        .text(x)
        .property("value", x);
    });

    // use the first ID to genrate the graphs through the respective functions
    let init_sample = ids[0];
    populateDemographicsBox(init_sample);
    createbarchart(init_sample);
    createbubblechart(init_sample);
    creategauge(init_sample);
  });
}

// Populate the Demographics Box
function populateDemographicsBox(activesample) {
  d3.json(data_source).then((d) => {
    let demographicData = d.metadata;
    let demographicbox = d3.select("#sample-metadata");

    // clear the demo box otehrwise append will just make the box bigger
    demographicbox.html("");

    // Filter for the active sample
    let demographicFilter = demographicData.filter((d) => d.id == activesample);

    // retrieve the data for the active sample
    let demographicFillData = demographicFilter[0];
    console.log("demographicFillData", demographicFillData);

    Object.entries(demographicFillData).map(([k, v]) => {
      d3.select("#sample-metadata").append("ul").text(`${k}: ${v}`);
    });
  });
}

function createbarchart(activesample) {
  d3.json(data_source).then((d) => {
    let barchartData = d.samples.filter((d) => d.id == activesample);;

    // // // Filter for the active sample
    // // let barchartFilter = barchartData.filter((d) => d.id == activesample);

    // // // retrieve the data for the active sample
    // // let barchartResultData = barchartFilter[0];

    // console.log("barchartResultData", barchartResultData);

    // retrieve the data for the chart
    let y = barchartData[0].otu_ids
      .slice(0, 10)
      .map((id) => `OTU ${id}`)
      .reverse();

    let text = barchartData[0].otu_labels
      .slice(0, 10)
      .reverse();

    let x = barchartData[0].sample_values
      .slice(0, 10)
      .reverse();

    // // set the top 10 items to display
    // let y = otu_ids
    //   .slice(0, 10)
    //   .map((id) => `OTU ${id}`)
    //   .reverse();
    // let x = sample_values.slice(0, 10).reverse();
    // let text = otu_labels.slice(0, 10).reverse();

    // create the bar chart and reverse to get the highest value first
    let barChart = [
      {
        y: y,
        x: x,
        text: text,
        type: "bar",
        orientation: "h",
      },
    ];

    // layout
    let layout = {
      title: "Top 10 microbial species detected",
      xaxis: {
        title: "Quantity Detected",
      },
      yaxis: {
        title: "Microbial Species",
      },
    };

    // plot the chart
    Plotly.newPlot("bar", barChart, layout);
  });
}

function createbubblechart(activesample) {
  // use d3.json in order to get all of the data
  d3.json(data_source).then((d) => {
    let bubbleChartData = d.samples.
      filter((d) => d.id == activesample
      );
    // let bubbleChartFilter = bubbleChartData.filter(
    //   (d) => d.id == activesample
    // );
    // let bubbleChartResultData = bubbleChartFilter[0];
    // console.log("bubbleChartDataxxxx",bubbleChartData[0]);

    let otu_ids = bubbleChartData[0].otu_ids;
    let sample_values = bubbleChartData[0].sample_values;
    let text = bubbleChartData[0].otu_labels;
    console.log("otu_ids", otu_ids);

    let bubbleChart = [
      { y: sample_values,
        x: otu_ids,
        type: "bubble",
        mode: "markers",
        text: text,
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth",
        },
      },
    ];

    Plotly.newPlot("bubble", bubbleChart);
  });
}

function creategauge(activesample) {
  d3.json(data_source).then((d) => {
    let gaugedata = d.metadata;
    let guageFilter = gaugedata.filter((x) => x.id == activesample);
    let gaugeResultData = guageFilter[0];
    let wfreq = gaugeResultData.wfreq;
    console.log("gauge", wfreq);

    let gauge = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: {
          text: "Belly Button Washing Frequency <br><sub>Scrubs per Week</sub> ",
          font: { size: 18 },
        },
        type: "indicator",
        mode: "gauge+number",
        // colorscale: 'Greens',
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
      margin: { t: 0, b: 0 },
      margin: { t: 25, b: 25, l: 48, r: 48 },
    };

    Plotly.newPlot("gauge", gauge, layout);
  });
}

// optionChanged function as per line 25 index.html (<select id="selDataset" onchange="optionChanged(this.value)"></select>)
function optionChanged(activesample) {
  populateDemographicsBox(activesample);
  createbarchart(activesample);
  createbubblechart(activesample);
  creategauge(activesample);
}

// // call the initialise function
init();
