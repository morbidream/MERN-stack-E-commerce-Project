const moment = require('moment')
const {Donation} = require('../models/Donation');

exports.getDonationsByTime = async (req, res) => {
  try {
    let data = [];
    let finalData = [];
    let startDay = moment(req.query.from, 'YYYY-MM-DD').add(1, 'hours');
    let endDate = moment(req.query.from, 'YYYY-MM-DD').add(7, 'days');
    console.log(startDay);

    for (let index = 1; index < 5; index++) {
      data.push({
        startDate: startDay.toDate().toISOString(),
        endDate: endDate.toDate().toISOString()
      });
      startDay = endDate;
      endDate = moment(startDay, 'YYYY-MM-DD').add(7, 'days');
    }

    console.log(data);
    for (let index = 0; index < data.length; index++) {
      const result = await Donation.find({
        createdAt: {
          $gt: new Date(data[index].startDate),
          $lt: new Date(data[index].endDate)
        }
      });
      console.log({ finalData: result.length });
      finalData.push(result.length);
    }

    res.status(200).send(finalData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};