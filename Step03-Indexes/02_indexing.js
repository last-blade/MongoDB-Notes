[
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd0'),
    firstname: 'Prashant',
    lastname: 'Tyagi',
    marks: [ 80, 89, 85, 92 ],
    city: 'Delhi',
    email: 'prashant.tyagi@example.com'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd1'),
    firstname: 'Anjali',
    lastname: 'Mehta',
    marks: [ 75, 88, 90, 82 ],
    city: 'Mumbai',
    email: 'anjali.mehta@example.com'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd2'),
    firstname: 'Rohan',
    lastname: 'Singh',
    marks: [ 65, 70, 68, 72 ],
    city: 'Lucknow',
    email: 'rohan.singh@example.com'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd3'),
    firstname: 'Sneha',
    lastname: 'Patel',
    marks: [ 90, 93, 95, 97 ],
    city: 'Ahmedabad',
    email: 'sneha.patel@example.com'
  },
  {
    _id: ObjectId('682b5b730cd3a7dfdd6c4bd4'),
    firstname: 'Amit',
    lastname: 'Verma',
    marks: [ 55, 60, 58, 62 ],
    city: 'Bangalore',
    email: 'amit.verma@example.com'
  },
  {
    _id: ObjectId('682b5ecf0cd3a7dfdd6c4bd5'),
    firstname: 'Bhandari',
    lastname: 'Singh',
    marks: [ 80, 78, 82, 91 ],
    city: null,
    email: 'bhandari.singh@example.com'
  }
]



//!---------------------------------------------------w/o indexing--------------------------------------------------------------------------

db.user.find({email: 'prashant.tyagi@example.com'}).explain('executionStats');

/*
^--> yeh oopar wale code humein stats batat hai ki iss par humne indexing lagayi hai ki nahin and other details show hoti hain, see below:

^ ek object aaya hai output mein jab oopar wali query chalayenge toh
{
  explainVersion: '1',
  queryPlanner: {
    namespace: 'school.users',
    parsedQuery: { email: { '$eq': 'prashant@example.com' } },
    indexFilterSet: false,
    queryHash: 'ED28E3D2',
    planCacheShapeHash: 'ED28E3D2',
    planCacheKey: '30FCCA9A',
    optimizationTimeMillis: 0,
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
~      stage: 'COLLSCAN',
~      filter: { email: { '$eq': 'prashant@example.com' } },
      direction: 'forward'
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 0,
    executionTimeMillis: 8,
    totalKeysExamined: 0,
~    totalDocsExamined: 6, // total 6 documents hain oopar, and 6 ke 6 documnets hi check kiye gaye hain, isliye 'collscan' ki TC: O(n) hoti hai
    executionStages: {
      isCached: false,
~      stage: 'COLLSCAN', // collscan method use hua hai, jab maine 'prashant.tyagi@example.com' id ko search kiya.
~      filter: { email: { '$eq': 'prashant@example.com' } },
      nReturned: 0,
      executionTimeMillisEstimate: 0,
      works: 7,
      advanced: 0,
      needTime: 6,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
~      docsExamined: 6
    }
  },
  queryShapeHash: '048EA748FB675B3F947BC93B2C57537EE5F20BDADD56480C80C6C18D7A8FEB5E',
  command: {
    find: 'users',
    filter: { email: 'prashant@example.com' },
    '$db': 'school'
  },
  serverInfo: {
    host: 'Prashant',
    port: 27017,
    version: '8.0.9',
    gitVersion: 'f882ef816d531ecfbb593843e4c554fda90ca416'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}





!---------------------------------------------------with indexing--------------------------------------------------------------------------
--> creating indexing for "email" field and 1 is for ascending order to store in B-Tree and -1 for descending order.
~   db.users.createIndex({email: 1})

^ ab fir se search karte hain email or dekhte hain kya output aata hai

~   db.user.find({email: 'prashant.tyagi@example.com'}).explain('executionStats');

^ OUTPUT:
    {
  explainVersion: '1',
  queryPlanner: {
    namespace: 'school.users',
    parsedQuery: { email: { '$eq': 'prashant@example.com' } },
    indexFilterSet: false,
    queryHash: 'ED28E3D2',
    planCacheShapeHash: 'ED28E3D2',
    planCacheKey: '1E950542',
    optimizationTimeMillis: 11,
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
      stage: 'FETCH',
      inputStage: {
~        stage: 'IXSCAN', // 'index-scan' hua hai iss baar
        keyPattern: { email: 1 },
~        indexName: 'email_1',
        isMultiKey: false,
        multiKeyPaths: { email: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: {
          email: [ '["prashant@example.com", "prashant@example.com"]' ]
        }
      }
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 0,
    executionTimeMillis: 22,
    totalKeysExamined: 0,
~    totalDocsExamined: 0,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 0,
      executionTimeMillisEstimate: 11,
      works: 1,
      advanced: 0,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 0,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 0,
        executionTimeMillisEstimate: 11,
        works: 1,
        advanced: 0,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { email: 1 },
        indexName: 'email_1',
        isMultiKey: false,
        multiKeyPaths: { email: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: {
          email: [ '["prashant@example.com", "prashant@example.com"]' ]
        },
        keysExamined: 0,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  queryShapeHash: '048EA748FB675B3F947BC93B2C57537EE5F20BDADD56480C80C6C18D7A8FEB5E',
  command: {
    find: 'users',
    filter: { email: 'prashant@example.com' },
    '$db': 'school'
  },
  serverInfo: {
    host: 'Prashant',
    port: 27017,
    version: '8.0.9',
    gitVersion: 'f882ef816d531ecfbb593843e4c554fda90ca416'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}
*/