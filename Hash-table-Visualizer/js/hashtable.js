function Block()
{
	this.i = 0;
	this.elements = new Array();

	this.add = function(element)
	{
		this.elements.push(element);
	}

	this.delete = function(element)
	{
		var temp = this.elements.indexOf(element);
		this.elements.splice(temp, 1);
	}
}

function HashTable()
{
	this.i = 0;
	this.blocks = new Array(new Block());

	this.rehash = function(element, divisor, size)
	{
		var index = element % divisor;
		index = index >> (size - this.i); 
		while (this.blocks[index].elements.length == 0)
			index--;
		var block = this.blocks[index];

		block.i += 1; 
		this.blocks[index + 1].i = block.i;
		for (var i = 0; i < block.elements.length; i++)
		{
			var temp = (block.elements[i] % divisor) >> (size - block.i);
			if (temp != index)
			{
				this.blocks[index + 1].add(block.elements[i]);
				block.delete(block.elements[i]);
				i--;
			}
		}
	}

	this.add = function(element)
	{
		var bSize = document.getElementById("bucketsize").value;
		var divisor = document.getElementById("functiondivisor").value;
		var size = Math.ceil(Math.log(divisor)/Math.log(2));

		var index = element % divisor;
		var block = this.blocks[index >> (size - this.i)];

		if (block.elements.length == bSize && block.i == this.i)
		{
			this.i += 1;
			for (var i = 1; i < Math.pow(2, this.i); i += 2)
				this.blocks.splice(i, 0, new Block());

			this.rehash(element, divisor, size);
			this.add(element);
			return;
		}
		else if (block.elements.length == bSize && block.i < this.i)
		{
			this.rehash(element, divisor, size);
			this.add(element);
			return;
		}

		if (block.elements.length < bSize)
			block.add(element);
	}

	this.delete = function(element)
	{
		var bSize = document.getElementById("bucketsize").value;
		var divisor = document.getElementById("functiondivisor").value;
		var size = Math.ceil(Math.log(divisor)/Math.log(2));

		var index = element % divisor;
		index = index >> (size - this.i); 
		while (this.blocks[index].elements.length == 0)
			index--;
		var block = this.blocks[index];
		block.delete(element);
	}
}