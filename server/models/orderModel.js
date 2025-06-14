import moongose from "mongoose";

const orderSchema = new moongose.Schema({
	userId: {
		type: String,
		required: true,
	},
	date: {
		type: Number,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	payment: {
		type: Boolean,
		required: true,
		default: false,
	},
	status: {
		type: String,
		required: true,
		default: "Order Placed",
	},
	items: {
		type: Array,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	address: {
		type: Object,
		required: true,
	}
});

const orderModel =
	moongose.models.order || moongose.model("order", orderSchema);

export default orderModel;
