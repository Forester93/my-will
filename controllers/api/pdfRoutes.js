const router = require('express').Router();
// const withAuth = require('../utils/auth');
const PDFDocument = require('pdfkit');
const {
	User,
	Executor,
	Beneficiary,
	Asset,
	AssetApportion,
} = require('../../models');

router.get('/:id', async (req, res) => {
	// res.header('Content-Disposition', 'attachment; filename=output.pdf');

	const userData = await User.findOne({
		where: {
			id: req.params.id,
		},
	});

	const executorData = await Executor.findAll({
		where: {
			user_id: req.params.id,
		},
	});

	console.log(userData);

	console.log(executorData);

	const date = new Date();

	var currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

	var fullName = () => {
		if (!userData.getDataValue('middle_name')) {
			return `${userData.getDataValue('first_name')} ${userData.getDataValue(
				'last_name'
			)}`;
		} else {
			return `${userData.getDataValue('first_name')} ${userData.getDataValue(
				'middle_name'
			)} ${userData.getDataValue('last_name')}`;
		}
	};
	var occupation = userData.getDataValue('occupation');

	var address = userData.getDataValue('address');

	const executors = executorData.map((results) => results.dataValues);

	const executorTemplate = () => {
		let executorArray = [];
		for (i = 0; i < executors.length; i++) {
			executorArray.push(
				`Executor #${i + 1}
            
                Name: ${executors[i].name}
                Date of Birth: ${executors[i].DOB}
                Relationship: ${executors[i].relationship}
                Address: ${executors[i].address}
            
            `
			);
		}
		let executorString = executorArray.join('');
		return executorString;
	};

	console.log(executors);
	console.log(executorTemplate);

	// const writePDF = () => {
	const doc = new PDFDocument();

	doc.pipe(res);

	doc.text(
		`Last Will and Testament
        This will dated ${currentDate} is made by me, ${fullName()}, ${occupation}, of ${address}.
    
        Executors
        The following executors will be responsible for the distribution of my assets as directed by this will.
    
        ${executorTemplate()}
        Alternate executors 100
        If the above executors are unavailable, the following alternate executors will take their place.
    
        {alternateExecutors}
    
        Non-monetary gifts
        My non-monetary and non-sentimental possessions will be divided as follows:
    
        gifts}
    
        Monetary gifts
    
        My financial assets will be divided as follows:
    
        {financialAssets}
    
        With the rest of my finances, I pledge to the following charities:
    
        {charityDonations}
    
        Primary Beneficiary
        The following person is to be the primary beneficiary of my estate
    
        {primaryBeneficiary}
    
        Witnesses
    
        The following people have witnessed my signature and initial on each page of this will:
    
        {witnesses}
    
        Declaration
    
        I, {fullName}, declare the above and all included in this document to be my last will and testament.
    
        Signed
    
        {signature}
        `
	);

	doc.end();
	// stream.on('finish', function () {
	// 	// get a blob you can do whatever you like with
	// 	const blob = stream.toBlob('application/pdf');

	// 	// or get a blob URL for display in the browser
	// 	const url = stream.toBlobURL('application/pdf');
	// 	iframe.src = url;
	// });
	console.log('done');
	// };

	// document.getElementById('btn').onclick = writePDF();
});

module.exports = router;
