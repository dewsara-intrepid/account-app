let accounts = [
    { id: 1, text: 'Account 1', active: false },
    { id: 2, text: 'Account 2', active: true },
  ];
  
  // API Handler
  export default defineEventHandler(async (event) => {
    const method = event.method;
  
    if (method === 'GET') {
        const query = getQuery(event);
        if (query.count) {
          // Return the account count
          return { count: accounts.length };
        }
        // Return the list of accounts
        return accounts;
      }
  
    if (method === 'POST') {
      // Parse the incoming data
      const body = await readBody(event);
  
      // Add a new account
      const newAccount = {
        id: accounts.length + 1,
        text: body.text || 'New account',
        active: false,
      };
      accounts.push(newAccount);
      return newAccount;
    }
  
    if (method === 'PUT') {
      // Parse the incoming data
      const body = await readBody(event);
  
      // Find and update the account
      const account = accounts.find((t) => t.id === body.id);
      if (!account) {
        throw createError({ statusCode: 404, message: 'Account not found' });
      }
      account.text = body.text || account.text;
      account.active = body.active ?? account.active;
  
      return account;
    }
    // If no matching method, return an error
    throw createError({ statusCode: 405, message: 'Method Not Allowed' });
  });
  