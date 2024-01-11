// /* eslint-disable prefer-destructuring */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable radix */
// /* eslint-disable no-undef */
// /* eslint-disable import/extensions */
// import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
// import { parseFullSymbol } from './helpers.js';

// const socket = io('ws://127.0.0.1:3111');
// const channelToSubscription = new Map();

// socket.on('connect', () => {
//   console.log('[socket] Connected');
// });

// socket.emit('joinRoom', ["IRCTC"]);

// socket.on('disconnect', (reason) => {
//   console.log('[socket] Disconnected:', reason);
// });

// socket.on('error', (error) => {
//   console.log('[socket] Error:', error);
// });

// socket.on('marketWatch', data => {
// //   console.log('[socket] Message:', data);

//   const {
//     Open,
//     High,
//     Low,
//     Close,
//     Exchange,
//     InstrumentIdentifier,
//     LastTradePrice,
//     ServerTime,
//     BuyPrice,
//     SellPrice,
//     PriceChange,
//     PriceChangePercentage
//   } = data;

//   const channelString = `0~${Exchange}~${InstrumentIdentifier}`;
//   const subscriptionItem = channelToSubscription.get(channelString);

//   if (!subscriptionItem) {
//     return;
//   }

//   const lastDailyBar = subscriptionItem.lastDailyBar;
//   const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

//   let bar;
//   console.log(ServerTime);
//   console.log(nextDailyBarTime);

//   if (ServerTime >= nextDailyBarTime) {
//     bar = {
//       time: nextDailyBarTime,
//       open: Open,
//       high: High,
//       low: Low,
//       close: Close,
//     };
//     console.log('[socket] Generate new bar', bar);
//   } else {
//     bar = {
//       ...lastDailyBar,
//       high: Math.max(lastDailyBar.high, High),
//       low: Math.min(lastDailyBar.low, Low),
//       close: Close,
//     };
//     console.log('[socket] Update the latest bar by price', Close);
//   }

//   subscriptionItem.lastDailyBar = bar;

//   // Send data to every subscriber of that symbol
//   subscriptionItem.handlers.forEach(handler => handler.callback(bar));
// });

// function getNextDailyBarTime(barTime) {
//   const date = new Date(barTime * 1000);
//   date.setDate(date.getDate() + 1);
//   return date.getTime() / 1000;
// }

// export function subscribeOnStream(
//   symbolInfo,
//   resolution,
//   onRealtimeCallback,
//   subscriberUID,
//   onResetCacheNeededCallback,
//   lastDailyBar,
// ) {

//   const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
//   const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.symbol}`;
//   const handler = {
//     id: subscriberUID,
//     callback: onRealtimeCallback,
//   };
//   let subscriptionItem = channelToSubscription.get(channelString);

//   if (subscriptionItem) {
//     // Already subscribed to the channel, use the existing subscription
//     subscriptionItem.handlers.push(handler);
//     return;
//   }

//   subscriptionItem = {
//     subscriberUID,
//     resolution,
//     lastDailyBar,
//     handlers: [handler],
//   };
//   console.log(subscriberUID);
//   channelToSubscription.set(channelString, subscriptionItem);

//   console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
//   socket.emit('SubAdd', { subs: [channelString] });
// }

// export function unsubscribeFromStream(subscriberUID) {
//   // Find a subscription with id === subscriberUID
//   for (const [channelString, subscriptionItem] of channelToSubscription) {
//     const handlerIndex = subscriptionItem.handlers
//       .findIndex(handler => handler.id === subscriberUID);

//     if (handlerIndex !== -1) {
//       // Remove from handlers
//       subscriptionItem.handlers.splice(handlerIndex, 1);

//       if (subscriptionItem.handlers.length === 0) {
//         // Unsubscribe from the channel if it was the last handler
//         console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
//         socket.emit('SubRemove', { subs: [channelString] });


//         channelToSubscription.delete(channelString);
//         break;
//       }
//     }
//   }
// }







// //<---------------------------------------------------->


// import { parseFullSymbol } from './helpers.js';

