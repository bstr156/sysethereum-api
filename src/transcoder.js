//Tools for transcoding data or extracting useful information relevant to Sysethereum processes.

const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

//Convert value to base units
function toBaseUnit(value, decimals) {

    const BN = web3.utils.BN;
    const ten = new BN(10);
    const base = ten.pow(new BN(decimals));
  
    // Is it negative?
    let negative = (value.substring(0, 1) === '-');
    if (negative) {
      value = value.substring(1);
    }
  
    if (value === '.') { 
      console.error(
      `Invalid value ${value} cannot be converted to`
      + ` base unit with ${decimals} decimals.`); 
      return;
    }
  
    // Split it into a whole and fractional part
    let comps = value.split('.');
    if (comps.length > 2) { console.error('Too many decimal points'); return;}
  
    let whole = comps[0], fraction = comps[1];
  
    if (!whole) { whole = '0'; }
    if (!fraction) { fraction = '0'; }
    if (fraction.length > decimals) { 
      console.error('Too many decimal places'); 
      return;
    }
  
    while (fraction.length < decimals) {
      fraction += '0';
    }
  
    whole = new BN(whole);
    fraction = new BN(fraction);
    let wei = (whole.mul(base)).add(fraction);
  
    if (negative) {
      wei = wei.neg();
    }
  
    return new BN(wei.toString(10), 10);

};

//Transcode byte to hex
function byteToHex(b) {
    var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "A", "B", "C", "D", "E", "F"];
    return hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
  };


module.exports ={
    toBaseUnit, byteToHex
};
