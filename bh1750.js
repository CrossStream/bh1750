var i2c = require('i2c');

var BH1750 = function (opts) {
    this.options = opts || {
        address: 0x23,
        device: '/dev/i2c-1',
        command: 0x10,
        length: 2
    };
    this.verbose = this.options.verbose || false;
    this.wire = new i2c(this.options.address, {device: this.options.device});
};

BH1750.prototype.readLight = function (cb) {
    var self = this;
    if (!cb) {
        throw new Error("Invalid param");
    }
    self.wire.readBytes(self.options.command, self.options.length, function (err, res) {

        if (err) {
            if (self.verbose)
                console.error("error: I/O failure on BH1750 - command: ", self.options.command);
            return cb(err, null);
        }
        if (Buffer.isBuffer(res)) {
           var hi = res.readUInt8(0);
           var lo = res.readUInt8(1);
        } else {
           var hi = res[0];
           var lo = res[1];
        }

        var lux = ((hi << 8) + lo)/1.2;
        if (self.options.command = 0x11) {
            lux = lux/2;
        }
        cb(null, lux);
    });
};

module.exports = BH1750;
