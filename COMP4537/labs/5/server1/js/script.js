// This project was created with the assistance of ChatGPT model 3.5
// in editing code and providing feedback

// import {messages} from "COMP4537/lab/5/server1/lang/messages/en/en.js";
import {messages} from "./lang/messages/en/user.js";

const http = require('http');
const url = require('url');
const {MESSAGES, QUERIES} = require('./lang/en/userInfo.js');
const REQUEST_URL = 'https://leewillin.store/lab5/api/v1/sql';

const insertButton = document.getElementById('insertRowsButton');
const sqlQueryInput = document.getElementById('sqlQueryInput');
const submitButton = document.getElementById('submitButton');
const resultTable = document.getElementById('resultTable');

insertButton.addEventListener('click', insertRows);
submitButton.addEventListener('click', handleQuery);

async function insertRows(){
    const query = QUERIES.insertQuery;
}

async function sendPostQuery(){
    
}

async function fetchData(){

}

function displayResponse(){

}

function populateTable(){

}