// const socket = io('wss://streamer.cryptocompare.com');

// const channelToSubscription = new Map();

// socket.on('connect', () => {
//     console.log('[socket] Connected');
// });

// socket.on('disconnect', (reason) => {
//     console.log('[socket] Disconnected:', reason);
// });

// socket.on('error', (error) => {
//     console.log('[socket] Error:', error);
// });

// socket.on('m', data => {
//     console.log('[socket] Message:', data);
//     const [
//         eventTypeStr,
//         exchange,
//         fromSymbol,
//         toSymbol,
//         ,
//         ,
//         tradeTimeStr,
//         ,
//         tradePriceStr,
//     ] = data.split('~');

//     if (parseInt(eventTypeStr) !== 0) {
//         // Skip all non-trading events
//         return;
//     }
//     const tradePrice = parseFloat(tradePriceStr);
//     const tradeTime = parseInt(tradeTimeStr);
//     const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;
//     const subscriptionItem = channelToSubscription.get(channelString);
//     if (subscriptionItem === undefined) {
//         return;
//     }
//     const lastDailyBar = subscriptionItem.lastDailyBar;
//     const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

//     let bar;
//     if (tradeTime >= nextDailyBarTime) {
//         bar = {
//             time: nextDailyBarTime,
//             open: tradePrice,
//             high: tradePrice,
//             low: tradePrice,
//             close: tradePrice,
//         };
//         console.log('[socket] Generate new bar', bar);
//     } else {
//         bar = {
//             ...lastDailyBar,
//             high: Math.max(lastDailyBar.high, tradePrice),
//             low: Math.min(lastDailyBar.low, tradePrice),
//             close: tradePrice,
//         };
//         console.log('[socket] Update the latest bar by price', tradePrice);
//     }
//     subscriptionItem.lastDailyBar = bar;

//     // Send data to every subscriber of that symbol
//     subscriptionItem.handlers.forEach(handler => handler.callback(bar));
// });

// function getNextDailyBarTime(barTime) {
//     const date = new Date(barTime * 1000);
//     date.setDate(date.getDate() + 1);
//     return date.getTime() / 1000;
// }

// export function subscribeOnStream(
//     symbolInfo,
//     resolution,
//     onRealtimeCallback,
//     subscriberUID,
//     onResetCacheNeededCallback,
//     lastDailyBar
// )
// {
//     const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
//     const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
//     const handler = {
//         id: subscriberUID,
//         callback: onRealtimeCallback,
//     };
//     let subscriptionItem = channelToSubscription.get(channelString);
//     if (subscriptionItem) {
//         // Already subscribed to the channel, use the existing subscription
//         subscriptionItem.handlers.push(handler);
//         return;
//     }
//     subscriptionItem = {
//         subscriberUID,
//         resolution,
//         lastDailyBar,
//         handlers: [handler],
//     };
//     channelToSubscription.set(channelString, subscriptionItem);
//     console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
//     socket.emit('SubAdd', { subs: [channelString] });
// }

// export function unsubscribeFromStream(subscriberUID) {

//     // Find a subscription with id === subscriberUID
//     for (const channelString of channelToSubscription.keys()) {
//         const subscriptionItem = channelToSubscription.get(channelString);
//         const handlerIndex = subscriptionItem.handlers
//             .findIndex(handler => handler.id === subscriberUID);

//         if (handlerIndex !== -1) {
//             // Remove from handlers
//             subscriptionItem.handlers.splice(handlerIndex, 1);

//             if (subscriptionItem.handlers.length === 0) {
//                 // Unsubscribe from the channel if it is the last handler
//                 console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
//                 socket.emit('SubRemove', { subs: [channelString] });
//                 channelToSubscription.delete(channelString);
//                 break;
//             }
//         }
//     }
// }


// <----------------------------------------2 UPDATED------------------------->>

/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
import { parseFullSymbol } from './helpers.js';


const socket = io('ws://127.0.0.1:3111');
const channelToSubscription = new Map();

socket.on('connect', () => {
	console.log('[socket] Connected');
});

