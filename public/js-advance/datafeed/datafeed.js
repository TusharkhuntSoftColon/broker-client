// /* eslint-disable no-restricted-syntax */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable perfectionist/sort-imports */
// /* eslint-disable import/extensions */
// import {generateSymbol,parseFullSymbol,} from './helpers.js';
// import {subscribeOnStream,unsubscribeFromStream,} from './streaming.js';
// import { AUTH_TOKEN,CLIENT_CODE,OCP_KEY,AUTH_TOKEN_USER } from '../../../src/utils/environments';
// import axios from '../../../node_modules/axios';
// import  {fivePaisa}  from "../stockData.js"

// // const targetValue = 'HDFCBANK'; // The value you want to find
// // let foundItem = null;
// // data.forEach(item => {
// //   if (item.Name === targetValue) {
// //     foundItem = item;
// //   }
// // });

// // if (foundItem) {
// //   console.log('Found item:', foundItem);
// // } else {
// //   console.log('Item not found.');
// // }

// // Use it to keep a record of the most recent bar on the chart
// const lastBarsCache = new Map();

// let configurationData = {
//     // Represents the resolutions for bars supported by your datafeed
// 	supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
//     // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
//     exchanges: [],
//     // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
//     symbols_types: [],
// };
// // Obtains all symbols for all exchanges supported by CryptoCompare API

// // const apiUrl = `http://localhost:3336/api/user/exchange-list`;
// // const headers = {

// //   'Authorization': `Bearer ${AUTH_TOKEN_USER}`,
// // };

// // axios.get(apiUrl, { headers })
// //   .then(response => {
// //     // Handle the successful response
// //     console.log('Response:', response.data);
// //   })
// //   .catch(error => {
// //     if (error.request) {
// //       // The request was made, but no response was received
// //       console.error('No response received. The request was made but got no response.');
// //       console.error('Config:', error.config);
// //     } else {
// //       // Something happened in setting up the request that triggered an Error
// //       console.error('Error:', error.message);
// //     }
// //   });

