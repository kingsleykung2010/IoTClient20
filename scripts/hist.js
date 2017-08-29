var hist = function(canvasName) {
	this.canvas = document.getElementById(canvasName);
	this.spacing = 0;
	if (this.canvas.height > this.canvas.width) {
		this.spacing = Math.round(0.2*this.canvas.width);
	} else {
		this.spacing = Math.round(0.2*this.canvas.height);
	}
}

// i_list is the list given, based on which we are going to produce another histogram list, histList before plotting
hist.prototype.plot = function(i_list) {
	var ctx = this.canvas.getContext("2d");
	// clear the context
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	ctx.beginPath();
	// background color
	ctx.fillStyle = "#313442";
	ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.fillBarsAndAxis(ctx, i_list);
}

hist.prototype.fillBarsAndAxis = function(ctx, i_list) {
	var histList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	var max_A = i_list.reduce(function(a, b) {
		return Math.max(a, b);
	});
	var min_A = i_list.reduce(function(a, b) {
		return Math.min(a, b);
	});

	for (var i = 0; i < i_list.length; i++) {
		for (var j = 0; j < 10; j++) {
			if ((j / 10 * (max_A - min_A + 1) + min_A) <= i_list[i] &&
				(i_list[i] < ((j + 1) / 10 * (max_A - min_A + 1) + min_A))) {
				histList[j] += 1;
				break;
			}
		}
	}

	this.fillHorizontalAxis(ctx, i_list);
	this.fillVerticalAxis(ctx, i_list);

	for (var it = 0; it < histList.length; it++) {
		var coor_x = this.spacing + (this.canvas.width - 2 * this.spacing) * (4 * it + 1) / 40;
		var coor_y2 = this.canvas.height - this.spacing - histList[it] * (this.canvas.height - 2 * this.spacing) / i_list.length;
		ctx.fillStyle = "#0c355b";
		ctx.fillRect(coor_x, this.spacing, (this.canvas.width - 2 * this.spacing) / 20, this.canvas.height - 2 * this.spacing);
		ctx.fillStyle = "#2cbbf4";
		ctx.fillRect(coor_x, coor_y2, (this.canvas.width - 2 * this.spacing) / 20, histList[it] * (this.canvas.height - 2 * this.spacing) / i_list.length);
		ctx.fillStyle = "#000000";
	}
}

hist.prototype.fillHorizontalAxis = function(ctx, i_list) {
	var translation_x;
	var translation_y = this.canvas.height - Math.round(this.spacing / 2);
	var max_val = i_list.reduce(function(a, b) {
		return Math.max(a, b);
	});
	var min_val = i_list.reduce(function(a, b) {
		return Math.min(a, b);
	});
	
	for (var k = 0; k <= 10; k++) {
		translation_x = Math.round(k * (this.canvas.width - 2 * this.spacing) / 10) + this.spacing;
		ctx.save();
		ctx.translate(Math.round(translation_x),Math.round(translation_y));
		ctx.rotate(67.5/180*Math.PI);
		ctx.textAlign = "center";
		var tmp = k / 10 * (max_val - min_val + 1) + min_val;
		if (max_val < 1000){
			tmp = tmp.toFixed(2);
		} else {
			tmp = Math.round(tmp);
		}
		ctx.fillStyle = "#ffffff";
		ctx.fillText(tmp.toString(), 0, 0);
		ctx.fillStyle = "#000000";
		ctx.restore();
	}
}

hist.prototype.fillVerticalAxis = function(ctx, i_list) {
	var coor_x = Math.round(this.spacing / 2);
	var coor_y;
	for (var k = 0; k <= 4; k++) {
		coor_y = Math.round(k * (this.canvas.height - 2 * this.spacing) / 4) + this.spacing;
		var tmp = Math.round((4 - k) / 4 * i_list.length);
		ctx.textAlign = "center";
		ctx.fillStyle = "#ffffff";
		ctx.fillText(tmp.toString(), coor_x, coor_y);
		ctx.fillStyle = "#000000";
	}
}