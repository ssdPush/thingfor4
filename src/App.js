import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {wordFrequency:[]};
  }
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  getWordFrequency = (text) => {
    const stopWords = new Set(["the", "and", "a", "an", "in", "on", "at", "for", "with", "about", "as", "by", "to", "of", "from", "that", "which", "who", "whom", "this", "these", "those", "it", "its", "they", "their", "them", "we", "our", "ours", "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "it", "its", "we", "us", "our", "ours", "they", "them", "theirs", "I", "me", "my", "myself", "you", "your", "yourself", "yourselves", "was", "were", "is", "am", "are", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "as", "if", "each", "how", "which", "who", "whom", "what", "this", "these", "those", "that", "with", "without", "through", "over", "under", "above", "below", "between", "among", "during", "before", "after", "until", "while", "of", "for", "on", "off", "out", "in", "into", "by", "about", "against", "with", "amongst", "throughout", "despite", "towards", "upon", "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't", "doesn't", "didn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "mustn't", "needn't", "daren't", "hasn't", "haven't", "hadn't"]);
    const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=_`~()]/g, "").replace(/\s{2,}/g, " ").split(" ");
    const filteredWords = words.filter(word => !stopWords.has(word));
    return Object.entries(filteredWords.reduce((freq, word) => {
      freq[word] = (freq[word] || 0) + 1;
      return freq;
    }, {}));
  }


  renderChart() {
    const data = this.state.wordFrequency.sort((a,b)=>b[1]-a[1]).slice(0,5)
    console.log(data)
    console.log("hello1")
    console.log(typeof data[0])



    /*
    if (typeof data[0] !== "undefined")
      {
        arr1 = data[0]
        console.log(arr1[0])
        arr2 = data[1]
        console.log(arr2[0])
        arr3 = data[2]
        console.log(arr3[0])
        arr4 = data[3]
        console.log(arr4[0])
        arr5 = data[4]
        console.log(arr5[0])

      }
    
      */
      // arr#[0] is the #st word. arr1 is first word

      // each wordcloud word (there will be five) is spaced out evenly and midway
      // down the svg parent box.
      // down 150px

      //try d3

      d3.select(".svg_parent")
        .append("text")
        .attr("x", 30)
        .attr("y", 150)
        .style("font-size", "0px")

      if (typeof data[0] !== "undefined")
      {
        var selection=d3.selectAll('text')
        selection.remove();


        d3.select(".svg_parent").selectAll("text")
          .data(data, (d,i) => i)
          .join(
            enter => enter.append("text")
            .attr("x", function(d,i) {
              return (10 + i*200);
            })
            .attr("y", 150)
            .text(d => d[0]),
            update => update.filter(function(d){ 
              return d3.select(".svg_parent").text() === (d => d[0])
            }).attr("x", function(d,i) {
              return (10 + i*200);
            })

            
          )
          .transition().duration(1200)
          .attr("font-size", function(d,i) {
            return (d[1] * 8);
          })
        /*
        
        
        d3.select(".svg_parent")
        .append("text")
        .attr("x", 30)
        .attr("y", 150)
        .text(arr1[1])
        .transition().duration(1200)
        .attr('font-size', arr1[1]*10);

        d3.select(".svg_parent")
        .append("text")
        .attr("x", 200)
        .attr("y", 150)
        .text(arr2[1])
        .transition().duration(1200)
        .attr('font-size', arr2[1]*10);

        d3.select(".svg_parent")
        .append("text")
        .attr("x", 400)
        .attr("y", 150)
        .text(arr3[1]);

        d3.select(".svg_parent")
        .append("text")
        .attr("x", 600)
        .attr("y", 150)
        .text(arr4[1]);

        d3.select(".svg_parent")
        .append("text")
        .attr("x", 750)
        .attr("y", 150)
        .text(arr5[1]);


        d3.selectAll("text")
        .filter(function(){ 
          return d3.select(this).text() == 8
        })
        .attr("fill", "red");

        */
        

      }
      

    
  }

  render() {
    return (
      <div className="parent">

        <div className="child1" style={{width: 1000 }}>

        <textarea type="text" id="input_field" style={{ height: 150, width: 1000 }}/>

          <button type="submit" value="Generate Matrix" style={{ marginTop: 10, height: 40, width: 1000 }} onClick={() => {
                var input_data = document.getElementById("input_field").value
                this.setState({wordFrequency:this.getWordFrequency(input_data)})
              }}
            > Generate WordCloud</button>
        </div>

        <div className="child2"><svg width="1000" height="300" className="svg_parent"></svg></div>

      </div>
    );
  }
}

export default App;
