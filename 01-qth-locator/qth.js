function decodeQth(locator) {
	qth_location = [-180.00000,-90.00000];

    const lng_lat_multipliers = [
		[20.00000,10.00000],
		[2.00000,1.00000],
		[0.08333,0.04167]
	];

	multipliers = [];
	
	for (let count = 2; count <= locator.length; count += 2) {
		pair = locator.slice(count-2,count);
		pattern = "";
		alphanumeric = false;
		
		if (count <= 2) {
			pattern = /[A-R]/g;
			alphanumeric = true;
		} else if (count % 4 === 0) {
			pattern = /[0-9]/g;
		} else {
			pattern = /[A-X]/g;
			alphanumeric = true;
		}
		
		if (!pattern.test(pair)) { 
			console.error("Something is wrong with the locator code.");
			return 0;
		}

		let multiplier = []
		for (let position in pair) {
			
			if (alphanumeric) {
				multiplier.push(parseFloat(pair.charCodeAt(position) - 65));
			} else {
				multiplier.push(parseFloat(pair[position]));
			}
		}
		
		multipliers.push(multiplier);
	}

    for (let count = 0; count < multipliers.length; count++) {
		qth_location[0] += multipliers[count][0] * lng_lat_multipliers[count][0];
		qth_location[1] += multipliers[count][1] * lng_lat_multipliers[count][1];
		console.log(qth_location);
	}	

	return qth_location.reverse();	
}

const find_btn = document.getElementById("find_btn");
const results_field = document.getElementById("results");

find_btn.onclick = (event) => {
	let grid_locator = document.querySelector("#grid_locator").value.toUpperCase();
	qth = decodeQth(grid_locator);
	results_field.innerHTML = "<p>Latitude: "+ qth[0] +"</p>\n<p>Longitude: " + qth[1] + "</p>";
	map.setView(qth, 12);
	L.marker(qth).addTo(map);
}