// const myData = {
// 	 data :[
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "IRCTC",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "KOTAKBANK",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "AXISBANK",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "SBILIFE",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "HDFCLIFE",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "INFY",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "TECHM",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "LTTS",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "RELIANCE",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "ATGL",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "BAJFINANCE",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "HINDUNILVR",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			_id: "658aa1cfd1e67a225ba585b7",
// 			name: "MARUTI",
// 			Series: "EQUITY",
// 			exchange: {
// 				_id: "658aa0c6d1e67a225ba5856f",
// 				name: "NSE",
// 				isActive: true
// 			}
// 		},
// 		{
// 			"_id": "658aa1d5d1e67a225ba585bb",
// 			"name": "HDFCBANK",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa0c6d1e67a225ba5856f",
// 				"name": "NSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1dbd1e67a225ba585bf",
// 			"name": "SBIN",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa0c6d1e67a225ba5856f",
// 				"name": "NSE",
// 				"isActive": true
// 			}
// 		},
// 			// <<-------------------------------------------------->>
// 		// COMDITY IS NOT ADDED INTO SHEET
// 		{
// 			"_id": "658be1178137cec46a0e88d7",
// 			"name": "NATURALGAS-I",
// 			"Series": "FUTURE",
// 			"exchange": {
// 				"_id": "658aa12bd1e67a225ba5858c",
// 				"name": "MCX",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658d12fa38c313fd6852c25b",
// 			"name": "GOLD-I",
// 			"Series": "FUTURE",
// 			"exchange": {
// 				"_id": "658aa12bd1e67a225ba5858c",
// 				"name": "MCX",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658d12fa38c313fd6852c25b",
// 			"name": "SILVER-I",
// 			"Series": "FUTURE",
// 			"exchange": {
// 				"_id": "658aa12bd1e67a225ba5858c",
// 				"name": "MCX",
// 				"isActive": true
// 			}
// 		},
// 	// <<-------------------------------------------------->>
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "WIPRO",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "TCS",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "HCLTECH",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "ABB",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "ATUL",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "BALRAMCHIN",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "BEL",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "CHAMBLFERT",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "EXIDEIND",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "CIPLA",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "DABUR",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "TITAN",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "SAIL",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "IDBI",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "DRREDDY",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "HEROMOTOCO",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "HFCL",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa1f2d1e67a225ba585c7",
// 			"name": "MRF",
// 			"Series": "EQUITY",
// 			"exchange": {
// 				"_id": "658aa134d1e67a225ba58597",
// 				"name": "BSE",
// 				"isActive": true
// 			}
// 		},
// 			// <<-------------------------------------------------->>
// 		// SECTOR IS NOT ADDED INTO SHEET
// 		{
// 			"_id": "658aa22ed1e67a225ba585df",
// 			"name": "FINNIFTY",
// 			"Series": "INDEX",
// 			"exchange": {
// 				"_id": "658aa13fd1e67a225ba585a2",
// 				"name": "FNO",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa22ed1e67a225ba585df",
// 			"name": "NIFTY",
// 			"Series": "INDEX",
// 			"exchange": {
// 				"_id": "658aa13fd1e67a225ba585a2",
// 				"name": "FNO",
// 				"isActive": true
// 			}
// 		},
// 		{
// 			"_id": "658aa22ed1e67a225ba585df",
// 			"name": "BANKNIFTY",
// 			"Series": "INDEX",
// 			"exchange": {
// 				"_id": "658aa13fd1e67a225ba585a2",
// 				"name": "FNO",
// 				"isActive": true
// 			}
// 		}
// 	]}
// let Dummyexchanges =  []
// 	for (const Details of myData.data) {
// 				const exchange = {
// 					name: Details?.exchange?.name,
// 					value: Details?.exchange?.name,
// 					desc: `${Details?.exchange?.name}`,
// 				};
// 				Dummyexchanges.push(exchange);
// 				const symbols = {
// 					name: Details?.name,
// 					value: Details?.name,
// 				};
// 				configurationData.symbols_types.push(symbols);
// 			}
// const uniqueExchanges =  [...new Map(Dummyexchanges.map(item => [item['value'], item])).values()];
//  configurationData.exchanges.push(...uniqueExchanges);

// 	let symbolData = [];
// 	for (const Details of myData.data) {
// 		const symbol = generateSymbol(Details?.exchange?.name, Details?.name);
// 		// console.log("sadasdasdsadsadsad",Details);
// 				const newData = {
// 					symbol: Details?.name,
// 					full_name: `${Details?.name}/${Details?.exchange?.name}`,
// 					description: Details?.name,
// 					exchange: Details?.exchange?.name,
// 					type: `${Details?.Series}`,
// 				};
// 				 symbolData.push(newData);
// 	}

// export default  {
// 	onReady:async  (callback) => {
// 		console.log('[onReady]: Method call');
		
// 		setTimeout(() => callback(configurationData));
// 	},

// 	searchSymbols: async (
// 		userInput,
// 		exchange,
// 		symbolType,
// 		onResultReadyCallback,
// 	) => {
// 		console.log('[searchSymbols]: Method call');
// 		const symbols = await symbolData;
// 		const newSymbols = symbols.filter(symbol => {
// 			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
// 			const isFullSymbolContainsInput = symbol.full_name
// 			.toLowerCase()
// 			.indexOf(userInput.toLowerCase()) !== -1;
// 			return isExchangeValid && isFullSymbolContainsInput;
// 		});

// 		// symbolType = symbols.symbol.exchange

// 		console.log(symbolType);

// 		console.log("sadasdasdsadsadsad",exchange);
// 		onResultReadyCallback(newSymbols);
// 	},

