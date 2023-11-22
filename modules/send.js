export const sendData = (res, data) => {
  res.writeHead(200, {
    "Content-Type": "application/json; charset=utf8",
    // "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data));
};

export const sendError = (res, statusCode, errMessage) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf8",
  });
  res.end(errMessage);
};
