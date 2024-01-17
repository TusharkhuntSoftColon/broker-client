/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
/* eslint-disable new-cap */
/* eslint-disable import/extensions */
console.log('Advance charting library loaded...');
import Datafeed from './datafeed/datafeed.js';

// Custom buy button
const buyButton = document.createElement('button');
buyButton.innerHTML = 'Buy';
buyButton.addEventListener('click', () => {
    // Logic to handle the buy action
    // Implement your buy functionality here
});

// Custom sell button
const sellButton = document.createElement('button');
sellButton.innerHTML = 'Sell';
sellButton.addEventListener('click', () => {
    // Logic to handle the sell action
    // Implement your sell functionality here
});



export function initOnReady() {
  const widget = (window.tvWidget = new TradingView.widget({
    library_path: '/advance_charting_library/charting_library/',
    // debug: true, // uncomment this line to see Library errors and warnings in the console
    fullscreen: true,
    symbol: 'IRCTC',
    interval: '1',
    container: 'tv_chart_container',
    // datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
    datafeed: Datafeed,
    theme: "light",
    locale: 'en',
    timezone: 'Asia/Kolkata',
    has_intraday: true,
    intraday_multipliers: ['1', '5', '15'],
    time_frames: [
      { text: '1m', resolution: '1', title: '1 minutes' },
      // { text: '5D', resolution: '15', title: '5D' },
      { text: '1M', resolution: 'D', title: '1M' },
      { text: '2M', resolution: 'D', title: '2M' },
      { text: '3M', resolution: 'D', title: '3M' },
      { text: '1Y', resolution: 'D', title: '1Y' },
      { text: '5Y', resolution: '1W', title: '5Y' },
      { text: '22y', resolution: '1M', description: 'Max', title: 'MAX' },

      // { text: '5m', resolution: '5', title: '5M' },
      // { text: '15m', resolution: '15', title: '15M' },
      // { text: '1h', resolution: '60', title: '1H' },

      { text: '5M', resolution: '5', title: '5M' },
      { text: '15M', resolution: '15', title: '15M' },

    ],
    disabled_features: [
      
    ],
    enabled_features: [
      'charting_library_debug_mode',
      'show_zoom_and_move_buttons_on_touch',
      'save_chart_properties_to_local_storage',
      'volume_force_overlay',
      'seconds_resolution',
      // 'custom_resolutions',
      'display_legend_on_all_charts',
      'hide_left_toolbar_by_default',
    ],
    customPanes: [
      {
        name: "Trading Panel",
        position: "bottom",
        class: "trading-panel",
      },
    ],
    overrides: {
      // 'paneProperties.background': '#f8f8f8', // Override default background color
      // 'paneProperties.properties.showBuySellButtons': true,
      // 'paneProperties.properties.showBuyButton': true,
      // 'paneProperties.properties.showSellButton': true,
      // 'paneProperties.properties.buySellButtons' : {
      //   buyButton: buyButton.outerHTML,
      //   sellButton: sellButton.outerHTML,
      // } ,// Override default background color
  
      // // Add custom input field for moving average length
      // 'scalesProperties.lineColor': 'green', // Line color override
  
      // // Custom input field for moving average length
      // 'mainSeriesProperties.movingAverageLength': {
      //   name: 'Moving Average Length', // Display name for the field
      //   type: 'integer', // Type of the field (integer, float, string, boolean)
      //   defval: 20, // Default value
      // },
  
      // Add more custom fields as needed
    },
    paneProperties: {
      background: "red  ",
      customButton: [
          {
              title: "Button 1", // Text to display on the button
              action: function (context, args) {
                  // Custom action to perform when Button 1 is clicked
                  // You can add your own logic or function here
                  console.log("Button 1 clicked!");
              }
          },
          {
              title: "Button 2", // Text to display on the button
              action: function (context, args) {
                  // Custom action to perform when Button 2 is clicked
                  // You can add your own logic or function here
                  console.log("Button 2 clicked!");
              }
          }
      ]
  }
  }));
//   widget.onChartReady(() => {
//     // Custom buy button
//     const buyButton = document.createElement('button');
//     buyButton.innerHTML = 'Buy';
//     buyButton.addEventListener('click', () => {
//         // Logic to handle the buy action
//         // Implement your buy functionality here
//     });

//     // Custom sell button
//     const sellButton = document.createElement('button');
//     sellButton.innerHTML = 'Sell';
//     sellButton.addEventListener('click', () => {
//         // Logic to handle the sell action
//         // Implement your sell functionality here
//     });

//     // Get the TradingView chart's pane properties
//     const paneProperties = widget.chart().createStudy('paneProperties', false, true);
//     paneProperties.properties.showBuySellButtons = true;
//     paneProperties.properties.showBuyButton = true;
//     paneProperties.properties.showSellButton = true;

//     // Append the custom buttons to the pane properties
//     paneProperties.properties.buySellButtons = {
//         buyButton: buyButton.outerHTML,
//         sellButton: sellButton.outerHTML,
//     };

//     // Apply the modified pane properties to the TradingView chart
//     widget.chart().applyOverrides({
//         'paneProperties.background': '#f8f9fa', // Set background color if needed
//         // Apply other customizations if needed
//     });
// });
console.log('Fetching buy and sell data...');
};

console.log(initOnReady);

window.initOnReady = initOnReady;
window.addEventListener('DOMContentLoaded', initOnReady, false);
