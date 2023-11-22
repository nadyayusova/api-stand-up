import {sendData, sendError} from './send.js';

export const handleComediansRequest = async (req, res, comedians, id) => {
  if (id) {
    const comedian = comedians.find((com) => com.id === id);

    if (!comedian) {
      sendError(res, 404, 'StandUp комик не найден');
      return;
    }

    sendData(res, comedian);
    return;
  }

  sendData(res, comedians);
};
