const clarifai =  require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c9ea14d2f62c4b8099c02ee0a388fdf4'
});

const handleApiCall = () => (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'))
}



const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'));
}


module.exports = {
	handleImage,
	handleApiCall
}