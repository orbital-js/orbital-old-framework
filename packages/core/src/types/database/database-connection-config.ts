export interface DatabaseConnectionConfig {
    username?: string;
    password?: string;
    hosts: Host[];
    database?: string;
    options?: ConnectionOptions;
}

export interface Host {
    host: string;
    port?: number;
}

export interface ConnectionOptions {

    // Replica Set Option
    replicaSet?: string;

    // Connection Options
    ssl?: boolean;
    connectTimeoutMS?: number;
    socketTimeoutMS?: number;

    // Connection Pool Options
    maxPoolSize?: number;
    minPoolSize?: number;
    maxIdleTimeMS?: number;
    waitQueueMultiple?: number;
    waitQueueTimeoutMS?: number;

    // Write Concern Options
    w?: number | 'majority'; // Tag Set, but I don't know how to implement this. Open Source, baby!
    wtimeoutMS?: number;
    journal?: boolean;

    // readConcern Options
    readConcernLevel?: 'local' | 'majority';

    // Read Preference Options
    readPreference?: 'primary' | 'primaryPrefered' | 'secondary' | 'secondaryPrefered' | 'nearest';
    maxStalenessSeconds?: number;
    readPreferenceTags?: string;

    // Authentication Options
    authSource?: string;
    authMechanism?: 'SCRAM-SHA-1' | 'MONGODB-CR' | 'MONGODB-X509' | 'GSSAPI' | 'PLAIN';
    gssapiServiceName?: string;

    // Server Selection and Discovery Options
    localThresholdMS?: number;
    serverSelectionTimeoutMS?: number;
    serverSelectionTryOnce?: boolean;
    heartbeatFrequencyMS?: number;

    // Miscellaneous Options
    uuidRepresentation?: 'standard' | 'csharpLegacy' | 'javaLegacy' | 'pythonLegacy';

    // In case I missed something
    [key: string]: any;
}