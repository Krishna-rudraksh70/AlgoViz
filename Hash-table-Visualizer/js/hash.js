var Elements = new Array();
var predivisor = 0;
var hashTable = new HashTable();

function addElement()
{
	var size = document.getElementById("bucketsize").value;
	if (size == "")
	{
		alert("Bucket Size is required");
		return;
	}
	
	var divisor = document.getElementById("functiondivisor").value;
	if (divisor == "")
	{
		alert("Function divisor is required");
		return;
	}
	
	var element = document.getElementById("element").value;
	if (element == "")
	{
		alert("Element is required");
		return;
	}
	
	if (divisor != predivisor)
	{	
		predivisor = divisor;
		reList();
	}
	if (Elements.indexOf(element) != -1)
		alert("This element has already existed");
	else
	{
		Elements.push(element);
		var table = document.getElementById("elementList");
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = Elements.length;
		cell2.innerHTML = element;
		cell3.innerHTML = element % divisor;
		cell4.innerHTML = pad((element % divisor).toString(2), Math.ceil(Math.log(divisor)/Math.log(2)));
		hashTable.add(element);
		drawTable();
	}
}

function deleteElement()
{
	var size = document.getElementById("bucketsize").value;
	var divisor = document.getElementById("functiondivisor").value;
	var element = document.getElementById("element").value;
	if (element == "")
	{
		alert("Element is required");
		return;
	}
	
	var index = Elements.indexOf(element);
	if (index == -1)
		alert("This element does not exist");
	else
	{
		Elements.splice(index, 1);
		reList();
		hashTable.delete(element);
		drawTable();
	}
	document.getElementById("element").value = "";
}

function clearList()
{
	if (confirm("Are you sure to clear the list? All your input will be lost!"))
	{
		Elements = new Array();
		reList()
		document.getElementById("bucketsize").value = "";
		document.getElementById("functiondivisor").value = "";
		document.getElementById("element").value = "";
		var c=document.getElementById("hashTable");
		c.width = c.width;
		hashTable = new HashTable()
	}
}
function reList()
{
	var table = document.getElementById("elementList");
	while (table.rows.length > 1)
	{
		table.deleteRow(-1);
	}
	var binaryL = Math.ceil(Math.log(predivisor)/Math.log(2));
	for (var i=0; i < Elements.length; i++)
	{
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = i+1;
		cell2.innerHTML = Elements[i];
		cell3.innerHTML = Elements[i] % predivisor;
		cell4.innerHTML = pad((Elements[i] % predivisor).toString(2), binaryL);
	}
}

function drawTable()
{	
	var c=document.getElementById("hashTable");
	c.width = c.width;
	var ctx=c.getContext("2d");

	// size of the index 
	var size = hashTable.i;
	ctx.font = "20px Arial";
	ctx.textAlign="center"; 
	ctx.fillText("i= " + size, 125, 50);

	// draw index box and text 
	for (var i=0; i < Math.pow(2, size); i++)
	{
		ctx.strokeRect(50,100 + 50 * i,150,50);
		ctx.fillText(pad((i).toString(2), size), 125, 130 + 50 * i);
	}

	var blocks = hashTable.blocks.length;
	var bSize = document.getElementById("bucketsize").value; 
	var divisor = document.getElementById("functiondivisor").value;
	// draw the blocks
	var count = -1;
	for (var i = 0; i < blocks; i++)
	{
		if (hashTable.blocks[i].elements.length != 0)
			count ++;
		ctx.moveTo(200, 125 + 50 * i);
		ctx.lineTo(400, 100 + (bSize * 50 + 50) * count);
		ctx.stroke();
		if (hashTable.blocks[i].elements.length != 0)
		{
			for (var j = 0; j < bSize; j++)
			{
				ctx.strokeRect(400, 100 + (bSize * 50 + 50) * count + 50 * j,150,50);
			}

			for (var j = 0; j < hashTable.blocks[i].elements.length; j++)
			{
				var element = hashTable.blocks[i].elements[j];
				var temp = element + "(" + pad((element % divisor).toString(2), Math.ceil(Math.log(divisor)/Math.log(2))) + ")";
				ctx.fillText(temp, 475, 130 + (bSize * 50 + 50) * count + 50 * j);
			}
			ctx.strokeRect(550, 100 + (bSize * 50 + 50) * count, 50,50);
			ctx.fillText(hashTable.blocks[i].i.toString(), 575, 125 + (bSize * 50 + 50) * count)		}
	}
/*
	if (count != blocks)
	{
		for (var j = 0; j < bSize; j++)
		{
			ctx.strokeRect(400, 100 + (bSize * 50 + 50) * count + 50 * j,150,50);
		}
		ctx.strokeRect(550, 100 + (bSize * 50 + 50) * count, 50,50);
		ctx.fillText(0, 575, 125 + (bSize * 50 + 50) * count)
	}*/
}
function pad (str, max) {
  return str.length < max ? pad("0" + str, max) : str;
}