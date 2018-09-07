function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    var numStr = input.split(/[A-Za-z]/)[0];
    if (numStr === '') {
      return 1;
    }
    var numStrs = numStr.split('/');
    if (numStrs.length > 2) {
      return 'invalid number';
    }
    result = numStrs.length === 1 ? Number(numStrs[0]) : numStrs[0] / numStrs[1];
    if (Number.isNaN(result)) {
      return 'invalid number';
    }
    return result;
  };
  
  this.getUnit = function(input) {
    var units = ['gal','l','mi','km','lbs','kg'];
    var unitStartIndex = input.search(/[A-Za-z]/);
    if (unitStartIndex === -1) {
      return 'invalid unit';
    }
    var unit = input.slice(unitStartIndex);
    if (!units.includes(unit.toLowerCase())) {
      return 'invalid unit';
    }
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    var returnUnits = {
      gal: 'l',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
    return returnUnits[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    var spellOutUnits = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };
    return spellOutUnits[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    var convertFactors = {
      gal: 3.78541,
      l: 0.264172,
      mi: 1.60934,
      km: 0.621371,
      lbs: 0.453592,
      kg: 2.20462,
    }
    var returnNum = initNum * convertFactors[initUnit.toLowerCase()];
    // round to 5 decimal places (if necessary)
    return +(Math.round(returnNum + 'e+5') + 'e-5');
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ` +
     `${this.convert(initNum, initUnit)} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
