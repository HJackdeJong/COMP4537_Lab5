// This project was created with the assistance of ChatGPT model 3.5
// in editing code and providing feedback

import { MESSAGES, QUERIES } from "../lang/messages/en/user.js";
const POST_URL = "https://leewillin.store/lab5/api/v1/sql";
const GET_URL = "https://leewillin.store/lab5/api/v1/sql?query=";

const insertButton = document.getElementById("insertRowsButton");
const sqlQueryInput = document.getElementById("sqlQueryInput");
const submitButton = document.getElementById("submitButton");
const resultTable = document.getElementById("resultTable");
const responseText = document.getElementById("responseText");
const responseMessage = document.getElementById("responseMessage");

insertButton.addEventListener("click", insertRows);
submitButton.addEventListener("click", handleUserQuery);

insertButton.textContent = MESSAGES.insertButtontext;
submitButton.textContent = MESSAGES.submitButtonText;

async function insertRows() {
    const query = QUERIES.insertQuery;
    await processInsertQuery(query);
  }

async function processInsertQuery(query) {
  try {
    const response = await sendQueryPostRequest(POST_URL, query);

    if (!response.ok) {
        throw new Error(MESSAGES.httpError.replace('%STATUS%', response.status));
      }

    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    const responseString =
      typeof responseData === "object"
        ? JSON.stringify(responseData, null, 2)
        : responseData;

    displayResponse(MESSAGES.serverMessage , responseString);
  } catch (error) {
    displayResponse(MESSAGES.error, error.message);
  }
}

async function handleUserQuery() {
  const query = sqlQueryInput.value.trim();

  if (!query) {
    displayResponse(MESSAGES.missingQuery);
    return;
  }

  if (query.toUpperCase().startsWith("SELECT")) {
    await handleSelectQuery(query);
  } else if (query.toUpperCase().startsWith("INSERT")) {
    await processInsertQuery(query);
  } else {
    displayResponse(MESSAGES.illegalQuery);
  }
}

async function handleSelectQuery(query) {
  const encodedQuery = encodeURIComponent(query);
  const selectUrl = `${GET_URL}${encodedQuery}`;

  await fetchData(selectUrl);
}

async function sendQueryPostRequest(url, query) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  });
}

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(MESSAGES.httpError.replace('%STATUS%', response.status));
    }

    const responseData = await response.json();
    if (responseData.length > 0) {
      populateTable(responseData);
    } else {
      displayResponse(MESSAGES.noDataMessage);
    }
  } catch (error) {
    displayResponse(
      MESSAGES.error,
      MESSAGES.errorDetails.replace("%ERROR%", error.message)
    );
  }
}

function displayResponse(text, response = "") {
  clearFields();
  responseText.textContent = text;
  responseMessage.textContent = response;
}

function clearFields() {
  responseText.textContent = "";
  responseMessage.textContent = "";
  resultTable.innerHTML = "";
}

function populateTable(data) {
  clearFields();
  if (!data || data.length === 0) {
    displayResponse(MESSAGES.noDataMessage);
    return;
  }
  const headers = Object.keys(data[0]);

  if (data.length === 0) {
    resultTable.innerHTML = MESSAGES.noDataMessage;
    return;
  }
  let headerRow = "<tr>";
  headers.forEach((header) => {
    headerRow += `<th style="border: 1px solid #ddd; padding: 8px;">${header}</th>`;
  });
  headerRow += "</tr>";
  resultTable.innerHTML += headerRow;

  data.forEach((row) => {
    let dataRow = "<tr>";
    headers.forEach((header) => {
      dataRow += `<td style="border: 1px solid #ddd; padding: 8px;">${row[header]}</td>`;
    });
    dataRow += "</tr>";
    resultTable.innerHTML += dataRow;
  });
}
