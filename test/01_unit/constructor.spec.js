import { expect } from 'chai';
import Normalizer from '../../src';
import NormalizerDist from '../../dist/lib';
import models from '../scenarios/models';

describe('CONSTRUCTOR', () => {

  describe('(from code)', () => {
    it('should instantiate the expected default instance', () => {
      const defaultInstance = new Normalizer({});

      expect(defaultInstance).to.include({
        debugInit: false,
        debug: false,
        debugToModel: false,
        payloadSpec: 'json-api',
        fieldForModelType: 'type',
        fromFieldFormat: 'snake',
        toFieldFormat: 'snake',
        models: null,
      });
      expect(defaultInstance.Model).to.be.a('function');
    });

    it('should build the Model factory', () => {
      const jointN = new Normalizer({
        models, // AreaOfInterest, MapConfig, Project
      });

      expect(jointN.Model).to.be.a('function');

      // Instantiate a "Project" model object...
      const Project = jointN.Model('Project');
      const projectInstance = new Project();

      expect(projectInstance.model).to.equal('Project');
      expect(projectInstance).to.have.keys([
        'model',
        'id',
        'name',
        'alias',
        'description',
        'image_url',
        'is_public',
        'owner_id',
      ]);
    });
  });

  describe('(from build distributable)', () => {
    it('should instantiate the expected default instance', () => {
      const defaultInstance = new NormalizerDist({});

      expect(defaultInstance).to.include({
        debugInit: false,
        debug: false,
        debugToModel: false,
        payloadSpec: 'json-api',
        fromFieldFormat: 'snake',
        toFieldFormat: 'snake',
        fieldForModelType: 'type',
        models: null,
      });
      expect(defaultInstance.Model).to.be.a('function');
    });
  });

}); // END - INSTANCE
