/* eslint-disable @typescript-eslint/return-await */
// Makes requests to CryptoCompare API
export async function makeApiRequest(path) {
	try {

		//AHI THI BAKI CHE
		const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
		// console.log(response);
		return response.json();
	} catch (error) {
		throw new Error(`CryptoCompare request error: ${error.status}`);
	}
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
        short,
        full: `${exchange}:${short}`,
    };
}

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol) {
	const match = fullSymbol.match(/^(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}
	console.log({match	,fullSymbol})

	return {
		symbol: match[1],
		exchange: match[2],match
		// fromSymbol: match[2],
		// toSymbol: match[3],
	};
}


// <---------------------------------------------------------------->


// /* eslint-disable @typescript-eslint/return-await */
// // Makes requests to CryptoCompare API
// export async function makeApiRequest(path) {
// 	try {

// 		//AHI THI BAKI CHE
// 		const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
// 		// console.log(response);
// 		return response.json();
// 	} catch (error) {
// 		throw new Error(`CryptoCompare request error: ${error.status}`);
// 	}
// }

// export function generateSymbol(exchange, symbol) {
// 	return {
// 		full: `${symbol}`,
// 	};
// }

// // Generates a symbol ID from a pair of the coins
// // export function generateSymbol(exchange, fromSymbol, toSymbol) {
// //     const short = `${fromSymbol}/${toSymbol}`;
// //     return {
// //         short,
// //         full: `${exchange}:${short}`,
// //     };
// // }

// // Returns all parts of the symbol
// export function parseFullSymbol(fullSymbol) {
// 	const match = fullSymbol.match(/^(\w+)\/(\w+)$/);
// 	if (!match) {
// 		return null;
// 	}

// 	return {
// 		symbol: match[1],
// 		exchange: match[2],
// 		// fromSymbol: match[2],
// 		// toSymbol: match[3],
// 	};
// }
