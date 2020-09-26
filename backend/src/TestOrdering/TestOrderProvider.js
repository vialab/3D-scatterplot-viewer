module.exports = {
	GetOrder
};

let currentOrder = 0;

let TestOrders = [
	require("./SampleTestOrder")
];

function GetOrder()
{
	let order = TestOrders[currentOrder++];
	if (currentOrder >= TestOrders.length) currentOrder = 0;
	return order;
}