// 	resolveSymbol: async (
// 		symbolName,
// 		onSymbolResolvedCallback,
// 		onResolveErrorCallback,
// 		extension
// 	) => {
// 		console.log('[resolveSymbol]: Method call', symbolName);
// 		const symbols = await symbolData;
// 		const symbolItem = symbols.find(({full_name,}) => full_name === symbolName);
// 		if (!symbolItem) {
// 			console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
// 			onResolveErrorCallback('cannot resolve symbol');
// 			return;
// 		}
// 		// Symbol information object
// 		const symbolInfo = {
// 			ticker: symbolItem.full_name,
// 			name: symbolItem.symbol,
// 			description: symbolItem.description,
// 			type: symbolItem.type,
// 			session: '24x7',
// 			timezone: 'Etc/UTC',
// 			exchange: symbolItem.exchange,
// 			minmov: 1,
// 			pricescale: 100,
// // a change monday karvana che  <------------------------------------------>>>>>>
// 			has_intraday: true,
// 			has_no_volume: true,
// 			has_weekly_and_monthly: false,
// 			supported_resolutions: configurationData.supported_resolutions,
// 			volume_precision: 2,
// 			data_status: 'streaming',
// 		};

// 		console.log('[resolveSymbol]: Symbol resolved', symbolName);
// 		onSymbolResolvedCallback(symbolInfo);
// 	},

//     getBars: async (symbolInfo, resolution, periodParams,
// 		 onHistoryCallback, onErrorCallback) => {
//         const { from, to, firstDataRequest } = periodParams;
//         console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
//         const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
//         const urlParameters = {
//             symbl: parsedSymbol.symbol,
// 			exchange: parsedSymbol.exchange,
//         };

//         const query = Object.keys(urlParameters)
//             .map(name => `${encodeURIComponent(urlParameters[name])}`)
// 			let exchange
// 			let filteredData
// 			if (query[1] === 'BSE') {
// 				 filteredData = await fivePaisa.filter(item => (item.Name === `${query[0]}` && item.Exch === "B" && item.Series === 'EQ'))
// 				exchange = 'b'
// 			}
// 			if (query[1] === 'NSE') {
// 				filteredData = await fivePaisa.filter(item => (item.Name === `${query[0]}` && item.Exch === "N" && item.Series === 'EQ'))
// 				exchange = 'n'
// 			}
// 			if (query[1] === 'mcx') {
// 				filteredData = await fivePaisa.filter(item => (item.Name === `${query[0]}` && item.Exch === "M" && item.Series === 'EQ'))
// 				exchange = 'm'
// 			}
//         try {
// 			const filteredData2 = await filteredData[0].ScripCode
//             const data = await axios.get(`https://openapi.5paisa.com/historical/${exchange}/c/${filteredData2}/1m?from=2023-10-01&end=2024-01-04`,{
				
//                 headers: {
//                     'Ocp-Apim-Subscription-Key': OCP_KEY,
//                     'x-clientcode': CLIENT_CODE,
//                     'x-auth-token': AUTH_TOKEN,
//             }, 
//               });

//             const receivedArray = data?.data?.data?.candles;
// 			console.log(receivedArray);
//             const convertedData = receivedArray.map((item) => {
//                 return {
//                     time: Math.floor(new Date(item[0]).getTime() / 1000),
//                     open: item[1],
//                     high: item[2],
// 					low: item[3],
//                     close: item[4],
//                     conversionSymbol: "",
//                     conversionType: "force_direct"
//                 };
//             });
//             if (data.data.status && data.data.data === 'Error' || data?.data?.data?.candles?.length === 0) {
//                 onHistoryCallback([], {
//                     noData: true,
//                 });
//                 return;
//             }
//             let bars = [];
//             convertedData?.forEach(bar => {
//                 if (bar.time >= from && bar.time < to) {

//                     bars = [...bars, {
//                         time: bar.time * 1000,
//                         low: bar.low,
//                         high: bar.high,
//                         open: bar.open,
//                         close: bar.close,
//                     }];
//                 }
//             });
//             if (firstDataRequest) {
//                 lastBarsCache.set(symbolInfo.full_name, {
//                     ...bars[bars.length - 1],
//                 });
//             }
			
