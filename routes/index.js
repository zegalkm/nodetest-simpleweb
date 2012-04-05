
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' })
};

exports.form = function(req,res){
	res.render('join-form',{title:'Express'});
};
