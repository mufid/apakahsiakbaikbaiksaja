
/*
 * GET home page.
 */

exports.index = function(req, res){
  var gagal = {
  	title : "Uuupppsss! Sepertinya semua orang memang gak bisa!",
  	penjelasan : "Sepertinya semua orang kesulitan mengakses SIAK."
  };
  var berhasil = {
  	title : "Yiha!",
  	penjelasan : "SIAK tidak masalah! Coba kamu pindah koneksi, warnet, atau modem kalau memang kamu kesulitan mengakses SIAK."
  };
  var objek_render = {};

  // default: berhasil

	var https = require('https');
	var waktu_awal = new Date().getTime();

	var options = {
	  host: 'academic.ui.ac.id',
	  path: '/'
	};

	var getTimeDiff = function() {
		return (((new Date().getTime() - waktu_awal) / 1000) + " detik");
	}

	var req2 = https.get(options, function(res2) {
	  console.log("statusCode: ", res2.statusCode);
	  console.log("headers: ", res2.headers);

	  res2.on('end', function(d) {
	  	console.log(d);
	  	objek_render = berhasil;
	  	objek_render.waktu = getTimeDiff();
	    res.render("index", objek_render);
	  });
	});


	req2.on('error', function(e) {
	  objek_render = gagal;
	  objek_render.waktu = getTimeDiff();
	  res.render("index", objek_render);
	  console.log(e);
	});

	setTimeout(function() {
	  objek_render = gagal;
	  objek_render.waktu = "Request Timed Out";
	  res.render("index", objek_render);		
	})
};