//             console.log(`[getBars]: returned ${bars.length} bar(s)`);
//             onHistoryCallback(bars, {
//                 noData: false,
//             });
//         } catch (error) {
//             console.log('[getBars]: Get error', error);
//             onErrorCallback(error);
//         }

//     },
// 	subscribeBars: (symbolInfo,resolution,onRealtimeCallback,subscriberUID,onResetCacheNeededCallback,) => {
// 		console.log({symbolInfo,resolution,onRealtimeCallback,subscriberUID,onResetCacheNeededCallback});
// 		console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
// 		subscribeOnStream(symbolInfo,resolution,onRealtimeCallback,subscriberUID,onResetCacheNeededCallback,lastBarsCache.get(symbolInfo.full_name),
// 		);
// 	},
// 	unsubscribeBars: (subscriberUID) => {
// 		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
// 		unsubscribeFromStream(subscriberUID);
// 	},
// };










// <<-------------------------------------------------------------->

// import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';

// // DatafeedConfiguration implementation
// const configurationData = {
//     // Represents the resolutions for bars supported by your datafeed
//     supported_resolutions: ['1D', '1W', '1M'],
//     // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
//     exchanges: [
//         { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex'},
//         { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},
//     ],
//     // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
//     symbols_types: [
//         { name: 'crypto', value: 'crypto'}
//     ]
// };

// // Obtains all symbols for all exchanges supported by CryptoCompare API
// async function getAllSymbols() {
//     const data = await makeApiRequest('data/v3/all/exchanges');
//     let allSymbols = [];

//     for (const exchange of configurationData.exchanges) {
//         const pairs = data.Data[exchange.value].pairs;

//         for (const leftPairPart of Object.keys(pairs)) {
//             const symbols = pairs[leftPairPart].map(rightPairPart => {
//                 const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
//                 return {
//                     symbol: symbol.short,
//                     full_name: symbol.full,
//                     description: symbol.short,
//                     exchange: exchange.value,
//                     type: 'crypto',
//                 };
//             });
//             allSymbols = [...allSymbols, ...symbols];
//         }
//     }
//     return allSymbols;
// }

// export default {
//     onReady: (callback) => {
//         console.log('[onReady]: Method call');
//         setTimeout(() => callback(configurationData));
//     },

//     searchSymbols: async (
//         userInput,
//         exchange,
//         symbolType,
//         onResultReadyCallback
//     ) => {
//         console.log('[searchSymbols]: Method call');
//         const symbols = await getAllSymbols();

// 		console.log(symbols);
//         const newSymbols = symbols.filter(symbol => {
//             const isExchangeValid = exchange === '' || symbol.exchange === exchange;
//             const isFullSymbolContainsInput = symbol.full_name
//                 .toLowerCase()
//                 .indexOf(userInput.toLowerCase()) !== -1;
//             return isExchangeValid && isFullSymbolContainsInput;
//         });
//         onResultReadyCallback(newSymbols);
//     },

//     resolveSymbol: async (
//         symbolName,
//         onSymbolResolvedCallback,
//         onResolveErrorCallback,
//         extension
//     ) => {
//         console.log('[resolveSymbol]: Method call', symbolName);
//         const symbols = await getAllSymbols();
//         const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
//         if (!symbolItem) {
//             console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
//             onResolveErrorCallback('Cannot resolve symbol');
//             return;
//         }
//         // Symbol information object
//         const symbolInfo = {
//             ticker: symbolItem.full_name,
//             name: symbolItem.symbol,
//             description: symbolItem.description,
//             type: symbolItem.type,
//             session: '24x7',
//             timezone: 'Etc/UTC',
//             exchange: symbolItem.exchange,
//             minmov: 1,
//             pricescale: 100,
//             has_intraday: false,
//             visible_plots_set: 'ohlc',
//             has_weekly_and_monthly: false,
//             supported_resolutions: configurationData.supported_resolutions,
//             volume_precision: 2,
//             data_status: 'streaming',
//         };
//         console.log('[resolveSymbol]: Symbol resolved', symbolName);
//         onSymbolResolvedCallback(symbolInfo);
//     },

