
export default {

  // Item Base (Item Payload)
  item_base: {
    data: {
      type: 'Organization',
      id: '658e2a55-8f46-46f2-be51-0d2b3ddf0eda',
      attributes: {
        name: 'Org-001',
        url_alias: 'org-001',
        description: 'Description for Org 001',
        logo_url: 'http://some.url',
        org_type: 'university',
        created_at: '2021-02-01T22:51:18.000Z',
        updated_at: '2021-02-01T22:51:18.000Z',
      },
    },
  }, // END - item_base

  // Item with 1 Assoc (Item Payload)
  item_with_one_assoc: {
    data: {
      type: 'Organization',
      id: '7eb61f42-d35c-4fc0-9906-796a2fc0f90f',
      attributes: {
        name: 'Rice University',
        url_alias: 'rice-university',
        description: 'Description for Rice University.',
        logo_url: 'http://some.url.gif',
        org_type: 'university',
        created_at: '2021-02-03T23:12:43.000Z',
        updated_at: '2021-02-03T23:12:43.000Z',
      },
      relationships: {
        groups: {
          data: [
            {
              type: 'Group',
              id: '1b1ded2b-ac8b-4288-8d9a-cddb967ec2db',
            },
            {
              type: 'Group',
              id: '3b3de512-c279-4576-8371-e7a0019b0620',
            },
          ],
        },
      },
    },
    included: [
      {
        type: 'Group',
        id: '1b1ded2b-ac8b-4288-8d9a-cddb967ec2db',
        attributes: {
          name: 'Sid Rich',
          url_alias: 'sid-rich',
          description: null,
          image_url: 'http://some.url',
          group_type: 'college',
          total_members: 23,
          total_bins: 2,
          created_at: '2021-02-03T23:12:43.000Z',
          updated_at: '2021-02-03T23:12:43.000Z',
        },
      },
      {
        type: 'Group',
        id: '3b3de512-c279-4576-8371-e7a0019b0620',
        attributes: {
          name: 'Martell College',
          url_alias: 'martell',
          description: null,
          image_url: 'http://some.url',
          group_type: 'college',
          total_members: 50,
          total_bins: 3,
          created_at: '2021-02-03T23:12:43.000Z',
          updated_at: '2021-02-03T23:12:43.000Z',
        },
      },
    ],
  }, // END - item_with_one_assoc

  // Collection Base (Collection Payload)
  collection_base: {

  }, // END - collection_base

  // Collection with 1 Assoc (Collection Payload)
  collection_with_one_assoc: {
    data: [
      {
        type: 'Organization',
        id: '7eb61f42-d35c-4fc0-9906-796a2fc0f90f',
        attributes: {
          name: 'Rice University',
          url_alias: 'rice-university',
          description: 'Description for Rice University.',
          logo_url: 'http://some.url.gif',
          org_type: 'university',
          created_at: '2021-02-03T23:12:43.000Z',
          updated_at: '2021-02-03T23:12:43.000Z',
        },
        relationships: {
          groups: {
            data: [
              {
                type: 'Group',
                id: '1b1ded2b-ac8b-4288-8d9a-cddb967ec2db',
              },
              {
                type: 'Group',
                id: '3b3de512-c279-4576-8371-e7a0019b0620',
              },
            ],
          },
        },
      },
    ],
    meta: {
      total_items: 1,
    },
    included: [
      {
        type: 'Group',
        id: '1b1ded2b-ac8b-4288-8d9a-cddb967ec2db',
        attributes: {
          name: 'Sid Rich',
          url_alias: 'sid-rich',
          description: null,
          image_url: 'http://some.url',
          group_type: 'college',
          total_members: 23,
          total_bins: 2,
          created_at: '2021-02-03T23:12:43.000Z',
          updated_at: '2021-02-03T23:12:43.000Z',
        },
      },
      {
        type: 'Group',
        id: '3b3de512-c279-4576-8371-e7a0019b0620',
        attributes: {
          name: 'Martell College',
          url_alias: 'martell',
          description: null,
          image_url: 'http://some.url',
          group_type: 'college',
          total_members: 50,
          total_bins: 3,
          created_at: '2021-02-03T23:12:43.000Z',
          updated_at: '2021-02-03T23:12:43.000Z',
        },
      },
    ],
  }, // END - collection_with_one_assoc

};
