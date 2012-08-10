
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.set('Content-Type', 'text/html');
  // res.send(new Buffer("Sebentar... kita lagi ngecek.."));
  // setTimeout(function() { res.send( new Buffer ("... masih ngecek..")); }, 2000);
  // setTimeout(function() { res.send( new Buffer("... kayanya beneran down nih..")); }, 9000);
  // setTimeout(function() { res.send( new Buffer("... ooppsss, ini terlalu lama..")); }, 15000);
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
		var waktunya = (((new Date().getTime() - waktu_awal) / 1000));
		var stringnya = waktunya + " detik. ";
		if (waktunya > 5) {
			stringnya += " Dan itu sangat lama. Berpotensi servernya down!";
		}
		return stringnya;
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
	  objek_render.waktu = "Request Timed Out. Server down. Unable to retrieve server information of academic.ui.ac.id over SSL.";
	  res.render("index", objek_render);		
	}, 20000);
};