//     getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
//         const { from, to, firstDataRequest } = periodParams;
//         console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
//         const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
//         const urlParameters = {
//             e: parsedSymbol.exchange,
//             fsym: parsedSymbol.fromSymbol,
//             tsym: parsedSymbol.toSymbol,
//             toTs: to,
//             limit: 2000,
//         };
//         const query = Object.keys(urlParameters)
//             .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
//                 .join('&');
//         try {
//             const data = await makeApiRequest(`data/histoday?${query}`);
//             if (data.Response && data.Response === 'Error' || data.Data.length === 0) {
//                 // "noData" should be set if there is no data in the requested period
//                 onHistoryCallback([], { noData: true });
//                 return;
//             }
//             let bars = [];
//             data.Data.forEach(bar => {
//                 if (bar.time >= from && bar.time < to) {
//                     bars = [...bars, {
//                         time: bar.time * 1000,
//                         low: bar.low,
//                         high: bar.high,
//                         open: bar.open,
//                         close: bar.close,
//                     }];
//                 }
//             });
//             console.log(`[getBars]: returned ${bars.length} bar(s)`);
//             onHistoryCallback(bars, { noData: false });
//         } catch (error) {
//             console.log('[getBars]: Get error', error);
//             onErrorCallback(error);
//         }
//     },

//     subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
//         console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
//     },
//     unsubscribeBars: (subscriberUID) => {
//         console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
//     },
// };


//<----------------------------------------------------------d djkd--------------------------->>


/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/extensions */
import {generateSymbol,parseFullSymbol,} from './helpers.js';
import {subscribeOnStream,unsubscribeFromStream,} from './streaming.js';
import { AUTH_TOKEN,CLIENT_CODE,OCP_KEY,AUTH_TOKEN_USER } from '../../../src/utils/environments';
import axios from '../../../node_modules/axios';
import  {fivePaisa}  from "../stockData.js"

// const targetValue = 'HDFCBANK'; // The value you want to find
// let foundItem = null;
// data.forEach(item => {
//   if (item.Name === targetValue) {
//     foundItem = item;
//   }
// });

// if (foundItem) {
//   console.log('Found item:', foundItem);
// } else {
//   console.log('Item not found.');
// }

// Use it to keep a record of the most recent bar on the chart
const lastBarsCache = new Map();

let configurationData = {
    // Represents the resolutions for bars supported by your datafeed
	supported_resolutions: ['1','5','15','30','60','120','240','D','W','M'],
    // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
    exchanges: [],
    // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
    symbols_types: [],
};
// Obtains all symbols for all exchanges supported by CryptoCompare API

// const apiUrl = `http://localhost:3336/api/user/exchange-list`;
// const headers = {

//   'Authorization': `Bearer ${AUTH_TOKEN_USER}`,
// };

