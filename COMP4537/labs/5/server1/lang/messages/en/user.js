export const MESSAGES = {
    insertButtontext: "Insert Test Rows",
    submitButtonText: "Submit",
    missingQuery: "Please enter a query",
    successfullInsert: 'Rows inserted successfully',
    noDataMessage: '<tr><td>No data available<td><tr>',
    fetchError: `<p style="color:red;">Error: ${error.message}</p>`,
}

export const QUERIES = {
    insertQuery: `INSERT INTO patient (name, birthdate) VALUES
    ('Sara Brown', '1901-01-01'),
    ('John Smith', '1941-01-01'),
    ('Jack Ma', '1961-01-30'),
    ('Elon Musk', '1999-01-01')`,
};