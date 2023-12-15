/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
/* eslint-disable new-cap */
/* eslint-disable import/extensions */
import Datafeed from './datafeed/datafeed.js';


export function initOnReady() {
  const widget = (window.tvWidget = new TradingView.widget({
    library_path: '/advance_charting_library/charting_library/',
    // debug: true, // uncomment this line to see Library errors and warnings in the console
    fullscreen: true,
    symbol: 'Bitfinex:BTC/USD',
    interval: '1D',
    container: 'tv_chart_container',
    // datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
    datafeed: Datafeed,
    theme: "dark",
    locale: 'en',
    timezone: 'Asia/Kolkata',
    time_frames: [
      { text: '1D', resolution: '1', title: '1D' },
      { text: '5D', resolution: '15', title: '5D' },
      { text: '1M', resolution: 'D', title: '1M' },
      { text: '2M', resolution: 'D', title: '2M' },
      { text: '3M', resolution: 'D', title: '3M' },
      { text: '1Y', resolution: 'D', title: '1Y' },
      { text: '5Y', resolution: '1W', title: '5Y' },
      { text: '22y', resolution: '1M', description: 'Max', title: 'MAX' },
    ],
    disabled_features: [
      
    ],
    enabled_features: [
      'charting_library_debug_mode',
      'show_zoom_and_move_buttons_on_touch',
      'save_chart_properties_to_local_storage',
      'volume_force_overlay',
      'display_legend_on_all_charts',
      'hide_left_toolbar_by_default',
    ],
  }));
}


window.initOnReady = initOnReady;
window.addEventListener('DOMContentLoaded', initOnReady, false);