// axios.get(apiUrl, { headers })
//   .then(response => {
//     // Handle the successful response
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     if (error.request) {
//       // The request was made, but no response was received
//       console.error('No response received. The request was made but got no response.');
//       console.error('Config:', error.config);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error:', error.message);
//     }
//   });

const myData = {
	 data :[
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "IRCTC",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "KOTAKBANK",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "AXISBANK",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "SBILIFE",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "HDFCLIFE",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "INFY",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "TECHM",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "LTTS",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "RELIANCE",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "ATGL",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "BAJFINANCE",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "HINDUNILVR",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			_id: "658aa1cfd1e67a225ba585b7",
			name: "MARUTI",
			Series: "EQUITY",
			exchange: {
				_id: "658aa0c6d1e67a225ba5856f",
				name: "NSE",
				isActive: true
			}
		},
		{
			"_id": "658aa1d5d1e67a225ba585bb",
			"name": "HDFCBANK",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa0c6d1e67a225ba5856f",
				"name": "NSE",
				"isActive": true
			}
		},
		
			// <<-------------------------------------------------->>
		// COMDITY IS NOT ADDED INTO SHEET
		{
			"_id": "658be1178137cec46a0e88d7",
			"name": "NATURALGAS-I",
			"Series": "FUTURE",
			"exchange": {
				"_id": "658aa12bd1e67a225ba5858c",
				"name": "MCX",
				"isActive": true
			}
		},
		{
			"_id": "658d12fa38c313fd6852c25b",
			"name": "GOLD-I",
			"Series": "FUTURE",
			"exchange": {
				"_id": "658aa12bd1e67a225ba5858c",
				"name": "MCX",
				"isActive": true
			}
		},
		{
			"_id": "658d12fa38c313fd6852c25b",
			"name": "SILVER-I",
			"Series": "FUTURE",
			"exchange": {
				"_id": "658aa12bd1e67a225ba5858c",
				"name": "MCX",
				"isActive": true
			}
		},
	// <<-------------------------------------------------->>
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "WIPRO",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "TCS",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "HCLTECH",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "ABB",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "ATUL",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "BALRAMCHIN",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "BEL",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "CHAMBLFERT",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "EXIDEIND",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "CIPLA",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "DABUR",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "TITAN",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "SAIL",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "IDBI",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "DRREDDY",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "HEROMOTOCO",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "HFCL",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
		{
			"_id": "658aa1f2d1e67a225ba585c7",
			"name": "MRF",
			"Series": "EQUITY",
			"exchange": {
				"_id": "658aa134d1e67a225ba58597",
				"name": "BSE",
				"isActive": true
			}
		},
			// <<-------------------------------------------------->>
		// SECTOR IS NOT ADDED INTO SHEET
		{
			"_id": "658aa22ed1e67a225ba585df",
			"name": "FINNIFTY",
			"Series": "INDEX",
			"exchange": {
				"_id": "658aa13fd1e67a225ba585a2",
				"name": "FNO",
				"isActive": true
			}
		},
		{
			"_id": "658aa22ed1e67a225ba585df",
			"name": "NIFTY",
			"Series": "INDEX",
			"exchange": {
				"_id": "658aa13fd1e67a225ba585a2",
				"name": "FNO",
				"isActive": true
			}
		},
		{
			"_id": "658aa22ed1e67a225ba585df",
			"name": "BANKNIFTY",
			"Series": "INDEX",
			"exchange": {
				"_id": "658aa13fd1e67a225ba585a2",
				"name": "FNO",
				"isActive": true
			}
		}
	]}
let Dummyexchanges =  []
	for (const Details of myData.data) {
				const exchange = {
					name: Details?.exchange?.name,
					value: Details?.exchange?.name,
					desc: `${Details?.exchange?.name}`,
				};
				Dummyexchanges.push(exchange);
				const symbols = {
					name: Details?.name,
					value: Details?.name,
				};
				configurationData.symbols_types.push(symbols);
			}
const uniqueExchanges =  [...new Map(Dummyexchanges.map(item => [item['value'], item])).values()];
 configurationData.exchanges.push(...uniqueExchanges);

	let symbolData = [];
	for (const Details of myData.data) {
		const symbol = generateSymbol(Details?.exchange?.name, Details?.name);
		// console.log("sadasdasdsadsadsad",Details);
				const newData = {
					symbol: Details?.name,
					full_name: `${Details?.name}/${Details?.exchange?.name}`,
					description: Details?.name,
					exchange: Details?.exchange?.name,
					type: `${Details?.Series}`,
				};
				 symbolData.push(newData);
	}

	console.log({symbolData});

