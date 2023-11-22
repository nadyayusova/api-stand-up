import {sendData, sendError} from './send.js';
import fs from 'node:fs/promises';
import {CLIENTS} from '../index.js';

export const handleClientsRequest = async (req, res, ticket) => {
  try {
    const clientData = await fs.readFile(CLIENTS, 'utf8');
    const clients = JSON.parse(clientData);

    const client = clients.find((item) => item.ticketNumber === ticket);

    if (!client) {
      sendError(res, 404, `Клиент с номером билета ${ticket} отсутствует`);
      return;
    }

    sendData(res, client);
    return;

  } catch (error) {
    console.log(`Ошибка при обработке запроса: ${error}`);
    sendError(res, 500, 'Ошибка сервера при обработке запроса клиента');
  }
};
