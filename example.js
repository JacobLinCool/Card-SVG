/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Card } = require("./lib");

const card = new Card().theme("nord").size(400, 200).background("bg1", 10).text("JacobLinCool", "tx1", { x: 20, y: 30 }).export();

console.log(card);
