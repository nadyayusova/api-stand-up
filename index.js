import http from 'node:http';
import fs from 'node:fs/promises';

const PORT = 8080;
const COMEDIANS = './comedians.json';
const CLIENTS = './clients.json';

const checkFiles = async () => {
  try {
    await fs.access(COMEDIANS);
  } catch (error) {
    console.error(`Файл ${COMEDIANS} не найден!`);
    return false;
  }

  try {
    await fs.access(CLIENTS);
  } catch (error) {
    await fs.writeFile(CLIENTS, JSON.stringify([]));
    console.log(`Файл ${CLIENTS} был создан!`);
  }

  return true;
};

const sendData = (res, data) => {
  res.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(data);
};

const sendError = (res, statusCode, errMessage) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(errMessage);
};

const sendComedian = async (res, segments) => {
  const data = await fs.readFile(COMEDIANS, 'utf-8');

  if (segments.length === 2) {
    const comedian = JSON.parse(data).find((com) => com.id === segments[1]);

    if (!comedian) {
      sendError(res, 404, 'StandUp комик не найден');
      return;
    }

    sendData(res, JSON.stringify(comedian));
    return;
  }

  sendData(res, data);
};

const startServer = async () => {
  if (!(await checkFiles())) {
    return;
  }

  http
    .createServer(async (req, res) => {
      try {
        const segments = req.url.split('/').filter(Boolean);

        if (req.method === 'GET' && segments[0] === 'comedians') {
          sendComedian(res, segments);
          return;
        }

        if (req.method === 'POST' && segments[0] === 'clients') {
          // POST /clients
          // Добавление клиента
        }

        if (req.method === 'GET' && segments[0] === 'clients' && segments.length === 2) {
          // Get /clients/:ticket
          // Получение клиента по номеру билета
        }

        if (req.method === 'PATCH' && segments[0] === 'clients' && segments.length === 2) {
          // PATCH /clients/:ticket
          // Обновление клиента по номеру билета
        }

        sendError(res, 404, 'Not Found');

      } catch (error) {
        sendError(res, 500, `Ошибка сервера: ${error}`);
      }
    })
    .listen(PORT);

  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
};

startServer();
