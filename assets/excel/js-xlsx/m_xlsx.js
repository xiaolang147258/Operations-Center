var process_wb = (function() {
	var to_json = function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
			if(roa.length) result[sheetName] = roa;
		});
		return JSON.stringify(result, 2, 2);
	};

	return function process_wb(wb,$callback) {
		var output = "";
		output = to_json(wb);  
		$callback(output);
		if(typeof console !== 'undefined') console.log("output", new Date());
	};
})();

var do_file = (function() {
	var xw = function xw(data, cb,$callback) {
		var worker = new Worker(xlsxworker);
		worker.onmessage = function(e) {
			switch(e.data.t) {
				case 'ready': break;
				case 'e': console.error(e.data.d); break;
				case 'xlsx': cb(JSON.parse(e.data.d),$callback); break;
			}
		};
		worker.postMessage({d:data,b: 'binary' });
	};
	return function do_file(files,$callback) {
		var f = files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			if(typeof console !== 'undefined') console.log("onload", new Date() );
			var data = e.target.result;
			xw(data, process_wb,$callback);
		};
		reader.readAsBinaryString(f);
	 
	};
})();


var resolving = function(data){
		data =  JSON.parse(data);
		var keys = [];
		for(var x in data)keys.push(x);
		$json_arr = data[keys[0]];
        $data_json = [];
	    for(var x in $json_arr)
	    {
	    	if($json_arr[x].length>0) $data_json.push($json_arr[x]);
	    }

	    $json = {
	    	title:$data_json[0][0],
	    	org:{
	    		unit:$data_json[1][1],
	    		staff:$data_json[1][4],
	    	},
	    	course:{
	    		title:$data_json[2][1],
	    		category:$data_json[2][4],
	    	},
	    	object:{
	    		title:$data_json[3][1],
	    		class_hour:$data_json[3][4],
	    	},
	    	intro:$data_json[4][1],
	    	target:$data_json[5][1],
	    };
	    $json['unit'] = [];
	    for (var i = 7; true; i++) {
	    	$unit = $data_json[i];
	    	if($unit[0] != null) break;
            $json['unit'].push( {
            	unit:$unit[1],
            	title:$unit[2],
            	target:$unit[3],
            	content:$unit[4],
            });
	    }
	    $json['force'] = $data_json[i];
        i++;
        $json['evaluate'] = $data_json[i];
        i++;
        $json['result'] = $data_json[i];
        return $json;
	   // console.log(JSON.stringify($json));

}


var  resolving_new = function (data) {

	data =  JSON.parse(data);

	var keys = [];
	for(var x in data)keys.push(x);
	$json_arr = data[keys[0]];
	$data_json = [];
	for(var x in $json_arr)
	{
		if($json_arr[x].length>0) $data_json.push($json_arr[x]);
	}

	//console.log($data_json);

	$json = {
		title:$data_json[0][0],
		org:{
			unit:$data_json[1][1],
			staff:$data_json[1][4],
		},
		course:{
			title:$data_json[2][1],
			category:$data_json[2][4],
		},
		object:{
			title:$data_json[3][1],
			class_hour:$data_json[3][4],
		},
		intro:$data_json[4][1],
		target:$data_json[5][1],
	};

	$unit_data = [];
	for (var i = 7; true; i++) {
		 if($data_json[i][0] == null)
		 {
			 $data_json[i].splice(0,1);
			 $unit_data.push($data_json[i]);
		 }else{
		 	break;
		 }
	}

	$unit_data_true = [];

	$unit_one_data = {};


	for(var j = 0 ; j < $unit_data.length ; j++ )
	{
		if($unit_data[j][0] != null)
		{
			if($unit_one_data.unit != undefined )
			{
				$unit_data_true.push($unit_one_data);
			} 
				$unit_one_data = {
					unit:$unit_data[j][0],
					title:$unit_data[j][1],
					content:$unit_data[j][2],
					class:[
	                    {
	                    	season:$unit_data[j][3],
	                    	title:$unit_data[j][4],
	                    	content:$unit_data[j][5],
	                    }
					],
				};
			 

 
		}else{
               $unit_one_data.class.push({
	                    	season:$unit_data[j][3],
	                    	title:$unit_data[j][4],
	                    	content:$unit_data[j][5],
               });
		}


		if(j == $unit_data.length-1)
		{
			$unit_data_true.push($unit_one_data);
		}

	}

 

	$json['force'] = $data_json[i];
	i++;
	$json['evaluate'] = $data_json[i];
	i++;
	$json['result'] = $data_json[i];

 

	 //console.log($unit_data_true);


	$json['unit'] = $unit_data_true;
//	console.log($json);

	return $json;

//	console.log($json);
//	return $json;
}

 