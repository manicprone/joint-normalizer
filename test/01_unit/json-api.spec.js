import { expect } from 'chai';
import Normalizer from '../../src';
import payloadsCaseXform from '../scenarios/payloads/json-api-case-xforms';
import payloadsCollection from '../scenarios/payloads/json-api-payloads-collection';
import payloadsItem from '../scenarios/payloads/json-api-payloads-item';

const itemAsSnake = {
  type: 'token',
  id: 1,
  value: 'Q0JVKy9LODZpa0t5TG1YUFhZUWd3Zz09',
  name: 'access_token',
  expires_at: 1534475682,
  auto_refresh: false,
  details: {
    client_id: '112358132134',
    time_to_live: 5,
  },
};
const itemAsCamel = {
  type: 'token',
  id: 1,
  value: 'Q0JVKy9LODZpa0t5TG1YUFhZUWd3Zz09',
  name: 'access_token',
  expiresAt: 1534475682,
  autoRefresh: false,
  details: {
    clientId: '112358132134',
    timeToLive: 5,
  },
};
const itemAsKebab = {
  type: 'token',
  id: 1,
  value: 'Q0JVKy9LODZpa0t5TG1YUFhZUWd3Zz09',
  name: 'access_token',
  'expires-at': 1534475682,
  'auto-refresh': false,
  details: {
    'client-id': '112358132134',
    'time-to-live': 5,
  },
};

