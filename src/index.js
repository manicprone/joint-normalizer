import objectUtils from './utils/object-utils';
import Collection from './models/Collection';

const logNamespace = '[joint-normalizer]';

/* eslint-disable class-methods-use-this */
export default class JointNormalizer {
  constructor(options) {
    this.debugInit = options.debugInit || false;
    this.debug = options.debug || false;
    this.debugToModel = options.debugToModel || false;
    this.payloadSpec = options.payloadSpec || 'json-api';
    this.fieldForModelType = options.fieldForModelType || 'type';
    this.models = options.models || null;
    this.Model = buildModelFactory(this.models, this.debugInit);
  }

  normalizePayload(payload, asModel = false) {
    let normalizedData = {};

    if (this.debug) {
      console.log(`${logNamespace}`);
      console.log(`${logNamespace} ==================================================== !!!`);
      console.log(`${logNamespace} Joint payload to normalize:`, payload);
    }

    if (payload.data) {
      // ------------------------------------------
      // Build relation data hash for processing...
      // ------------------------------------------
      const relationData = (payload.included)
        ? this.buildRelationDataHash(payload.included, asModel)
        : null;

      // ----------------------------
      // Handle collection payload...
      // ----------------------------
      if (Array.isArray(payload.data)) {
        const collection = {};
        collection.items = [];
        collection.meta = {};

        // Normalize meta data...
        if (payload.meta) {
          // Handle pagination information...
          collection.meta = Object.assign(collection.meta, this.normalizePaginationData(payload.meta));

          // Handle filter information...
          if (payload.meta.filters) {
            collection.meta.filters = this.normalizeFilterData(payload.meta.filters, asModel);
          }
        } // end-if (payload.meta)

        // Normalize each item...
        payload.data.forEach((itemData) => {
          collection.items.push(this.normalizeItem(itemData, relationData, asModel));
        });

        normalizedData = (asModel) ? new Collection(collection) : collection;
      // ----------------------
      // Handle item payload...
      // ----------------------
      } else {
        normalizedData = this.normalizeItem(payload.data, relationData, asModel);
      }
    } else {
      console.error(`${logNamespace} Error: The payload is not a valid package =>`, payload);
    }

    if (this.debug) {
      console.log(`${logNamespace} NORMALIZED =======>`, normalizedData);
      console.log(`${logNamespace} ==================================================== !!!`);
    }

    return normalizedData;
  } // END - normalizePayload

  normalizeItem(itemData, relationData, asModel = false) {
    // Populate base item attributes...
    const item = this.normalizeBaseAttributes(itemData, asModel);

    if (this.debug) console.log(`${logNamespace} Normalizing item data ==>`, itemData);

    // Populate relation data...
    if (itemData.relationships) {
      const relations = itemData.relationships;
      Object.keys(relations).forEach((relationName) => {
        const relationRef = relations[relationName];
        item[this.normalizeRelationName(relationName)] = this.normalizeRelationData(relationName, relationRef, relationData);
      });
    }

    if (this.debug) console.log(`${logNamespace} NORMALIZED ITEM ==>`, item);

    return item;
  } // END - normalizeItem

  normalizeBaseAttributes(itemData, asModel = false) {
    const base = {};

    // Handle base attributes...
    base[this.fieldForModelType] = itemData[this.fieldForModelType];
    base.id = itemData.id;
    if (itemData.attributes) Object.assign(base, itemData.attributes);

    if (asModel) {
      return this.buildModelForItem(base);
    }
    return base;
  } // END - normalizeBaseAttributes

  normalizeRelationData(relationName, relationRef, relationData) {
    let normalized = null;

    if (relationRef.data) {
      // -------------------------------
      // Handle "toMany" relation set...
      // -------------------------------
      if (Array.isArray(relationRef.data)) {
        const relationArray = [];
        for (let i = 0; i < relationRef.data.length; i++) {
          const type = relationRef.data[i][this.fieldForModelType];
          const id = relationRef.data[i].id;

          relationArray.push(relationData[type][id]);
        }

        switch (relationName) {
          // case CONSTANTS.RELATION_NAME_RESERVED_TAGS:
          //   normalized = relationArray[0];
          //   break;
          default: normalized = relationArray;
        }
      // ------------------------------
      // Handle "toOne" relation set...
      // ------------------------------
      } else {
        const type = relationRef.data[this.fieldForModelType];
        const id = relationRef.data.id;

        switch (relationName) {
          default: normalized = relationData[type][id];
        }
      }
    } // end-if (relationRef.data)

    return normalized;
  } // END - normalizeRelationData

