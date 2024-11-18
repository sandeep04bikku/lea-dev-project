import moment from 'moment'

const Globals = {
  datePickerRanges: {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment()],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'This Year': [moment().startOf('year'), moment().endOf('year')],
    'Last Year': [
      moment().subtract(1, 'year').startOf('year'),
      moment().subtract(1, 'year').endOf('year'),
    ],
  },
  S3_BUCKET_NAME: process.env.REACT_APP_S3_BUCKET_NAME,
  S3_REGION: process.env.REACT_APP_S3_REGION,
  S3_URL: process.env.REACT_APP_S3_URL,
  S3_ACCESS_KEY: process.env.REACT_APP_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY: process.env.REACT_APP_SECRET_ACCESS_KEY,
}
export default Globals
