// Enter a Bitcoin address and query the blockchain.info response to get the received,
// sent and total balance of the specified Bitcoin address.
//
// More information:
// Example 2
// https://www.mobilefish.com/developer/nodejs/nodejs_quickguide_bitcoinjs.html
//
// Disclaimer:
//
// Use this script at your own risk! All information on this page is provided "as is", without any warranty.
// Mobilefish.com will not be liable for any damages, loss of profits or any other kind of loss
// you may sustain by using this script.

var prompt = require('cli-prompt');
var request = require('request');

// Convert 'satoshi' to bitcoin value
var satoshiToBTC = function(value) {
	return value * 0.00000001;
}

prompt('Enter a Bitcoin address: ', function (address) {

	// Query blockchain.info for the address in JSON format
	var url = "https://blockchain.info/address/" + address + "?format=json";

	request(url, function (error, response, body) {
		// Check the results of the HTTP call
		if (!error && response.statusCode == 200) {
			// Parse the JSON results
			var result = JSON.parse(body);
			// Display the results to the console
			// The results are in 'satoshis' and need to be converted to BTC
			console.log('Received: ' + satoshiToBTC(result.total_received));
			console.log('Sent: ' + satoshiToBTC(result.total_sent));
			console.log('Balance: ' + satoshiToBTC(result.final_balance));
		} else {
			// handle the error
			console.log("Unable to find address");
			if (error) console.log("ERROR:", error);
		}
	});
});
