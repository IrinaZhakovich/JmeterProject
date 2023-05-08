/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 14.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en ", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-17", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-16", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-19", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-18", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-13", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": " /api/v1/store/DEFAULT ", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-15", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-2", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-1", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-20", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-22", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-21", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en ", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T01_LaunchApp", "isController": true}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/products/ ", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-24", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-23", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T07_AddToCartButton", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T04_AddToCartButton", "isController": true}, {"data": [[300.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T01_LaunchApp-13", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "S01_T01_LaunchApp-14", "isController": false}, {"data": [[0.0, 2.0], [300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-11", "isController": false}, {"data": [[0.0, 1.0], [300.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-12", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T01_LaunchApp-10", "isController": false}, {"data": [[200.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair", "isController": true}, {"data": [[100.0, 3.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-19", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab", "isController": true}, {"data": [[300.0, 2.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-17", "isController": false}, {"data": [[300.0, 2.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-18", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "S01_T01_LaunchApp-15", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T01_LaunchApp-16", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/category/ ", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T01_LaunchApp-00", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T01_LaunchApp-09", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/content/pages/ ", "isController": false}, {"data": [[300.0, 2.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-06", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-2", "isController": false}, {"data": [[100.0, 2.0], [400.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-07", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-1", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T01_LaunchApp-04", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T01_LaunchApp-05", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-3", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T01_LaunchApp-31", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T01_LaunchApp-32", "isController": false}, {"data": [[0.0, 3.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-30", "isController": false}, {"data": [[2500.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout", "isController": true}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 ", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-06", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-05", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-08", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-0", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-07", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-09", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05", "isController": false}, {"data": [[300.0, 1.0], [100.0, 3.0], [200.0, 3.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-00", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-02", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-01", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-04", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-03", "isController": false}, {"data": [[400.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab", "isController": true}, {"data": [[300.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-24", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T01_LaunchApp-25", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-22", "isController": false}, {"data": [[300.0, 2.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-23", "isController": false}, {"data": [[600.0, 1.0], [100.0, 2.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-20", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14", "isController": false}, {"data": [[200.0, 2.0], [400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-21", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T01_LaunchApp-28", "isController": false}, {"data": [[300.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "S01_T01_LaunchApp-29", "isController": false}, {"data": [[0.0, 2.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-26", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "S01_T01_LaunchApp-27", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable", "isController": true}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-11", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-10", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-13", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-12", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en ", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-15", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": " /actuator/health/ping ", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ ", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 448.0, "series": [{"data": [[0.0, 448.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 12.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 3.2125000000000012, "minX": 1.6833912E12, "maxY": 11.478431372549021, "series": [{"data": [[1.6833912E12, 11.478431372549021]], "isOverall": false, "label": "parallel bzm - Parallel", "isController": false}, {"data": [[1.6833912E12, 3.2125000000000012]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6833912E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 3.0, "minX": -9.0, "maxY": 2562.0, "series": [{"data": [[2.0, 8.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01", "isController": false}, {"data": [[2.0, 8.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01-Aggregated", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03-Aggregated", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04-Aggregated", "isController": false}, {"data": [[1.0, 32.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07", "isController": false}, {"data": [[1.0, 32.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07-Aggregated", "isController": false}, {"data": [[1.0, 14.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06", "isController": false}, {"data": [[1.0, 14.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06-Aggregated", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09-Aggregated", "isController": false}, {"data": [[1.0, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08", "isController": false}, {"data": [[1.0, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08-Aggregated", "isController": false}, {"data": [[2.0, 27.5], [5.0, 27.8]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en ", "isController": false}, {"data": [[4.142857142857143, 27.714285714285715]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en -Aggregated", "isController": false}, {"data": [[2.0, 6.5]], "isOverall": false, "label": "S01_T05_ChairsTab-17", "isController": false}, {"data": [[2.0, 6.5]], "isOverall": false, "label": "S01_T05_ChairsTab-17-Aggregated", "isController": false}, {"data": [[2.0, 39.0]], "isOverall": false, "label": "S01_T05_ChairsTab-16", "isController": false}, {"data": [[2.0, 39.0]], "isOverall": false, "label": "S01_T05_ChairsTab-16-Aggregated", "isController": false}, {"data": [[2.0, 11.0]], "isOverall": false, "label": "S01_T05_ChairsTab-19", "isController": false}, {"data": [[2.0, 11.0]], "isOverall": false, "label": "S01_T05_ChairsTab-19-Aggregated", "isController": false}, {"data": [[2.0, 12.5]], "isOverall": false, "label": "S01_T05_ChairsTab-18", "isController": false}, {"data": [[2.0, 12.5]], "isOverall": false, "label": "S01_T05_ChairsTab-18-Aggregated", "isController": false}, {"data": [[2.0, 27.0]], "isOverall": false, "label": "S01_T05_ChairsTab-13", "isController": false}, {"data": [[2.0, 27.0]], "isOverall": false, "label": "S01_T05_ChairsTab-13-Aggregated", "isController": false}, {"data": [[4.0, 54.0], [2.0, 16.25], [5.0, 20.333333333333332]], "isOverall": false, "label": " /api/v1/store/DEFAULT ", "isController": false}, {"data": [[4.071428571428571, 21.571428571428573]], "isOverall": false, "label": " /api/v1/store/DEFAULT -Aggregated", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "S01_T05_ChairsTab-15", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "S01_T05_ChairsTab-15-Aggregated", "isController": false}, {"data": [[2.0, 34.0]], "isOverall": false, "label": "S01_T05_ChairsTab-14", "isController": false}, {"data": [[2.0, 34.0]], "isOverall": false, "label": "S01_T05_ChairsTab-14-Aggregated", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12", "isController": false}, {"data": [[1.0, 13.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13-Aggregated", "isController": false}, {"data": [[1.0, 16.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16", "isController": false}, {"data": [[1.0, 16.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16-Aggregated", "isController": false}, {"data": [[1.0, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15", "isController": false}, {"data": [[1.0, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17-Aggregated", "isController": false}, {"data": [[2.0, 21.5]], "isOverall": false, "label": "S01_T07_AddToCartButton-2", "isController": false}, {"data": [[2.0, 21.5]], "isOverall": false, "label": "S01_T07_AddToCartButton-2-Aggregated", "isController": false}, {"data": [[2.0, 10.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-3", "isController": false}, {"data": [[2.0, 10.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-3-Aggregated", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19-Aggregated", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0", "isController": false}, {"data": [[2.0, 25.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0-Aggregated", "isController": false}, {"data": [[2.0, 18.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-1", "isController": false}, {"data": [[2.0, 18.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-1-Aggregated", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "S01_T05_ChairsTab-20", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "S01_T05_ChairsTab-20-Aggregated", "isController": false}, {"data": [[2.0, 12.5]], "isOverall": false, "label": "S01_T05_ChairsTab-22", "isController": false}, {"data": [[2.0, 12.5]], "isOverall": false, "label": "S01_T05_ChairsTab-22-Aggregated", "isController": false}, {"data": [[2.0, 30.0]], "isOverall": false, "label": "S01_T05_ChairsTab-21", "isController": false}, {"data": [[2.0, 30.0]], "isOverall": false, "label": "S01_T05_ChairsTab-21-Aggregated", "isController": false}, {"data": [[2.0, 22.5], [5.0, 23.6]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en ", "isController": false}, {"data": [[4.142857142857143, 23.28571428571429]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en -Aggregated", "isController": false}, {"data": [[5.0, 32.0]], "isOverall": false, "label": "S01_T01_LaunchApp", "isController": true}, {"data": [[5.0, 32.0]], "isOverall": false, "label": "S01_T01_LaunchApp-Aggregated", "isController": true}, {"data": [[2.0, 12.5], [5.0, 10.8]], "isOverall": false, "label": " /api/v1/products/ ", "isController": false}, {"data": [[4.142857142857143, 11.285714285714286]], "isOverall": false, "label": " /api/v1/products/ -Aggregated", "isController": false}, {"data": [[2.0, 21.5]], "isOverall": false, "label": "S01_T05_ChairsTab-24", "isController": false}, {"data": [[2.0, 21.5]], "isOverall": false, "label": "S01_T05_ChairsTab-24-Aggregated", "isController": false}, {"data": [[2.0, 31.5]], "isOverall": false, "label": "S01_T05_ChairsTab-23", "isController": false}, {"data": [[2.0, 31.5]], "isOverall": false, "label": "S01_T05_ChairsTab-23-Aggregated", "isController": false}, {"data": [[2.0, 74.5]], "isOverall": false, "label": "S01_T07_AddToCartButton", "isController": true}, {"data": [[2.0, 74.5]], "isOverall": false, "label": "S01_T07_AddToCartButton-Aggregated", "isController": true}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [2.0, 97.0], [5.0, 117.0], [3.0, 128.0]], "isOverall": false, "label": "S01_T04_AddToCartButton", "isController": true}, {"data": [[3.2, 102.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-Aggregated", "isController": true}, {"data": [[2.0, 125.0], [4.0, 357.0], [5.0, 221.0], [3.0, 336.0]], "isOverall": false, "label": "S01_T01_LaunchApp-13", "isController": false}, {"data": [[3.8, 252.0]], "isOverall": false, "label": "S01_T01_LaunchApp-13-Aggregated", "isController": false}, {"data": [[2.0, 118.0], [4.0, 110.0], [5.0, 96.5], [3.0, 118.0]], "isOverall": false, "label": "S01_T01_LaunchApp-14", "isController": false}, {"data": [[3.8, 107.8]], "isOverall": false, "label": "S01_T01_LaunchApp-14-Aggregated", "isController": false}, {"data": [[1.0, 96.0], [4.0, 268.0], [5.0, 276.0]], "isOverall": false, "label": "S01_T01_LaunchApp-11", "isController": false}, {"data": [[4.0, 238.4]], "isOverall": false, "label": "S01_T01_LaunchApp-11-Aggregated", "isController": false}, {"data": [[1.0, 93.0], [5.0, 273.3333333333333], [3.0, 332.0]], "isOverall": false, "label": "S01_T01_LaunchApp-12", "isController": false}, {"data": [[3.8, 249.0]], "isOverall": false, "label": "S01_T01_LaunchApp-12-Aggregated", "isController": false}, {"data": [[2.0, 73.0], [5.0, 243.5], [3.0, 167.5]], "isOverall": false, "label": "S01_T01_LaunchApp-10", "isController": false}, {"data": [[3.6, 179.0]], "isOverall": false, "label": "S01_T01_LaunchApp-10-Aggregated", "isController": false}, {"data": [[2.0, 233.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair", "isController": true}, {"data": [[2.0, 233.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-Aggregated", "isController": true}, {"data": [[5.0, 279.0], [3.0, 181.0]], "isOverall": false, "label": "S01_T01_LaunchApp-19", "isController": false}, {"data": [[4.2, 239.8]], "isOverall": false, "label": "S01_T01_LaunchApp-19-Aggregated", "isController": false}, {"data": [[5.0, 219.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab", "isController": true}, {"data": [[5.0, 219.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab-Aggregated", "isController": true}, {"data": [[4.0, 397.0], [5.0, 231.5], [3.0, 135.0]], "isOverall": false, "label": "S01_T01_LaunchApp-17", "isController": false}, {"data": [[4.2, 278.4]], "isOverall": false, "label": "S01_T01_LaunchApp-17-Aggregated", "isController": false}, {"data": [[-9.0, 334.0], [5.0, 308.3333333333333], [3.0, 177.0]], "isOverall": false, "label": "S01_T01_LaunchApp-18", "isController": false}, {"data": [[1.8, 287.2]], "isOverall": false, "label": "S01_T01_LaunchApp-18-Aggregated", "isController": false}, {"data": [[2.0, 115.5], [4.0, 123.0], [5.0, 134.0], [3.0, 127.0]], "isOverall": false, "label": "S01_T01_LaunchApp-15", "isController": false}, {"data": [[3.2, 123.0]], "isOverall": false, "label": "S01_T01_LaunchApp-15-Aggregated", "isController": false}, {"data": [[1.0, 87.0], [4.0, 128.5], [5.0, 131.0], [3.0, 190.0]], "isOverall": false, "label": "S01_T01_LaunchApp-16", "isController": false}, {"data": [[3.4, 133.0]], "isOverall": false, "label": "S01_T01_LaunchApp-16-Aggregated", "isController": false}, {"data": [[2.0, 6.5], [5.0, 16.8]], "isOverall": false, "label": " /api/v1/category/ ", "isController": false}, {"data": [[4.142857142857143, 13.857142857142858]], "isOverall": false, "label": " /api/v1/category/ -Aggregated", "isController": false}, {"data": [[4.0, 14.0], [1.0, 42.0], [0.0, 11.0], [5.0, 48.0], [3.0, 45.0]], "isOverall": false, "label": "S01_T01_LaunchApp-00", "isController": false}, {"data": [[2.6, 32.0]], "isOverall": false, "label": "S01_T01_LaunchApp-00-Aggregated", "isController": false}, {"data": [[1.0, 76.0], [2.0, 165.0], [4.0, 116.5], [3.0, 77.0]], "isOverall": false, "label": "S01_T01_LaunchApp-09", "isController": false}, {"data": [[2.8, 110.2]], "isOverall": false, "label": "S01_T01_LaunchApp-09-Aggregated", "isController": false}, {"data": [[2.0, 4.5], [5.0, 15.8]], "isOverall": false, "label": " /api/v1/content/pages/ ", "isController": false}, {"data": [[4.142857142857143, 12.571428571428571]], "isOverall": false, "label": " /api/v1/content/pages/ -Aggregated", "isController": false}, {"data": [[1.0, 101.0], [-9.0, 335.0], [5.0, 327.6666666666667]], "isOverall": false, "label": "S01_T01_LaunchApp-06", "isController": false}, {"data": [[1.4, 283.8]], "isOverall": false, "label": "S01_T01_LaunchApp-06-Aggregated", "isController": false}, {"data": [[4.0, 21.5], [5.0, 36.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-2", "isController": false}, {"data": [[4.6, 30.2]], "isOverall": false, "label": "S01_T04_AddToCartButton-2-Aggregated", "isController": false}, {"data": [[-1.0, 102.0], [5.0, 333.25]], "isOverall": false, "label": "S01_T01_LaunchApp-07", "isController": false}, {"data": [[3.8, 287.0]], "isOverall": false, "label": "S01_T01_LaunchApp-07-Aggregated", "isController": false}, {"data": [[4.0, 26.0], [5.0, 18.333333333333332]], "isOverall": false, "label": "S01_T04_AddToCartButton-1", "isController": false}, {"data": [[4.6, 21.4]], "isOverall": false, "label": "S01_T04_AddToCartButton-1-Aggregated", "isController": false}, {"data": [[2.0, 64.0], [4.0, 137.0], [5.0, 74.0], [3.0, 98.0]], "isOverall": false, "label": "S01_T01_LaunchApp-04", "isController": false}, {"data": [[3.4, 94.2]], "isOverall": false, "label": "S01_T01_LaunchApp-04-Aggregated", "isController": false}, {"data": [[2.0, 115.0], [4.0, 94.0], [5.0, 66.0], [3.0, 180.0]], "isOverall": false, "label": "S01_T01_LaunchApp-05", "isController": false}, {"data": [[3.2, 114.0]], "isOverall": false, "label": "S01_T01_LaunchApp-05-Aggregated", "isController": false}, {"data": [[4.0, 8.5], [5.0, 14.333333333333334]], "isOverall": false, "label": "S01_T04_AddToCartButton-3", "isController": false}, {"data": [[4.6, 12.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-3-Aggregated", "isController": false}, {"data": [[2.0, 150.0], [4.0, 74.5], [5.0, 47.0], [3.0, 166.0]], "isOverall": false, "label": "S01_T01_LaunchApp-31", "isController": false}, {"data": [[3.6, 102.4]], "isOverall": false, "label": "S01_T01_LaunchApp-31-Aggregated", "isController": false}, {"data": [[2.0, 147.0], [-9.0, 115.0], [5.0, 90.0], [3.0, 131.5]], "isOverall": false, "label": "S01_T01_LaunchApp-32", "isController": false}, {"data": [[0.8, 123.0]], "isOverall": false, "label": "S01_T01_LaunchApp-32-Aggregated", "isController": false}, {"data": [[4.0, 78.0], [5.0, 196.5], [3.0, 102.0]], "isOverall": false, "label": "S01_T01_LaunchApp-30", "isController": false}, {"data": [[4.0, 135.0]], "isOverall": false, "label": "S01_T01_LaunchApp-30-Aggregated", "isController": false}, {"data": [[1.0, 2562.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout", "isController": true}, {"data": [[1.0, 2562.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-Aggregated", "isController": true}, {"data": [[2.0, 21.0], [5.0, 26.2]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 ", "isController": false}, {"data": [[4.142857142857143, 24.714285714285715]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 -Aggregated", "isController": false}, {"data": [[5.0, 33.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-06", "isController": false}, {"data": [[5.0, 33.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-06-Aggregated", "isController": false}, {"data": [[2.0, 27.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04", "isController": false}, {"data": [[2.0, 27.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04-Aggregated", "isController": false}, {"data": [[5.0, 57.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-05", "isController": false}, {"data": [[5.0, 57.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-05-Aggregated", "isController": false}, {"data": [[2.0, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03", "isController": false}, {"data": [[2.0, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03-Aggregated", "isController": false}, {"data": [[5.0, 94.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-08", "isController": false}, {"data": [[5.0, 94.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-08-Aggregated", "isController": false}, {"data": [[4.0, 61.5], [5.0, 23.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-0", "isController": false}, {"data": [[4.6, 38.4]], "isOverall": false, "label": "S01_T04_AddToCartButton-0-Aggregated", "isController": false}, {"data": [[2.0, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02", "isController": false}, {"data": [[2.0, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02-Aggregated", "isController": false}, {"data": [[5.0, 32.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-07", "isController": false}, {"data": [[5.0, 32.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-07-Aggregated", "isController": false}, {"data": [[2.0, 5.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01", "isController": false}, {"data": [[2.0, 5.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01-Aggregated", "isController": false}, {"data": [[2.0, 8.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08", "isController": false}, {"data": [[2.0, 8.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08-Aggregated", "isController": false}, {"data": [[5.0, 68.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-09", "isController": false}, {"data": [[5.0, 68.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-09-Aggregated", "isController": false}, {"data": [[2.0, 9.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07", "isController": false}, {"data": [[2.0, 9.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07-Aggregated", "isController": false}, {"data": [[2.0, 11.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06", "isController": false}, {"data": [[2.0, 11.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06-Aggregated", "isController": false}, {"data": [[2.0, 29.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05", "isController": false}, {"data": [[2.0, 29.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05-Aggregated", "isController": false}, {"data": [[2.0, 183.5], [5.0, 219.8]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[4.142857142857143, 209.42857142857144]], "isOverall": false, "label": "Transaction Controller-Aggregated", "isController": true}, {"data": [[5.0, 6.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-00", "isController": false}, {"data": [[5.0, 6.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-00-Aggregated", "isController": false}, {"data": [[5.0, 86.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-02", "isController": false}, {"data": [[5.0, 86.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-02-Aggregated", "isController": false}, {"data": [[5.0, 32.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-01", "isController": false}, {"data": [[5.0, 32.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-01-Aggregated", "isController": false}, {"data": [[5.0, 86.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-04", "isController": false}, {"data": [[5.0, 86.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-04-Aggregated", "isController": false}, {"data": [[5.0, 77.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-03", "isController": false}, {"data": [[5.0, 77.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-03-Aggregated", "isController": false}, {"data": [[2.0, 441.0]], "isOverall": false, "label": "S01_T05_ChairsTab", "isController": true}, {"data": [[2.0, 441.0]], "isOverall": false, "label": "S01_T05_ChairsTab-Aggregated", "isController": true}, {"data": [[2.0, 154.0], [5.0, 294.3333333333333], [3.0, 158.0]], "isOverall": false, "label": "S01_T01_LaunchApp-24", "isController": false}, {"data": [[4.0, 239.0]], "isOverall": false, "label": "S01_T01_LaunchApp-24-Aggregated", "isController": false}, {"data": [[2.0, 158.0], [4.0, 91.0], [5.0, 57.0], [3.0, 136.5]], "isOverall": false, "label": "S01_T01_LaunchApp-25", "isController": false}, {"data": [[3.4, 115.8]], "isOverall": false, "label": "S01_T01_LaunchApp-25-Aggregated", "isController": false}, {"data": [[4.0, 235.0], [5.0, 199.0], [3.0, 281.5]], "isOverall": false, "label": "S01_T01_LaunchApp-22", "isController": false}, {"data": [[4.0, 239.2]], "isOverall": false, "label": "S01_T01_LaunchApp-22-Aggregated", "isController": false}, {"data": [[-9.0, 322.0], [5.0, 240.66666666666666], [3.0, 172.0]], "isOverall": false, "label": "S01_T01_LaunchApp-23", "isController": false}, {"data": [[1.8, 243.2]], "isOverall": false, "label": "S01_T01_LaunchApp-23-Aggregated", "isController": false}, {"data": [[5.0, 348.25], [3.0, 171.0]], "isOverall": false, "label": "S01_T01_LaunchApp-20", "isController": false}, {"data": [[4.6, 312.8]], "isOverall": false, "label": "S01_T01_LaunchApp-20-Aggregated", "isController": false}, {"data": [[5.0, 48.4]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14", "isController": false}, {"data": [[5.0, 48.4]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14-Aggregated", "isController": false}, {"data": [[2.0, 209.0], [4.0, 435.0], [5.0, 301.6666666666667]], "isOverall": false, "label": "S01_T01_LaunchApp-21", "isController": false}, {"data": [[4.2, 309.8]], "isOverall": false, "label": "S01_T01_LaunchApp-21-Aggregated", "isController": false}, {"data": [[5.0, 56.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15", "isController": false}, {"data": [[5.0, 56.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15-Aggregated", "isController": false}, {"data": [[4.0, 41.0], [5.0, 71.25]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12", "isController": false}, {"data": [[4.8, 65.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12-Aggregated", "isController": false}, {"data": [[4.0, 36.0], [5.0, 73.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13", "isController": false}, {"data": [[4.8, 65.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13-Aggregated", "isController": false}, {"data": [[2.0, 146.0], [5.0, 129.0], [3.0, 106.5]], "isOverall": false, "label": "S01_T01_LaunchApp-28", "isController": false}, {"data": [[3.6, 123.4]], "isOverall": false, "label": "S01_T01_LaunchApp-28-Aggregated", "isController": false}, {"data": [[2.0, 153.0], [5.0, 219.0], [3.0, 131.0]], "isOverall": false, "label": "S01_T01_LaunchApp-29", "isController": false}, {"data": [[3.6, 170.6]], "isOverall": false, "label": "S01_T01_LaunchApp-29-Aggregated", "isController": false}, {"data": [[4.0, 99.0], [5.0, 148.0], [3.0, 119.5]], "isOverall": false, "label": "S01_T01_LaunchApp-26", "isController": false}, {"data": [[4.0, 126.8]], "isOverall": false, "label": "S01_T01_LaunchApp-26-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [-9.0, 117.0], [5.0, 118.0], [3.0, 156.5]], "isOverall": false, "label": "S01_T01_LaunchApp-27", "isController": false}, {"data": [[1.2, 124.2]], "isOverall": false, "label": "S01_T01_LaunchApp-27-Aggregated", "isController": false}, {"data": [[5.0, 6.8]], "isOverall": false, "label": "S01_T03_ClickOnTable", "isController": true}, {"data": [[5.0, 6.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-Aggregated", "isController": true}, {"data": [[5.0, 41.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-11", "isController": false}, {"data": [[5.0, 41.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-11-Aggregated", "isController": false}, {"data": [[5.0, 70.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-10", "isController": false}, {"data": [[5.0, 70.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-10-Aggregated", "isController": false}, {"data": [[5.0, 48.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-13", "isController": false}, {"data": [[5.0, 48.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-13-Aggregated", "isController": false}, {"data": [[5.0, 46.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-12", "isController": false}, {"data": [[5.0, 46.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-12-Aggregated", "isController": false}, {"data": [[2.0, 32.5], [5.0, 28.6]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en ", "isController": false}, {"data": [[4.142857142857143, 29.714285714285715]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en -Aggregated", "isController": false}, {"data": [[5.0, 51.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-15", "isController": false}, {"data": [[5.0, 51.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-15-Aggregated", "isController": false}, {"data": [[5.0, 88.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-14", "isController": false}, {"data": [[5.0, 88.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-14-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22-Aggregated", "isController": false}, {"data": [[1.0, 1217.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25", "isController": false}, {"data": [[1.0, 1217.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25-Aggregated", "isController": false}, {"data": [[1.0, 629.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24", "isController": false}, {"data": [[1.0, 629.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24-Aggregated", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27-Aggregated", "isController": false}, {"data": [[1.0, 228.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26", "isController": false}, {"data": [[1.0, 228.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26-Aggregated", "isController": false}, {"data": [[5.0, 81.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18", "isController": false}, {"data": [[5.0, 81.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18-Aggregated", "isController": false}, {"data": [[5.0, 101.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19", "isController": false}, {"data": [[5.0, 101.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19-Aggregated", "isController": false}, {"data": [[5.0, 74.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16", "isController": false}, {"data": [[5.0, 74.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16-Aggregated", "isController": false}, {"data": [[5.0, 57.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17", "isController": false}, {"data": [[5.0, 57.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17-Aggregated", "isController": false}, {"data": [[1.0, 20.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21", "isController": false}, {"data": [[1.0, 20.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21-Aggregated", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20", "isController": false}, {"data": [[1.0, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20-Aggregated", "isController": false}, {"data": [[2.0, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09", "isController": false}, {"data": [[2.0, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09-Aggregated", "isController": false}, {"data": [[2.0, 6.0], [5.0, 7.1000000000000005]], "isOverall": false, "label": " /actuator/health/ping ", "isController": false}, {"data": [[4.142857142857142, 6.785714285714286]], "isOverall": false, "label": " /actuator/health/ping -Aggregated", "isController": false}, {"data": [[2.0, 21.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15", "isController": false}, {"data": [[2.0, 21.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15-Aggregated", "isController": false}, {"data": [[2.0, 5.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14", "isController": false}, {"data": [[2.0, 5.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14-Aggregated", "isController": false}, {"data": [[2.0, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13", "isController": false}, {"data": [[2.0, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13-Aggregated", "isController": false}, {"data": [[2.0, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12", "isController": false}, {"data": [[2.0, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12-Aggregated", "isController": false}, {"data": [[2.0, 12.0], [5.0, 8.6]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ ", "isController": false}, {"data": [[4.142857142857143, 9.571428571428571]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ -Aggregated", "isController": false}, {"data": [[2.0, 8.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16", "isController": false}, {"data": [[2.0, 8.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16-Aggregated", "isController": false}, {"data": [[2.0, 21.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11", "isController": false}, {"data": [[2.0, 21.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11-Aggregated", "isController": false}, {"data": [[2.0, 22.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10", "isController": false}, {"data": [[2.0, 22.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 6915.9, "minX": 1.6833912E12, "maxY": 7140.033333333334, "series": [{"data": [[1.6833912E12, 6915.9]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6833912E12, 7140.033333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6833912E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.6833912E12, "maxY": 2562.0, "series": [{"data": [[1.6833912E12, 8.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01", "isController": false}, {"data": [[1.6833912E12, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00", "isController": false}, {"data": [[1.6833912E12, 35.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03", "isController": false}, {"data": [[1.6833912E12, 41.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02", "isController": false}, {"data": [[1.6833912E12, 34.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05", "isController": false}, {"data": [[1.6833912E12, 6.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04", "isController": false}, {"data": [[1.6833912E12, 32.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07", "isController": false}, {"data": [[1.6833912E12, 14.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09", "isController": false}, {"data": [[1.6833912E12, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08", "isController": false}, {"data": [[1.6833912E12, 27.714285714285715]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6833912E12, 6.5]], "isOverall": false, "label": "S01_T05_ChairsTab-17", "isController": false}, {"data": [[1.6833912E12, 39.0]], "isOverall": false, "label": "S01_T05_ChairsTab-16", "isController": false}, {"data": [[1.6833912E12, 11.0]], "isOverall": false, "label": "S01_T05_ChairsTab-19", "isController": false}, {"data": [[1.6833912E12, 12.5]], "isOverall": false, "label": "S01_T05_ChairsTab-18", "isController": false}, {"data": [[1.6833912E12, 27.0]], "isOverall": false, "label": "S01_T05_ChairsTab-13", "isController": false}, {"data": [[1.6833912E12, 21.571428571428573]], "isOverall": false, "label": " /api/v1/store/DEFAULT ", "isController": false}, {"data": [[1.6833912E12, 25.0]], "isOverall": false, "label": "S01_T05_ChairsTab-15", "isController": false}, {"data": [[1.6833912E12, 34.0]], "isOverall": false, "label": "S01_T05_ChairsTab-14", "isController": false}, {"data": [[1.6833912E12, 13.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12", "isController": false}, {"data": [[1.6833912E12, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11", "isController": false}, {"data": [[1.6833912E12, 9.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13", "isController": false}, {"data": [[1.6833912E12, 16.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16", "isController": false}, {"data": [[1.6833912E12, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15", "isController": false}, {"data": [[1.6833912E12, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18", "isController": false}, {"data": [[1.6833912E12, 5.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17", "isController": false}, {"data": [[1.6833912E12, 21.5]], "isOverall": false, "label": "S01_T07_AddToCartButton-2", "isController": false}, {"data": [[1.6833912E12, 10.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-3", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19", "isController": false}, {"data": [[1.6833912E12, 25.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-1", "isController": false}, {"data": [[1.6833912E12, 7.0]], "isOverall": false, "label": "S01_T05_ChairsTab-20", "isController": false}, {"data": [[1.6833912E12, 12.5]], "isOverall": false, "label": "S01_T05_ChairsTab-22", "isController": false}, {"data": [[1.6833912E12, 30.0]], "isOverall": false, "label": "S01_T05_ChairsTab-21", "isController": false}, {"data": [[1.6833912E12, 23.28571428571429]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en ", "isController": false}, {"data": [[1.6833912E12, 32.0]], "isOverall": false, "label": "S01_T01_LaunchApp", "isController": true}, {"data": [[1.6833912E12, 11.285714285714286]], "isOverall": false, "label": " /api/v1/products/ ", "isController": false}, {"data": [[1.6833912E12, 21.5]], "isOverall": false, "label": "S01_T05_ChairsTab-24", "isController": false}, {"data": [[1.6833912E12, 31.5]], "isOverall": false, "label": "S01_T05_ChairsTab-23", "isController": false}, {"data": [[1.6833912E12, 74.5]], "isOverall": false, "label": "S01_T07_AddToCartButton", "isController": true}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10", "isController": false}, {"data": [[1.6833912E12, 102.0]], "isOverall": false, "label": "S01_T04_AddToCartButton", "isController": true}, {"data": [[1.6833912E12, 252.0]], "isOverall": false, "label": "S01_T01_LaunchApp-13", "isController": false}, {"data": [[1.6833912E12, 107.8]], "isOverall": false, "label": "S01_T01_LaunchApp-14", "isController": false}, {"data": [[1.6833912E12, 238.4]], "isOverall": false, "label": "S01_T01_LaunchApp-11", "isController": false}, {"data": [[1.6833912E12, 249.0]], "isOverall": false, "label": "S01_T01_LaunchApp-12", "isController": false}, {"data": [[1.6833912E12, 179.0]], "isOverall": false, "label": "S01_T01_LaunchApp-10", "isController": false}, {"data": [[1.6833912E12, 233.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair", "isController": true}, {"data": [[1.6833912E12, 239.8]], "isOverall": false, "label": "S01_T01_LaunchApp-19", "isController": false}, {"data": [[1.6833912E12, 219.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab", "isController": true}, {"data": [[1.6833912E12, 278.4]], "isOverall": false, "label": "S01_T01_LaunchApp-17", "isController": false}, {"data": [[1.6833912E12, 287.2]], "isOverall": false, "label": "S01_T01_LaunchApp-18", "isController": false}, {"data": [[1.6833912E12, 123.0]], "isOverall": false, "label": "S01_T01_LaunchApp-15", "isController": false}, {"data": [[1.6833912E12, 133.0]], "isOverall": false, "label": "S01_T01_LaunchApp-16", "isController": false}, {"data": [[1.6833912E12, 13.857142857142858]], "isOverall": false, "label": " /api/v1/category/ ", "isController": false}, {"data": [[1.6833912E12, 32.0]], "isOverall": false, "label": "S01_T01_LaunchApp-00", "isController": false}, {"data": [[1.6833912E12, 110.2]], "isOverall": false, "label": "S01_T01_LaunchApp-09", "isController": false}, {"data": [[1.6833912E12, 12.571428571428571]], "isOverall": false, "label": " /api/v1/content/pages/ ", "isController": false}, {"data": [[1.6833912E12, 283.8]], "isOverall": false, "label": "S01_T01_LaunchApp-06", "isController": false}, {"data": [[1.6833912E12, 30.2]], "isOverall": false, "label": "S01_T04_AddToCartButton-2", "isController": false}, {"data": [[1.6833912E12, 287.0]], "isOverall": false, "label": "S01_T01_LaunchApp-07", "isController": false}, {"data": [[1.6833912E12, 21.4]], "isOverall": false, "label": "S01_T04_AddToCartButton-1", "isController": false}, {"data": [[1.6833912E12, 94.2]], "isOverall": false, "label": "S01_T01_LaunchApp-04", "isController": false}, {"data": [[1.6833912E12, 114.0]], "isOverall": false, "label": "S01_T01_LaunchApp-05", "isController": false}, {"data": [[1.6833912E12, 12.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-3", "isController": false}, {"data": [[1.6833912E12, 102.4]], "isOverall": false, "label": "S01_T01_LaunchApp-31", "isController": false}, {"data": [[1.6833912E12, 123.0]], "isOverall": false, "label": "S01_T01_LaunchApp-32", "isController": false}, {"data": [[1.6833912E12, 135.0]], "isOverall": false, "label": "S01_T01_LaunchApp-30", "isController": false}, {"data": [[1.6833912E12, 2562.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout", "isController": true}, {"data": [[1.6833912E12, 24.714285714285715]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 ", "isController": false}, {"data": [[1.6833912E12, 33.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-06", "isController": false}, {"data": [[1.6833912E12, 27.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04", "isController": false}, {"data": [[1.6833912E12, 57.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-05", "isController": false}, {"data": [[1.6833912E12, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03", "isController": false}, {"data": [[1.6833912E12, 94.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-08", "isController": false}, {"data": [[1.6833912E12, 38.4]], "isOverall": false, "label": "S01_T04_AddToCartButton-0", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02", "isController": false}, {"data": [[1.6833912E12, 32.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-07", "isController": false}, {"data": [[1.6833912E12, 5.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01", "isController": false}, {"data": [[1.6833912E12, 8.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08", "isController": false}, {"data": [[1.6833912E12, 68.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-09", "isController": false}, {"data": [[1.6833912E12, 9.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07", "isController": false}, {"data": [[1.6833912E12, 11.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06", "isController": false}, {"data": [[1.6833912E12, 29.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05", "isController": false}, {"data": [[1.6833912E12, 209.42857142857144]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.6833912E12, 6.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-00", "isController": false}, {"data": [[1.6833912E12, 86.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-02", "isController": false}, {"data": [[1.6833912E12, 32.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-01", "isController": false}, {"data": [[1.6833912E12, 86.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-04", "isController": false}, {"data": [[1.6833912E12, 77.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-03", "isController": false}, {"data": [[1.6833912E12, 441.0]], "isOverall": false, "label": "S01_T05_ChairsTab", "isController": true}, {"data": [[1.6833912E12, 239.0]], "isOverall": false, "label": "S01_T01_LaunchApp-24", "isController": false}, {"data": [[1.6833912E12, 115.8]], "isOverall": false, "label": "S01_T01_LaunchApp-25", "isController": false}, {"data": [[1.6833912E12, 239.2]], "isOverall": false, "label": "S01_T01_LaunchApp-22", "isController": false}, {"data": [[1.6833912E12, 243.2]], "isOverall": false, "label": "S01_T01_LaunchApp-23", "isController": false}, {"data": [[1.6833912E12, 312.8]], "isOverall": false, "label": "S01_T01_LaunchApp-20", "isController": false}, {"data": [[1.6833912E12, 48.4]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14", "isController": false}, {"data": [[1.6833912E12, 309.8]], "isOverall": false, "label": "S01_T01_LaunchApp-21", "isController": false}, {"data": [[1.6833912E12, 56.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15", "isController": false}, {"data": [[1.6833912E12, 65.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12", "isController": false}, {"data": [[1.6833912E12, 65.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13", "isController": false}, {"data": [[1.6833912E12, 123.4]], "isOverall": false, "label": "S01_T01_LaunchApp-28", "isController": false}, {"data": [[1.6833912E12, 170.6]], "isOverall": false, "label": "S01_T01_LaunchApp-29", "isController": false}, {"data": [[1.6833912E12, 126.8]], "isOverall": false, "label": "S01_T01_LaunchApp-26", "isController": false}, {"data": [[1.6833912E12, 124.2]], "isOverall": false, "label": "S01_T01_LaunchApp-27", "isController": false}, {"data": [[1.6833912E12, 6.8]], "isOverall": false, "label": "S01_T03_ClickOnTable", "isController": true}, {"data": [[1.6833912E12, 41.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-11", "isController": false}, {"data": [[1.6833912E12, 70.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-10", "isController": false}, {"data": [[1.6833912E12, 48.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-13", "isController": false}, {"data": [[1.6833912E12, 46.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-12", "isController": false}, {"data": [[1.6833912E12, 29.714285714285715]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6833912E12, 51.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-15", "isController": false}, {"data": [[1.6833912E12, 88.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-14", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22", "isController": false}, {"data": [[1.6833912E12, 1217.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25", "isController": false}, {"data": [[1.6833912E12, 629.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24", "isController": false}, {"data": [[1.6833912E12, 120.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27", "isController": false}, {"data": [[1.6833912E12, 228.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26", "isController": false}, {"data": [[1.6833912E12, 81.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18", "isController": false}, {"data": [[1.6833912E12, 101.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19", "isController": false}, {"data": [[1.6833912E12, 74.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16", "isController": false}, {"data": [[1.6833912E12, 57.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17", "isController": false}, {"data": [[1.6833912E12, 20.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20", "isController": false}, {"data": [[1.6833912E12, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09", "isController": false}, {"data": [[1.6833912E12, 6.785714285714286]], "isOverall": false, "label": " /actuator/health/ping ", "isController": false}, {"data": [[1.6833912E12, 21.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15", "isController": false}, {"data": [[1.6833912E12, 5.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12", "isController": false}, {"data": [[1.6833912E12, 9.571428571428571]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ ", "isController": false}, {"data": [[1.6833912E12, 8.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16", "isController": false}, {"data": [[1.6833912E12, 21.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11", "isController": false}, {"data": [[1.6833912E12, 22.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6833912E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6833912E12, "maxY": 1215.0, "series": [{"data": [[1.6833912E12, 8.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01", "isController": false}, {"data": [[1.6833912E12, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00", "isController": false}, {"data": [[1.6833912E12, 35.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03", "isController": false}, {"data": [[1.6833912E12, 41.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02", "isController": false}, {"data": [[1.6833912E12, 34.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05", "isController": false}, {"data": [[1.6833912E12, 5.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04", "isController": false}, {"data": [[1.6833912E12, 32.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07", "isController": false}, {"data": [[1.6833912E12, 13.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09", "isController": false}, {"data": [[1.6833912E12, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08", "isController": false}, {"data": [[1.6833912E12, 27.714285714285715]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6833912E12, 6.5]], "isOverall": false, "label": "S01_T05_ChairsTab-17", "isController": false}, {"data": [[1.6833912E12, 39.0]], "isOverall": false, "label": "S01_T05_ChairsTab-16", "isController": false}, {"data": [[1.6833912E12, 10.5]], "isOverall": false, "label": "S01_T05_ChairsTab-19", "isController": false}, {"data": [[1.6833912E12, 12.5]], "isOverall": false, "label": "S01_T05_ChairsTab-18", "isController": false}, {"data": [[1.6833912E12, 27.0]], "isOverall": false, "label": "S01_T05_ChairsTab-13", "isController": false}, {"data": [[1.6833912E12, 21.07142857142857]], "isOverall": false, "label": " /api/v1/store/DEFAULT ", "isController": false}, {"data": [[1.6833912E12, 25.0]], "isOverall": false, "label": "S01_T05_ChairsTab-15", "isController": false}, {"data": [[1.6833912E12, 34.0]], "isOverall": false, "label": "S01_T05_ChairsTab-14", "isController": false}, {"data": [[1.6833912E12, 13.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12", "isController": false}, {"data": [[1.6833912E12, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11", "isController": false}, {"data": [[1.6833912E12, 9.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14", "isController": false}, {"data": [[1.6833912E12, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13", "isController": false}, {"data": [[1.6833912E12, 16.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16", "isController": false}, {"data": [[1.6833912E12, 19.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15", "isController": false}, {"data": [[1.6833912E12, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18", "isController": false}, {"data": [[1.6833912E12, 5.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17", "isController": false}, {"data": [[1.6833912E12, 21.5]], "isOverall": false, "label": "S01_T07_AddToCartButton-2", "isController": false}, {"data": [[1.6833912E12, 10.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-3", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19", "isController": false}, {"data": [[1.6833912E12, 25.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-1", "isController": false}, {"data": [[1.6833912E12, 6.5]], "isOverall": false, "label": "S01_T05_ChairsTab-20", "isController": false}, {"data": [[1.6833912E12, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-22", "isController": false}, {"data": [[1.6833912E12, 30.0]], "isOverall": false, "label": "S01_T05_ChairsTab-21", "isController": false}, {"data": [[1.6833912E12, 23.28571428571429]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en ", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T01_LaunchApp", "isController": true}, {"data": [[1.6833912E12, 10.428571428571429]], "isOverall": false, "label": " /api/v1/products/ ", "isController": false}, {"data": [[1.6833912E12, 21.0]], "isOverall": false, "label": "S01_T05_ChairsTab-24", "isController": false}, {"data": [[1.6833912E12, 31.5]], "isOverall": false, "label": "S01_T05_ChairsTab-23", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T07_AddToCartButton", "isController": true}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T04_AddToCartButton", "isController": true}, {"data": [[1.6833912E12, 252.0]], "isOverall": false, "label": "S01_T01_LaunchApp-13", "isController": false}, {"data": [[1.6833912E12, 95.8]], "isOverall": false, "label": "S01_T01_LaunchApp-14", "isController": false}, {"data": [[1.6833912E12, 238.4]], "isOverall": false, "label": "S01_T01_LaunchApp-11", "isController": false}, {"data": [[1.6833912E12, 249.0]], "isOverall": false, "label": "S01_T01_LaunchApp-12", "isController": false}, {"data": [[1.6833912E12, 116.6]], "isOverall": false, "label": "S01_T01_LaunchApp-10", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair", "isController": true}, {"data": [[1.6833912E12, 239.8]], "isOverall": false, "label": "S01_T01_LaunchApp-19", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab", "isController": true}, {"data": [[1.6833912E12, 278.4]], "isOverall": false, "label": "S01_T01_LaunchApp-17", "isController": false}, {"data": [[1.6833912E12, 287.2]], "isOverall": false, "label": "S01_T01_LaunchApp-18", "isController": false}, {"data": [[1.6833912E12, 89.2]], "isOverall": false, "label": "S01_T01_LaunchApp-15", "isController": false}, {"data": [[1.6833912E12, 119.8]], "isOverall": false, "label": "S01_T01_LaunchApp-16", "isController": false}, {"data": [[1.6833912E12, 12.000000000000002]], "isOverall": false, "label": " /api/v1/category/ ", "isController": false}, {"data": [[1.6833912E12, 32.0]], "isOverall": false, "label": "S01_T01_LaunchApp-00", "isController": false}, {"data": [[1.6833912E12, 93.8]], "isOverall": false, "label": "S01_T01_LaunchApp-09", "isController": false}, {"data": [[1.6833912E12, 8.714285714285715]], "isOverall": false, "label": " /api/v1/content/pages/ ", "isController": false}, {"data": [[1.6833912E12, 283.8]], "isOverall": false, "label": "S01_T01_LaunchApp-06", "isController": false}, {"data": [[1.6833912E12, 30.2]], "isOverall": false, "label": "S01_T04_AddToCartButton-2", "isController": false}, {"data": [[1.6833912E12, 287.0]], "isOverall": false, "label": "S01_T01_LaunchApp-07", "isController": false}, {"data": [[1.6833912E12, 20.6]], "isOverall": false, "label": "S01_T04_AddToCartButton-1", "isController": false}, {"data": [[1.6833912E12, 94.2]], "isOverall": false, "label": "S01_T01_LaunchApp-04", "isController": false}, {"data": [[1.6833912E12, 88.0]], "isOverall": false, "label": "S01_T01_LaunchApp-05", "isController": false}, {"data": [[1.6833912E12, 11.4]], "isOverall": false, "label": "S01_T04_AddToCartButton-3", "isController": false}, {"data": [[1.6833912E12, 100.0]], "isOverall": false, "label": "S01_T01_LaunchApp-31", "isController": false}, {"data": [[1.6833912E12, 104.2]], "isOverall": false, "label": "S01_T01_LaunchApp-32", "isController": false}, {"data": [[1.6833912E12, 98.4]], "isOverall": false, "label": "S01_T01_LaunchApp-30", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout", "isController": true}, {"data": [[1.6833912E12, 24.714285714285715]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 ", "isController": false}, {"data": [[1.6833912E12, 30.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-06", "isController": false}, {"data": [[1.6833912E12, 27.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04", "isController": false}, {"data": [[1.6833912E12, 47.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-05", "isController": false}, {"data": [[1.6833912E12, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03", "isController": false}, {"data": [[1.6833912E12, 94.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-08", "isController": false}, {"data": [[1.6833912E12, 38.4]], "isOverall": false, "label": "S01_T04_AddToCartButton-0", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02", "isController": false}, {"data": [[1.6833912E12, 27.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-07", "isController": false}, {"data": [[1.6833912E12, 5.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01", "isController": false}, {"data": [[1.6833912E12, 7.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08", "isController": false}, {"data": [[1.6833912E12, 68.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-09", "isController": false}, {"data": [[1.6833912E12, 8.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07", "isController": false}, {"data": [[1.6833912E12, 11.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06", "isController": false}, {"data": [[1.6833912E12, 29.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.6833912E12, 6.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-00", "isController": false}, {"data": [[1.6833912E12, 86.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-02", "isController": false}, {"data": [[1.6833912E12, 30.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-01", "isController": false}, {"data": [[1.6833912E12, 86.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-04", "isController": false}, {"data": [[1.6833912E12, 77.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-03", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab", "isController": true}, {"data": [[1.6833912E12, 239.0]], "isOverall": false, "label": "S01_T01_LaunchApp-24", "isController": false}, {"data": [[1.6833912E12, 100.2]], "isOverall": false, "label": "S01_T01_LaunchApp-25", "isController": false}, {"data": [[1.6833912E12, 239.2]], "isOverall": false, "label": "S01_T01_LaunchApp-22", "isController": false}, {"data": [[1.6833912E12, 243.2]], "isOverall": false, "label": "S01_T01_LaunchApp-23", "isController": false}, {"data": [[1.6833912E12, 312.8]], "isOverall": false, "label": "S01_T01_LaunchApp-20", "isController": false}, {"data": [[1.6833912E12, 32.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14", "isController": false}, {"data": [[1.6833912E12, 309.8]], "isOverall": false, "label": "S01_T01_LaunchApp-21", "isController": false}, {"data": [[1.6833912E12, 39.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15", "isController": false}, {"data": [[1.6833912E12, 65.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12", "isController": false}, {"data": [[1.6833912E12, 65.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13", "isController": false}, {"data": [[1.6833912E12, 102.0]], "isOverall": false, "label": "S01_T01_LaunchApp-28", "isController": false}, {"data": [[1.6833912E12, 106.4]], "isOverall": false, "label": "S01_T01_LaunchApp-29", "isController": false}, {"data": [[1.6833912E12, 115.8]], "isOverall": false, "label": "S01_T01_LaunchApp-26", "isController": false}, {"data": [[1.6833912E12, 104.6]], "isOverall": false, "label": "S01_T01_LaunchApp-27", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T03_ClickOnTable", "isController": true}, {"data": [[1.6833912E12, 38.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-11", "isController": false}, {"data": [[1.6833912E12, 70.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-10", "isController": false}, {"data": [[1.6833912E12, 41.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-13", "isController": false}, {"data": [[1.6833912E12, 40.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-12", "isController": false}, {"data": [[1.6833912E12, 29.714285714285715]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6833912E12, 43.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-15", "isController": false}, {"data": [[1.6833912E12, 88.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-14", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23", "isController": false}, {"data": [[1.6833912E12, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22", "isController": false}, {"data": [[1.6833912E12, 1215.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25", "isController": false}, {"data": [[1.6833912E12, 626.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24", "isController": false}, {"data": [[1.6833912E12, 119.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27", "isController": false}, {"data": [[1.6833912E12, 227.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26", "isController": false}, {"data": [[1.6833912E12, 81.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18", "isController": false}, {"data": [[1.6833912E12, 101.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19", "isController": false}, {"data": [[1.6833912E12, 74.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16", "isController": false}, {"data": [[1.6833912E12, 40.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17", "isController": false}, {"data": [[1.6833912E12, 20.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21", "isController": false}, {"data": [[1.6833912E12, 18.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20", "isController": false}, {"data": [[1.6833912E12, 26.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09", "isController": false}, {"data": [[1.6833912E12, 6.357142857142857]], "isOverall": false, "label": " /actuator/health/ping ", "isController": false}, {"data": [[1.6833912E12, 21.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15", "isController": false}, {"data": [[1.6833912E12, 5.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14", "isController": false}, {"data": [[1.6833912E12, 4.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13", "isController": false}, {"data": [[1.6833912E12, 3.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12", "isController": false}, {"data": [[1.6833912E12, 9.0]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ ", "isController": false}, {"data": [[1.6833912E12, 7.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16", "isController": false}, {"data": [[1.6833912E12, 21.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11", "isController": false}, {"data": [[1.6833912E12, 22.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6833912E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6833912E12, "maxY": 982.0, "series": [{"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-17", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-16", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-19", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-18", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-13", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/store/DEFAULT ", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-15", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-14", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-2", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-3", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-1", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-20", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-22", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-21", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en ", "isController": false}, {"data": [[1.6833912E12, 6.6]], "isOverall": false, "label": "S01_T01_LaunchApp", "isController": true}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/products/ ", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-24", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab-23", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T07_AddToCartButton", "isController": true}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T04_AddToCartButton", "isController": true}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T01_LaunchApp-13", "isController": false}, {"data": [[1.6833912E12, 2.2]], "isOverall": false, "label": "S01_T01_LaunchApp-14", "isController": false}, {"data": [[1.6833912E12, 1.7999999999999998]], "isOverall": false, "label": "S01_T01_LaunchApp-11", "isController": false}, {"data": [[1.6833912E12, 1.6]], "isOverall": false, "label": "S01_T01_LaunchApp-12", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T01_LaunchApp-10", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair", "isController": true}, {"data": [[1.6833912E12, 1.8]], "isOverall": false, "label": "S01_T01_LaunchApp-19", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab", "isController": true}, {"data": [[1.6833912E12, 6.0]], "isOverall": false, "label": "S01_T01_LaunchApp-17", "isController": false}, {"data": [[1.6833912E12, 1.5999999999999999]], "isOverall": false, "label": "S01_T01_LaunchApp-18", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T01_LaunchApp-15", "isController": false}, {"data": [[1.6833912E12, 2.2]], "isOverall": false, "label": "S01_T01_LaunchApp-16", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/category/ ", "isController": false}, {"data": [[1.6833912E12, 6.6]], "isOverall": false, "label": "S01_T01_LaunchApp-00", "isController": false}, {"data": [[1.6833912E12, 2.8]], "isOverall": false, "label": "S01_T01_LaunchApp-09", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/content/pages/ ", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-06", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-2", "isController": false}, {"data": [[1.6833912E12, 3.8]], "isOverall": false, "label": "S01_T01_LaunchApp-07", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-1", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T01_LaunchApp-04", "isController": false}, {"data": [[1.6833912E12, 0.6]], "isOverall": false, "label": "S01_T01_LaunchApp-05", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-3", "isController": false}, {"data": [[1.6833912E12, 4.8]], "isOverall": false, "label": "S01_T01_LaunchApp-31", "isController": false}, {"data": [[1.6833912E12, 2.4]], "isOverall": false, "label": "S01_T01_LaunchApp-32", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T01_LaunchApp-30", "isController": false}, {"data": [[1.6833912E12, 982.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout", "isController": true}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 ", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-06", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04", "isController": false}, {"data": [[1.6833912E12, 0.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-05", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-08", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-0", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-07", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-09", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-00", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-02", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-01", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-04", "isController": false}, {"data": [[1.6833912E12, 0.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-03", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T05_ChairsTab", "isController": true}, {"data": [[1.6833912E12, 1.6]], "isOverall": false, "label": "S01_T01_LaunchApp-24", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T01_LaunchApp-25", "isController": false}, {"data": [[1.6833912E12, 5.6]], "isOverall": false, "label": "S01_T01_LaunchApp-22", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T01_LaunchApp-23", "isController": false}, {"data": [[1.6833912E12, 1.4]], "isOverall": false, "label": "S01_T01_LaunchApp-20", "isController": false}, {"data": [[1.6833912E12, 2.4]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T01_LaunchApp-21", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13", "isController": false}, {"data": [[1.6833912E12, 4.8]], "isOverall": false, "label": "S01_T01_LaunchApp-28", "isController": false}, {"data": [[1.6833912E12, 0.6]], "isOverall": false, "label": "S01_T01_LaunchApp-29", "isController": false}, {"data": [[1.6833912E12, 2.8]], "isOverall": false, "label": "S01_T01_LaunchApp-26", "isController": false}, {"data": [[1.6833912E12, 5.2]], "isOverall": false, "label": "S01_T01_LaunchApp-27", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T03_ClickOnTable", "isController": true}, {"data": [[1.6833912E12, 2.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-11", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-10", "isController": false}, {"data": [[1.6833912E12, 0.6]], "isOverall": false, "label": "S01_T03_ClickOnTable-13", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-12", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T03_ClickOnTable-15", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-14", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22", "isController": false}, {"data": [[1.6833912E12, 294.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25", "isController": false}, {"data": [[1.6833912E12, 502.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24", "isController": false}, {"data": [[1.6833912E12, 87.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27", "isController": false}, {"data": [[1.6833912E12, 99.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26", "isController": false}, {"data": [[1.6833912E12, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18", "isController": false}, {"data": [[1.6833912E12, 0.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19", "isController": false}, {"data": [[1.6833912E12, 1.2]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16", "isController": false}, {"data": [[1.6833912E12, 3.8]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /actuator/health/ping ", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ ", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11", "isController": false}, {"data": [[1.6833912E12, 0.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6833912E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.6833912E12, "maxY": 630.0, "series": [{"data": [[1.6833912E12, 630.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6833912E12, 3.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6833912E12, 190.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6833912E12, 461.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6833912E12, 41.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.6833912E12, 335.5]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6833912E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 13.5, "minX": 3.0, "maxY": 228.0, "series": [{"data": [[32.0, 26.0], [70.0, 36.0], [74.0, 131.0], [72.0, 18.5], [18.0, 13.5], [169.0, 90.5], [23.0, 14.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[74.0, 86.0], [18.0, 18.0], [169.0, 138.0], [3.0, 228.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 169.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 13.0, "minX": 3.0, "maxY": 227.0, "series": [{"data": [[32.0, 25.5], [70.0, 33.0], [74.0, 117.0], [72.0, 18.0], [18.0, 13.5], [169.0, 69.5], [23.0, 13.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[74.0, 72.0], [18.0, 18.0], [169.0, 115.0], [3.0, 227.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 169.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 7.683333333333334, "minX": 1.6833912E12, "maxY": 7.683333333333334, "series": [{"data": [[1.6833912E12, 7.683333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6833912E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.6833912E12, "maxY": 7.0, "series": [{"data": [[1.6833912E12, 7.0]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.6833912E12, 0.06666666666666667]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.6833912E12, 0.5]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6833912E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6833912E12, "maxY": 0.23333333333333334, "series": [{"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T07_AddToCartButton-0-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-15-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-23-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-21-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-27-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-02-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-19-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16-failure", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-10-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26-failure", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-17-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-06-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-16-success", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en -success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-13-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-11-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T04_AddToCartButton-success", "isController": true}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-20-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T04_AddToCartButton-2-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-32-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12-failure", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T07_AddToCartButton-3-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-09-failure", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-22-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-22-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-success", "isController": true}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-12-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-05-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-11-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-03-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08-success", "isController": false}, {"data": [[1.6833912E12, 0.23333333333333334]], "isOverall": false, "label": " /api/v1/store/DEFAULT -success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-26-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21-failure", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15-success", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": "Transaction Controller-success", "isController": true}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-31-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-18-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-13-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-14-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T04_AddToCartButton-3-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-17-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07-success", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ -success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T07_AddToCartButton-2-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25-failure", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-07-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-success", "isController": true}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 -success", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/category/ -success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-00-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01-success", "isController": false}, {"data": [[1.6833912E12, 0.23333333333333334]], "isOverall": false, "label": " /actuator/health/ping -success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-21-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-13-success", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en -success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-12-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-06-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-25-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-23-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-15-success", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en -success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-08-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-18-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24-failure", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/products/ -success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-19-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-04-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T07_AddToCartButton-success", "isController": true}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-30-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-success", "isController": true}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T04_AddToCartButton-0-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-29-success", "isController": false}, {"data": [[1.6833912E12, 0.11666666666666667]], "isOverall": false, "label": " /api/v1/content/pages/ -success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-14-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-success", "isController": true}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T07_AddToCartButton-1-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-14-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-20-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-01-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-07-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-24-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-24-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-09-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-00-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27-failure", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-05-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-04-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-10-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-28-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09-success", "isController": false}, {"data": [[1.6833912E12, 0.016666666666666666]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-failure", "isController": true}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-success", "isController": true}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T04_AddToCartButton-1-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10-success", "isController": false}, {"data": [[1.6833912E12, 0.03333333333333333]], "isOverall": false, "label": "S01_T05_ChairsTab-15-success", "isController": false}, {"data": [[1.6833912E12, 0.08333333333333333]], "isOverall": false, "label": "S01_T01_LaunchApp-16-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6833912E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.21666666666666667, "minX": 1.6833912E12, "maxY": 8.033333333333333, "series": [{"data": [[1.6833912E12, 8.033333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.6833912E12, 0.21666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6833912E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
