var BH1750 = require('../bh1750');
var light = new BH1750();

light.readLight.then((value) => {
    if (err) {
        console.log("light error: " + err);
        throw err;
    } else {
        console.log("light value is: ", value, "lx");
    }
}).catch((err) => {
console.log(err);
});
