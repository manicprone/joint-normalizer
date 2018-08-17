import { expect } from 'chai';
import Normalizer from '../../src';
import payloads from '../scenarios/payloads/json-api';

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
      const attrsSnake = snakeN.normalizeBaseAttributes(payloads.item_snake.data);
      // kebab to kebab
      const attrsKebab = kebabN.normalizeBaseAttributes(payloads.item_kebab.data);
      // camel to camel
      const attrsCamel = camelN.normalizeBaseAttributes(payloads.item_camel.data);

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

      const attrsKebabToSnake = kebabToSnakeN.normalizeBaseAttributes(payloads.item_kebab.data);
      const attrsSnakeToCamel = snakeToCamelN.normalizeBaseAttributes(payloads.item_snake.data);
      const attrsCamelToSnake = camelToSnakeN.normalizeBaseAttributes(payloads.item_camel.data);

      expect(attrsKebabToSnake).to.deep.equal(itemAsSnake);
      expect(attrsSnakeToCamel).to.deep.equal(itemAsCamel);
      expect(attrsCamelToSnake).to.deep.equal(itemAsSnake);
    });
  });

}); // END - NORMALIZE (json-api)
