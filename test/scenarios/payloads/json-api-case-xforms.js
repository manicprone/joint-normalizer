
export default {

  // Item (kebab case)
  item_kebab: {
    jsonapi: { version: '1.0' },
    data: {
      type: 'token',
      id: 1,
      attributes: {
        value: 'Q0JVKy9LODZpa0t5TG1YUFhZUWd3Zz09',
        name: 'access_token',
        'expires-at': 1534475682,
        'auto-refresh': false,
        details: {
          'client-id': '112358132134',
          'time-to-live': 5,
        },
      },
    },
  }, // END - item_kebab

  // Item (snake case)
  item_snake: {
    jsonapi: { version: '1.0' },
    data: {
      type: 'token',
      id: 1,
      attributes: {
        value: 'Q0JVKy9LODZpa0t5TG1YUFhZUWd3Zz09',
        name: 'access_token',
        expires_at: 1534475682,
        auto_refresh: false,
        details: {
          client_id: '112358132134',
          time_to_live: 5,
        },
      },
    },
  }, // END - item_snake

  // Item (camel case)
  item_camel: {
    jsonapi: { version: '1.0' },
    data: {
      type: 'token',
      id: 1,
      attributes: {
        value: 'Q0JVKy9LODZpa0t5TG1YUFhZUWd3Zz09',
        name: 'access_token',
        expiresAt: 1534475682,
        autoRefresh: false,
        details: {
          clientId: '112358132134',
          timeToLive: 5,
        },
      },
    },
  }, // END - item_camel

};
