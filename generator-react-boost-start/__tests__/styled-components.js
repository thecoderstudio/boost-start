'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');


describe('generator:app', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/docker'))
        .withOptions({
          projectName: "test-react-app",
          destinationRoot: "test-react-app/"
        });
    });

    it('creates files', () => {
      const expected = [
        'Dockerfile'
      ];

      assert.file(expected);
    });

    it('fills Dockerfile with correct information', () => {
      assert.fileContent('Dockerfile', 'RUN mkdir -p test-react-app');
      assert.fileContent('Dockerfile', 'WORKDIR /test-react-app');
    });
  });
});
