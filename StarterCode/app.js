function getPlot(id) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);
  
        var samplevalues = samples.sample_values.slice(0, 10).reverse()
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d)
        var labels = samples.otu_labels.slice(0, 10);
  
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'rgb'},
            type:"bar",
            orientation: "h",
        };

        var data = [trace];
        var layout = {
            title: "Top 10 Bacteria Cultures Found",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        Plotly.newPlot("bar", data, layout);
  
      
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: "Earth",
            },
            text: samples.otu_labels
  
        };
        var layout_b = {
            title: "Bacteria Cultures Per Sample",
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_b); 

        var layout_g = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
      });
  }  
function getInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}
function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();
