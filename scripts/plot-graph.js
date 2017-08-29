
var graph = function(canvasName) {
	this.canvas = document.getElementById(canvasName);
	this.spacing = 0;
	this.clock = false;
	this.blink = false;
	if (this.canvas.height > this.canvas.width) {
		this.spacing = Math.round(0.15*this.canvas.width);
	} else {
		this.spacing = Math.round(0.15*this.canvas.height);
	}
}

graph.prototype.plot = function(i_x, i_y) {
	var ctx = this.canvas.getContext("2d");

	// clear the context with background color
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	ctx.beginPath();
	// background color
	ctx.fillStyle = "#313442";
	ctx.globalAlpha = 0.8;
	ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	ctx.globalAlpha = 1;

	this.fillVisualAid(ctx);
	this.fillGraph(ctx, i_x, i_y);

	this.clock = (!this.clock);
}

graph.prototype.fillVisualAid = function(ctx) {
	ctx.fillStyle = "white";
	ctx.globalAlpha = 0.1;
	var lineNo = 8;
	for (var k = 0; k < lineNo; k++) {
		var coor_y = this.spacing + k * (this.canvas.height - 2 * this.spacing) / (lineNo - 1);
		ctx.fillRect(this.spacing, coor_y, this.canvas.width - 2 * this.spacing, 3);
	}
	ctx.fillStyle = "#313442";
	ctx.globalAlpha = 1;
}

graph.prototype.fillGraph = function(ctx, i_x, i_y) {
	// Scale the graph
	var max_x = i_x.reduce(function(a, b) {
		return Math.max(a, b);
	});
	var min_x = i_x.reduce(function(a, b) {
		return Math.min(a, b);
	});
	var max_y = i_y.reduce(function(a, b) {
		return Math.max(a, b);
	});
	var min_y = i_y.reduce(function(a, b) {
		return Math.min(a, b);
	});

	var len = 0;
	if (i_x.length < i_y.length) {
		len = i_x.length;
	}
	else {
		len = i_y.length;
	}

	if (this.blink) {
		if (this.clock) {
			ctx.fillStyle = "#1cea9e";
			ctx.strokeStyle = "#1cea9e";
		} else {
			ctx.fillStyle = "red";
			ctx.strokeStyle = "red";
		}
	} else {
		ctx.fillStyle = "#1cea9e";
		ctx.strokeStyle = "#1cea9e";
	}
	
	ctx.lineWidth = 1;

	for (var counter = 0; counter < (len - 1); counter++) {
		var u_arg = (i_x[counter] - min_x) * (this.canvas.width - 2 * this.spacing) / (max_x - min_x) + this.spacing;
		var u_arg_next = u_arg = (i_x[counter + 1] - min_x) * (this.canvas.width - 2 * this.spacing) / (max_x - min_x) + this.spacing;
		
		var v_arg = (max_y - i_y[counter]) * (this.canvas.height - 2 * this.spacing) / (max_y - min_y) + this.spacing;
		var v_arg_next = (max_y - i_y[counter + 1]) * (this.canvas.height - 2 * this.spacing) / (max_y - min_y) + this.spacing;

		if (u_arg != u_arg_next ||
			v_arg != v_arg_next) {
			ctx.moveTo(Math.round(u_arg), Math.round(v_arg));
			ctx.lineTo(Math.round(u_arg_next), Math.round(v_arg_next));
		} else {
			ctx.fillRect(u_arg, v_arg, 1, 1);
		}
		ctx.stroke();
	}
	ctx.fillStyle = "#000000";
}




