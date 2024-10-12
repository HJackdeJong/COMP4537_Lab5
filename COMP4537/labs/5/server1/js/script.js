// This project was created with the assistance of ChatGPT model 3.5
// in editing code and providing feedback

// import {messages} from "COMP4537/lab/5/server1/lang/messages/en/en.js";

import { MESSAGES, QUERIES } from "../lang/messages/en/user.js";
const POST_URL = "https://leewillin.store/lab5/api/v1/sql";
const GET_URL = "https://leewillin.store/lab5/api/v1/sql?query=";

const insertButton = document.getElementById("insertRowsButton");
const sqlQueryInput = document.getElementById("sqlQueryInput");
const submitButton = document.getElementById("submitButton");
const resultTable = document.getElementById("resultTable");

insertButton.addEventListener("click", insertRows);
submitButton.addEventListener("click", handleUserQuery);

insertButton.textContent = MESSAGES.insertButtontext;
submitButton.textContent = MESSAGES.submitButtontext;

async function insertRows() {
  const query = QUERIES.insertQuery;

  try {
    const response = await sendQueryPostRequest(POST_URL, query);
    const responseData = await response.json();
    displayResponse(responseData.message || MESSAGES.successfullInsert);
  } catch (error) {
    displayResponse(`Error: ${error.message}`);
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
    await handleInsertQuery(query);
  }
  // else {
  //     displayResponse("Only SELECT and INSERT queries are supported.");
  // }
}

async function handleSelectQuery(query) {
  const encodedQuery = encodeURIComponent(query); 
  const selectUrl = `${GET_URL}${encodedQuery}`;

    await fetchData(selectUrl);
}

async function handleInsertQuery(query) {
  try {
    const response = await sendQueryPostRequest(POST_URL, query);
    const responseData = await response.json();
    displayResponse(responseData.message || "Query executed successfully.");
  } catch (error) {
    displayResponse(`Error: ${error.message}`);
  }
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

    const responseData = await response.json();
    if (responseData.length > 0) {
      populateTable(responseData);
    } else {
      resultTable.innerHTML = MESSAGES.noDataMessage;
    }
} catch (error) {
    const errorMessage = MESSAGES.fetchError.replace('%ERROR%', error.message);
    resultTable.innerHTML = errorMessage;
  }
}

function displayResponse(message) {
  resultTable.innerHTML = message;
}

function populateTable(data) {
  resultTable.innerHTML = "";
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
