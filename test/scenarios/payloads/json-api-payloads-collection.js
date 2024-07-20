
export default {
  // ---------------------------------------------------------------------------
  // Collection Payload with 1 Association
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // Collection Payload with a Nested Association
  // ---------------------------------------------------------------------------
  collection_with_nested_assoc: {
    data: [
      {
        type: 'RegionTag',
        id: '10fe8d69-3b63-48cb-be70-0aea5d494a75',
        attributes: {
          label: 'Hyde Park',
          url_alias: 'hyde-park',
          tag_code: 'subdivision',
          description: null,
          settings: {},
          organization_id: '0ac9f27e-a57d-41ef-877b-307756aea887',
          created_at: '2024-07-19T07:00:20.154Z',
          updated_at: '2024-07-19T07:00:20.154Z'
        },
        relationships: {
          associated_groups: {
            data: [
              {
                type: 'Group',
                id: '1ef198fa-0e33-4f59-91a0-31404a14525e'
              },
              {
                type: 'Group',
                id: 'e4c9ba49-8907-42f9-ae78-2c6774f0e61d'
              }
            ]
          }
        }
      },
      {
        type: 'RegionTag',
        id: '1b7b34c7-3cb0-4ad8-9940-53ce6d886482',
        attributes: {
          label: 'North Montrose',
          url_alias: 'north-montrose',
          tag_code: 'subdivision',
          description: null,
          settings: {},
          organization_id: '0ac9f27e-a57d-41ef-877b-307756aea887',
          created_at: '2024-07-19T07:42:59.722Z',
          updated_at: '2024-07-19T07:42:59.722Z'
        },
        relationships: {
          associated_groups: {
            data: []
          }
        }
      }
    ],
    meta: {
      total_items: 2
    },
    included: [
      {
        type: 'PickupLocation',
        id: '12b11cce-eca6-4187-9135-ec05d6eb00ac',
        attributes: {
          customer_id: 'af83f2e0-2dc1-4636-8bb1-85206b576ba7',
          name: 'Morty Smith',
          comments: 'Will leave bucket by front gate',
          coords: {
            latitude: 29.750077,
            longitude: -95.403289
          },
          pickup_day: 'Monday',
          street1: '1912 Complex Rd',
          street2: null,
          city: 'Houston',
          state: 'TX',
          zip: '77019',
          created_at: '2022-02-02T02:08:21.747Z',
          updated_at: '2023-11-23T02:44:29.277Z',
          map_display: true,
          location_code: 'ACTIVE',
          org_url_alias: 'montrose',
          group_id: '1ef198fa-0e33-4f59-91a0-31404a14525e',
          last_paused_at: null,
          registered_at: null,
          moved_at: null
        }
      },
      {
        type: 'PickupLocation',
        id: 'd965d27c-3bef-478e-8a0f-b2a4b0c69a08',
        attributes: {
          customer_id: 'c79200c1-2d51-494e-96ab-86bdec3d2a60',
          name: 'Rick Sanchez',
          comments: 'It will appear when you arrive',
          coords: {
            latitude: 29.74984,
            longitude: -95.403245
          },
          pickup_day: 'Tuesday',
          street1: '1104 Park St',
          street2: null,
          city: 'Houston',
          state: 'TX',
          zip: '77019',
          last_activated_at: null,
          last_cancelled_at: null,
          created_at: '2022-02-02T02:08:23.592Z',
          updated_at: '2023-11-23T03:33:34.994Z',
          map_display: true,
          group_url_alias: '002',
          location_code: 'ACTIVE',
          org_url_alias: 'montrose',
          group_id: 'e4c9ba49-8907-42f9-ae78-2c6774f0e61d',
          last_paused_at: null,
          registered_at: null,
          moved_at: null
        }
      },
      {
        type: 'Group',
        id: '1ef198fa-0e33-4f59-91a0-31404a14525e',
        attributes: {
          status: 'active',
          cust_type: 'RP',
          name: 'Morty Smith',
          url_alias: '001',
          org_url_alias: 'montrose',
          group_type: 'communitylocation',
          total_bins: 2,
          settings: null,
          created_at: '2021-10-19T20:23:55.988Z',
          updated_at: '2024-03-10T21:04:45.623Z',
          enable_dashboard: true,
          org_id: '0ac9f27e-a57d-41ef-877b-307756aea887'
        },
        relationships: {
          pickup_location: {
            data: {
              type: 'PickupLocation',
              id: '12b11cce-eca6-4187-9135-ec05d6eb00ac'
            }
          }
        }
      },
      {
        type: 'Group',
        id: 'e4c9ba49-8907-42f9-ae78-2c6774f0e61d',
        attributes: {
          status: 'active',
          cust_type: 'RP',
          name: 'Rick Sanchez',
          url_alias: '002',
          org_url_alias: 'montrose',
          group_type: 'communitylocation',
          total_bins: 2,
          settings: null,
          created_at: '2021-10-19T20:23:56.228Z',
          updated_at: '2023-11-04T05:14:33.726Z',
          enable_dashboard: true,
          org_id: '0ac9f27e-a57d-41ef-877b-307756aea887'
        },
        relationships: {
          pickup_location: {
            data: {
              type: 'PickupLocation',
              id: 'd965d27c-3bef-478e-8a0f-b2a4b0c69a08'
            }
          }
        }
      },
    ]
  }, // END - collection_with_nested_assoc
};