  normalizeRelationName(relationName) {
    switch (relationName) {
      default: return relationName;
    }
  } // END - normalizeRelationName

  normalizePaginationData(paginationData) {
    const info = {};

    const hasTotal = objectUtils.has(paginationData, 'total_items');
    const hasLimit = objectUtils.has(paginationData, 'limit');

    if (hasTotal) {
      const total = Number(paginationData.total_items);
      info.total_items = total;

      if (hasLimit) {
        const skipValue = paginationData.skip;
        const limitValue = paginationData.limit;

        const skip = (skipValue) ? Number(skipValue) : 0;
        const limit = Number(limitValue);

        const pageStart = skip || 0;
        const pageSize = limit;
        const pageEnd = pageStart + pageSize;

        // total_items, total_pages, page_size...
        info.total_pages = Math.ceil(total / pageSize);
        info.page_size = pageSize;

        // active page number...
        info.curr_page = (pageStart / pageSize) + 1;

        // prev page info...
        if (pageStart > 0) {
          const prevStart = (pageStart - pageSize >= 0) ? pageStart - pageSize : 0;
          info.prev = { skip: prevStart, limit: pageSize };
        } else {
          info.prev = null;
        }

        // next page info...
        if (pageEnd < total) {
          info.next = { skip: pageEnd, limit: pageSize };
        } else {
          info.next = null;
        }
      } // end-if (hasLimit)

    } // end-if (hasTotal)

    return info;
  } // END - normalizePaginationData

  normalizeFilterData(filterData = [], asModel = false) {
    const info = [];

    filterData.forEach((filterItem) => {
      info.push(this.normalizeItem(filterItem, null, asModel));
    });

    return info;
  } // END - normalizeFilterData

  // --------------------------------------------------
  // Manages all relation data in a hash.
  // The relation data is normalized and then organized
  // into a two-tiered object, so it can be efficiently
  // retrieved when normalizing its base item.
  // --------------------------------------------------
  // The relationHash is grouped by type, then by ID.
  // e.g.
  //
  // hash = {
  //   'user': {
  //     '1': { ... },
  //     '2': { ... },
  //   },
  //   'tag': {
  //     '1': { ... },
  //     '5': { ... },
  //     '9': { ... },
  //   }
  // }
  buildRelationDataHash(relationData, asModel = false) {
    const relationHash = {};

    if (this.debug) console.log(`${logNamespace} Relation Data ==>`, relationData);

    // Iterate all relation data, and build hash...
    if (relationData && Array.isArray(relationData) && relationData.length > 0) {
      for (let i = 0; i < relationData.length; i++) {
        const relationItem = relationData[i];

        // Register type storage on first appearance...
        if (!relationHash[relationItem[this.fieldForModelType]]) {
          relationHash[relationItem[this.fieldForModelType]] = {}; // eslint-disable-line no-param-reassign
        }

        // Populate hash with normalized item data...
        const typeHash = relationHash[relationItem[this.fieldForModelType]];
        if (!typeHash[relationItem.id]) {
          typeHash[relationItem.id] = this.normalizeBaseAttributes(relationItem, asModel);
        }
      } // end-for
    }

    if (this.debug) console.log(`${logNamespace} Relation Hash ==>`, relationHash);

    return relationHash;
  } // END - buildRelationDataHash

  buildModelForItem(itemData) {
    const modelName = itemData[this.fieldForModelType];
    if (this.debugToModel) console.log(`${logNamespace} Building "${modelName}" Model for data =>`, itemData);

    // If cannot resolve model name, just return original data...
    if (!modelName) return itemData;

    // Otherwise, hydrate data into Model object...
    const ModelObject = this.Model(modelName);
    return new ModelObject({ ...itemData });
  } // END - buildModelForItem
}
/* eslint-enable class-methods-use-this */

function buildModelFactory(models = {}, debug = false) {
  if (debug) console.log(`${logNamespace} Building Model factory with models =>`, models);
  return modelName => models[modelName];
}
