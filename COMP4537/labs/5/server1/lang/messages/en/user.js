export const MESSAGES = {
    insertButtontext: "Insert Test Rows",
    submitButtonText: "Submit",
    missingQuery: "Please enter a query",
    noMessage:'No Message',
    successFullInsert: 'Rows inserted successfully!',
    successfullQuery: 'Query executed successfully!',
    rowsAffected: "Rows affected",
    serverMessage: "Full Server Response:",
    illegalQuery: "Query must begin with SELECT or INSERT",
    noDataMessage: 'No data available',
    httpError: `HTTP error! status: %STATUS%`,
    error: 'Error:',
    errorDetails: '%ERROR%',
};

export const QUERIES = {
    insertQuery: `INSERT INTO patient (name, age, date) VALUES
    ('Sara Brown', '121', '1901-01-01'),
    ('John Smith', '83', '1941-01-01'),
    ('Jack Ma', '63', '1961-01-30'),
    ('Elon Musk', '25', '1999-01-01')`,
};