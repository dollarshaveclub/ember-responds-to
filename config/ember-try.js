module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          ember: 'release'
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          ember: 'beta'
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          ember: 'canary'
        }
      }
    },
    {
      name: 'ember-1.12',
      bower: {
        dependencies: {
          ember: '1.12.0'
        }
      }
    }
  ]
};
