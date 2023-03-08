// get the data from the specified location
let data_source =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  ;

// add IDs to "selDataset" amd initialise the page with data from the first ID
function init() {
  d3.json(data_source).then((d) => {
    // retrieve all data for the dropdown
    let ids = d.names;
    console.log(ids);

    // select the dropdown selector in the html and append with the ids
    let dropdown = d3.select("#selDataset");
    ids.map((x) => {
      dropdown.append("option").text(x).property("value", x);
    });

    // use the first ID to generate the graphs through the respective functions
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
    let demographicData = d.metadata.filter((d) => d.id == activesample);

    // clear the demo box otherwise append will append onChange
    d3.select("#sample-metadata").html("");

    Object.entries(demographicData[0]).map(([k, v]) => {
      d3.select("#sample-metadata").append("ul").text(`${k}: ${v}`);
    });
  });
}

//create the barchart
function createbarchart(activesample) {
  d3.json(data_source).then((d) => {
    let barchartData = d.samples.filter((d) => d.id == activesample);
    console.log("barchartData", barchartData);

    let barChart = [
      {
        y: barchartData[0].otu_ids.slice(0, 10).map((id) => `OTU ${id}`).reverse(),
        x: barchartData[0].sample_values.slice(0, 10).reverse(),
        text: barchartData[0].otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];

    let layout = {
      title: "Top 10 microbial species detected",
      xaxis: { title: "Quantity Detected" },
      yaxis: { title: "Microbial Species" },
    };

    Plotly.newPlot("bar", barChart, layout);
  });
}

//create the bubblechart
function createbubblechart(activesample) {
  d3.json(data_source).then((d) => {
    let bubbleChartData = d.samples.filter((d) => d.id == activesample);

    let bubbleChart = [
      {
        y: bubbleChartData[0].sample_values,
        x: bubbleChartData[0].otu_ids,
        type: "bubble",
        mode: "markers",
        text: bubbleChartData[0].otu_labels,
        marker: {
          size: bubbleChartData[0].sample_values,
          color: bubbleChartData[0].otu_ids,
          colorscale: "Earth",
        },
      },
    ];

    let layout = {
      title: "Microbial species detected",
      yaxis: { title: "Quantity Detected" },
      xaxis: { title: "Microbial Species ID" },
    };

    Plotly.newPlot("bubble", bubbleChart, layout);
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
