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

    // use the first ID to call the optionChanged() function
    let init_sample = ids[0];
    optionChanged(init_sample);
  
  });
}


//create the barchart
function createbarchart(y, x, text) {
  
    let barChart = [
      {
        y: y,
        x: x,
        text: text,
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
  
}

//create the bubblechart
function createbubblechart(y_bubble,x_bubble, text_bubble) {
  

    let bubbleChart = [
      {
        y: y_bubble,
        x: x_bubble,
        type: "bubble",
        mode: "markers",
        text: text_bubble,
        marker: {
          size: y_bubble,
          color: x_bubble,
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

}

// optionChanged function as per line 25 index.html (<select id="selDataset" onchange="optionChanged(this.value)"></select>)
function optionChanged(activesample) {
  
  d3.json(data_source).then((d) => {

    //fill the demographic info
    let demographicData = d.metadata.filter((d) => d.id == activesample);
    // empty box so appemd does not just append
    d3.select("#sample-metadata").html("");
    //assign keys and values to a list within the box
    Object.entries(demographicData[0]).map(([k, v]) => {
      d3.select("#sample-metadata").append("h6").text(`${k}: ${v}`)
    });

    // create the barchart variables to read into the barchart function
    let barchartData = d.samples.filter((d) => d.id == activesample);
    let y = barchartData[0].otu_ids.slice(0, 10).map((id) => `OTU ${id}`).reverse();
    let x = barchartData[0].sample_values.slice(0, 10).reverse();
    let text = barchartData[0].otu_labels.slice(0, 10).reverse();

    // create the bubblechart variables to read into the bubblechart function
    let bubbleChartData = d.samples.filter((d) => d.id == activesample);
    let y_bubble = bubbleChartData[0].sample_values;
    let x_bubble =bubbleChartData[0].otu_ids;
    let text_bubble = bubbleChartData[0].otu_labels;

     // populateDemographicsBox(activesample);
  createbarchart(y, x, text);
  createbubblechart(y_bubble,x_bubble, text_bubble);
  creategauge(activesample);


  });
 
}

// // call the initialise function
init();
