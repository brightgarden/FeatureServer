const should = require('should') // eslint-disable-line
const defaultServerMetadata = require('../../../lib/defaults/server-metadata')

describe('server metadata defaults', () => {
  it('defaults should have expected values', () => {
    defaultServerMetadata.should.deepEqual({
      currentVersion: 10.51,
      fullVersion: '10.5.1',
      serviceDescription: 'This is a feature service exposed with Koop, an open source project that turns APIs into features. Service Description information may not be available for all services. For more information, check out https://github.com/koopjs/koop.',
      hasVersionedData: false,
      supportsDisconnectedEditing: false,
      supportsRelationshipsResource: false,
      supportedQueryFormats: 'JSON',
      maxRecordCount: 2000,
      hasStaticData: false,
      capabilities: 'Query',
      description: 'This is a feature service exposed with Koop, an open source project that turns APIs into features. Service Description information may not be available for all services. For more information, check out https://github.com/koopjs/koop.',
      copyrightText: 'Copyright information varies from provider to provider, for more information please contact the source of this data',
      spatialReference: {
        wkid: 4326,
        latestWkid: 4326
      },
      initialExtent: {
        xmin: -180,
        ymin: -90,
        xmax: 180,
        ymax: 90,
        spatialReference: {
          wkid: 4326,
          latestWkid: 4326
        }
      },
      fullExtent: {
        xmin: -180,
        ymin: -90,
        xmax: 180,
        ymax: 90,
        spatialReference: {
          wkid: 4326,
          latestWkid: 4326
        }
      },
      allowGeometryUpdates: false,
      units: 'esriDecimalDegrees',
      syncEnabled: false,
      layers: [],
      tables: []
    })
  })
})
