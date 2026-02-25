import moment from "moment";

const logTime = () => {
    console.log('time ' + moment().format('HH:mm:ss'));
};

export default logTime;