describe('NORMALIZE (json-api)', () => {

  describe('normalizeBaseAttributes', () => {
    it('should normalize without field transformation when from/to match', () => {
      const snakeN = new Normalizer({
        payloadSpec: 'json-api',
        fromFieldFormat: 'snake',
        toFieldFormat: 'snake',
      });
      const kebabN = new Normalizer({
        payloadSpec: 'json-api',
        fromFieldFormat: 'kebab',
        toFieldFormat: 'kebab',
      });
      const camelN = new Normalizer({
        payloadSpec: 'json-api',
        fromFieldFormat: 'camel',
        toFieldFormat: 'camel',
      });

      // snake to snake
      const attrsSnake = snakeN.normalizeBaseAttributes(payloadsCaseXform.item_snake.data);
      // kebab to kebab
      const attrsKebab = kebabN.normalizeBaseAttributes(payloadsCaseXform.item_kebab.data);
      // camel to camel
      const attrsCamel = camelN.normalizeBaseAttributes(payloadsCaseXform.item_camel.data);

      expect(attrsSnake).to.deep.equal(itemAsSnake);
      expect(attrsKebab).to.deep.equal(itemAsKebab);
      expect(attrsCamel).to.deep.equal(itemAsCamel);
    });

    it('should normalize per the specified transformations', () => {
      const kebabToSnakeN = new Normalizer({
        payloadSpec: 'json-api',
        fromFieldFormat: 'kebab',
        toFieldFormat: 'snake',
      });
      const snakeToCamelN = new Normalizer({
        payloadSpec: 'json-api',
        fromFieldFormat: 'snake',
        toFieldFormat: 'camel',
      });
      const camelToSnakeN = new Normalizer({
        payloadSpec: 'json-api',
        fromFieldFormat: 'camel',
        toFieldFormat: 'snake',
      });

      const attrsKebabToSnake = kebabToSnakeN.normalizeBaseAttributes(payloadsCaseXform.item_kebab.data);
      const attrsSnakeToCamel = snakeToCamelN.normalizeBaseAttributes(payloadsCaseXform.item_snake.data);
      const attrsCamelToSnake = camelToSnakeN.normalizeBaseAttributes(payloadsCaseXform.item_camel.data);

      expect(attrsKebabToSnake).to.deep.equal(itemAsSnake);
      expect(attrsSnakeToCamel).to.deep.equal(itemAsCamel);
      expect(attrsCamelToSnake).to.deep.equal(itemAsSnake);
    });
  });

  describe('normalizePayload', () => {
    it('should normalize a base item payload', () => {
      const normalizer = new Normalizer({
        payloadSpec: 'json-api',
      });

      const normalized = normalizer.normalizePayload(payloadsItem.item_base);

      expect(normalized).to.have.keys([
        'type',
        'id',
        'name',
        'url_alias',
        'description',
        'logo_url',
        'org_type',
        'created_at',
        'updated_at',
      ]);
    });

    it('should normalize an item payload with associations', () => {
      const normalizer = new Normalizer({
        payloadSpec: 'json-api',
      });

      const normalized = normalizer.normalizePayload(payloadsItem.item_with_one_assoc);

      expect(normalized).to.have.keys([
        'type',
        'id',
        'name',
        'url_alias',
        'description',
        'logo_url',
        'org_type',
        'created_at',
        'updated_at',
        'groups',
      ]);

      expect(normalized.groups[0]).to.deep.equal({
        type: payloadsItem.item_with_one_assoc.included[0].type,
        id: payloadsItem.item_with_one_assoc.included[0].id,
        ...payloadsItem.item_with_one_assoc.included[0].attributes
      });
    });

    it('should normalize a collection payload with associations', () => {
      const normalizer = new Normalizer({
        payloadSpec: 'json-api'
      });

      const normalized = normalizer.normalizePayload(payloadsCollection.collection_with_one_assoc);

      expect(normalized).to.have.keys([
        'items',
        'meta'
      ]);

      expect(normalized.meta).to.deep.equal({
        total_items: 1
      });

      expect(normalized.items[0]).to.deep.equal({
        type: payloadsCollection.collection_with_one_assoc.data[0].type,
        id: payloadsCollection.collection_with_one_assoc.data[0].id,
        ...payloadsCollection.collection_with_one_assoc.data[0].attributes,
        groups: [
          {
            type: payloadsCollection.collection_with_one_assoc.included[0].type,
            id: payloadsCollection.collection_with_one_assoc.included[0].id,
            ...payloadsCollection.collection_with_one_assoc.included[0].attributes
          },
          {
            type: payloadsCollection.collection_with_one_assoc.included[1].type,
            id: payloadsCollection.collection_with_one_assoc.included[1].id,
            ...payloadsCollection.collection_with_one_assoc.included[1].attributes
          }
        ]
      });
    });

    it('should normalize a collection payload with nested associations', () => {
      const normalizer = new Normalizer({
        payloadSpec: 'json-api',
        debug: false
      });

      const normalized = normalizer.normalizePayload(payloadsCollection.collection_with_nested_assoc);

      expect(normalized).to.have.keys([
        'items',
        'meta'
      ]);

      expect(normalized.meta).to.deep.equal({
        total_items: 2
      });

      // First item with associated_groups
      expect(normalized.items[0]).to.deep.equal({
        type: payloadsCollection.collection_with_nested_assoc.data[0].type,
        id: payloadsCollection.collection_with_nested_assoc.data[0].id,
        ...payloadsCollection.collection_with_nested_assoc.data[0].attributes,
        associated_groups: [
          {
            type: payloadsCollection.collection_with_nested_assoc.included[2].type,
            id: payloadsCollection.collection_with_nested_assoc.included[2].id,
            ...payloadsCollection.collection_with_nested_assoc.included[2].attributes,
            pickup_location: {
              type: payloadsCollection.collection_with_nested_assoc.included[0].type,
              id: payloadsCollection.collection_with_nested_assoc.included[0].id,
              ...payloadsCollection.collection_with_nested_assoc.included[0].attributes
            }
          },
          {
            type: payloadsCollection.collection_with_nested_assoc.included[3].type,
            id: payloadsCollection.collection_with_nested_assoc.included[3].id,
            ...payloadsCollection.collection_with_nested_assoc.included[3].attributes,
            pickup_location: {
              type: payloadsCollection.collection_with_nested_assoc.included[1].type,
              id: payloadsCollection.collection_with_nested_assoc.included[1].id,
              ...payloadsCollection.collection_with_nested_assoc.included[1].attributes
            }
          }
        ]
      });

      // Second item with no associated_groups
      expect(normalized.items[1]).to.deep.equal({
        type: payloadsCollection.collection_with_nested_assoc.data[1].type,
        id: payloadsCollection.collection_with_nested_assoc.data[1].id,
        ...payloadsCollection.collection_with_nested_assoc.data[1].attributes,
        associated_groups: []
      });
    });
  });

}); // END - NORMALIZE (json-api)