export default  {
	onReady:async  (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call');
		const symbols = await symbolData;
		const newSymbols = symbols.filter(symbol => {
			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
			const isFullSymbolContainsInput = symbol.full_name
			.toLowerCase()
			.indexOf(userInput.toLowerCase()) !== -1;
			return isExchangeValid && isFullSymbolContainsInput;
		});

		// symbolType = symbols.symbol.exchange

		console.log(symbolType);

		console.log("Exchange",exchange);
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
		extension
	) => {
		console.log('[resolveSymbol]: Method call', symbolName);
		const symbols = await symbolData;
		const symbolItem = symbols.find(({full_name,}) => full_name === symbolName);

		// console.log({symbolItem});
		if (!symbolItem) {
			console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		// Symbol information object
		const symbolInfo = {
			ticker: symbolItem.full_name,
			name: symbolItem.symbol,
			description: symbolItem.description,
			type: symbolItem.type,
			session: '24x7',
			timezone: 'Etc/UTC',
			exchange: symbolItem.exchange,
			minmov: 1,
			pricescale: 100,
			has_intraday: false,
			has_no_volume: true,
			has_weekly_and_monthly: false,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 2,
			data_status: 'streaming',
		};

		console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
	},

    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        const { from, to, firstDataRequest } = periodParams;
        console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
        const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
        const urlParameters = {
            symbl: parsedSymbol.symbol,
			exchange: parsedSymbol.exchange,
        };
        const query = Object.keys(urlParameters)
            .map(name => `${encodeURIComponent(urlParameters[name])}`)
			let exchange
			let filteredData
			if (query[1] === 'BSE') {
				 filteredData = await fivePaisa.filter(item => (item.Name === `${query[0]}` && item.Exch === "B" && item.Series === 'EQ'))
				exchange = 'b'
			}
			if (query[1] === 'NSE') {
				filteredData = await fivePaisa.filter(item => (item.Name === `${query[0]}` && item.Exch === "N" && item.Series === 'EQ'))
				exchange = 'n'
			}
			if (query[1] === 'mcx') {
				filteredData = await fivePaisa.filter(item => (item.Name === `${query[0]}` && item.Exch === "M" && item.Series === 'EQ'))
				exchange = 'm'
			}
        try {
			const filteredData2 = await filteredData[0].ScripCode
            const data = await axios.get(`https://openapi.5paisa.com/historical/${exchange}/c/${filteredData2}/1m?from=2023-10-01&end=2024-01-04`,{
                headers: {
                    'Ocp-Apim-Subscription-Key': OCP_KEY,
                    'x-clientcode': CLIENT_CODE,
                    'x-auth-token': AUTH_TOKEN,
            }, 
              });
            const receivedArray = data?.data?.data?.candles;
            const convertedData = receivedArray.map((item) => {
                return {
                    time: Math.floor(new Date(item[0]).getTime() / 1000),
                    open: item[1],
                    high: item[2],
					low: item[3],
                    close: item[4],
                    volumefrom: 5467,
                    volumeto: 9875,
                    conversionSymbol: "",
                    conversionType: "force_direct"
                };
            });
            if (data.data.status && data.data.data === 'Error' || data?.data?.data?.candles?.length === 0) {
                onHistoryCallback([], {
                    noData: true,
                });
                return;
            }
            let bars = [];
            convertedData?.forEach(bar => {
                if (bar.time >= from && bar.time < to) {

                    bars = [...bars, {
                        time: bar.time * 1000,
                        low: bar.low,
                        high: bar.high,
                        open: bar.open,
                        close: bar.close,
                    }];
                }
            });
            if (firstDataRequest) {
                lastBarsCache.set(symbolInfo.full_name, {
                    ...bars[bars.length - 1],
                });
            }
            console.log(`[getBars]: returned ${bars.length} bar(s)`);
            onHistoryCallback(bars, {
                noData: false,
            });
        } catch (error) {
            console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },
	subscribeBars: (symbolInfo,resolution,onRealtimeCallback,subscriberUID,onResetCacheNeededCallback,) => {
		console.log({symbolInfo,resolution,onRealtimeCallback,subscriberUID,onResetCacheNeededCallback});
		console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
		subscribeOnStream(symbolInfo,resolution,onRealtimeCallback,subscriberUID,onResetCacheNeededCallback,lastBarsCache.get(symbolInfo.full_name),
		);
	},
	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};