// socket.emit('joinRoom', ["GOLD-I","NATURALGAS-I","SILVER-I","TATASTEEL","HDFCBANK","TCS","SBIN","WIPRO","IRCTC"])
socket.emit('joinRoom', ["IRCTC","TATASTEEL","SILVER-I","COPPER-I","CRUDEOIL-I","NATURALGAS-I"])

socket.on('disconnect', (reason) => {
	console.log('[socket] Disconnected:', reason);
});

socket.on('error', (error) => {
	console.log('[socket] Error:', error);
});

socket.on('marketWatch', data => {
	// console.log('[socket] Message:', data);
	

	// if (parseInt(eventTypeStr) !== 0) {
	// 	// Skip all non-trading events
	// 	return;
	// }

	const tradePrice = parseFloat(data?.LastTradePrice);

//   console.log({tradePrice});
	const tradeTime = parseInt(data?.ServerTime);
//   console.log({tradeTime});
	// const channelString = `0~${data?.Exchange}~${data?.InstrumentIdentifier}`;
	// const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
  const channelString = `0~${data.Exchange}~${data.InstrumentIdentifier}`;
 
  
	const subscriptionItem = channelToSubscription.get(channelString);
//   console.log({subscriptionItem});
  if (subscriptionItem === undefined) {
	return;
}
	const lastDailyBar = subscriptionItem.lastDailyBar;

//   console.log({lastDailyBar});
	const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

	let bar;
	console.log(tradeTime);
	console.log(nextDailyBarTime);

	if (tradeTime >= nextDailyBarTime) {
		bar = {
			time: nextDailyBarTime,
			open: data.Open,
			high: data.High,
			low: data.Low,
			close: data.Close,
		};
		console.log('[socket] Generate new bar', bar);
	} else {
		bar = {
			...lastDailyBar,
			high: Math.max(lastDailyBar.high, tradePrice),
			low: Math.min(lastDailyBar.low, tradePrice),
			close: tradePrice,
		};
		// console.log('[socket] Update the latest bar by price', tradePrice);
	}
	subscriptionItem.lastDailyBar = bar;

	// Send data to every subscriber of that symbol
	subscriptionItem.handlers.forEach(handler => handler.callback(bar));
});

function getNextDailyBarTime(barTime) {
	const date = new Date(barTime * 1000);
	date.setDate(date.getDate() + 1);
	return date.getTime() / 1000;
}

export function subscribeOnStream(
	symbolInfo,
	resolution,
	onRealtimeCallback,
	subscriberUID,
	onResetCacheNeededCallback,
	lastDailyBar,
) {
console.log({symbolInfo});
	const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
	// console.log('Parsed Symbol:', parsedSymbol);
	const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.symbol}`;

	const handler = {
		id: subscriberUID,
		callback: onRealtimeCallback,
	};
	let subscriptionItem = channelToSubscription.get(channelString);
	// console.log('Subscription Item:', subscriptionItem);
	if (subscriptionItem) {
		// Already subscribed to the channel, use the existing subscription
		subscriptionItem.handlers.push(handler);
		return;
	}
	subscriptionItem = {
		subscriberUID,
		resolution,
		lastDailyBar,
		handlers: [handler],
	};
	channelToSubscription.set(channelString, subscriptionItem);
	console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
	socket.emit('SubAdd', { subs: [channelString] });
}

export function unsubscribeFromStream(subscriberUID) {
	// Find a subscription with id === subscriberUID
	for (const channelString of channelToSubscription.keys()) {
		const subscriptionItem = channelToSubscription.get(channelString);
		const handlerIndex = subscriptionItem.handlers
			.findIndex(handler => handler.id === subscriberUID);

		if (handlerIndex !== -1) {
			// Remove from handlers
			subscriptionItem.handlers.splice(handlerIndex, 1);

			if (subscriptionItem.handlers.length === 0) {
				// Unsubscribe from the channel if it was the last handler
				console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
				socket.emit('SubRemove', { subs: [channelString] });
				channelToSubscription.delete(channelString);
				break;
			}
		}
	}
}