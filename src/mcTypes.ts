/**
 * @Author: abbeymart | Abi Akindele | @Created: 2021-05-11
 * @Company: Copyright 2021 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-types - shared mConnect types
 */

import { ResponseMessage } from "@mconnect/mcresponse";

export interface ObjectRefType {
    [key: string]: any;
}

export type ObjectType = ObjectRefType | object;

export type MenuAction = (item: ObjectType) => any

export interface BaseModelType {
    id?: string;
    language?: string;
    description?: string;
    isActive?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    appId?: string;  // application-_id in a multi-hosted apps environment (e.g. cloud-env)
}

export interface GetRecordStats {
    skip?: number;
    limit?: number;
    recordsCount?: number;
    totalRecordsCount?: number;
    expire?: number;
}

export type GetRecords = Array<ObjectType>;

export interface GetResultType {
    records: GetRecords,
    stats: GetRecordStats,
    logRes?: ResponseMessage;
}

export interface ActionParamType {
    [key: string]: any;         // fieldName: fieldValue, must match fieldType (re: validate) in model definition
}

export type ActionParamsType = Array<ActionParamType>;  // documents for create or update task/operation

export interface QueryParamsType {
    [key: string]: any;
}

export interface ProjectParamsType {
    [key: string]: number; // 1 for inclusion and 0 for exclusion
}

export interface SortParamsType {
    [key: string]: number;          // 1 for "asc", -1 for "desc"
}

export interface CrudParamsType {
    token?: string;
    userInfo?: UserInfoType;
    recordIds?: Array<any>;
    actionParams?: ActionParamsType;
    queryParams?: QueryParamsType;
    projectParams?: ProjectParamsType;
    sortParams?: SortParamsType;
    skip?: number;
    limit?: number;
}

export enum CurrencySupported {
    USD = "United States Dollar",
    CAD = "Canadian Dollar",
    FRF = "French Franc",
    NGN = "Nigeria Naira",
    Other = "other",
}

export enum LanguageSupported {
    EnglishUS = "en-US",
    EnglishCanada = "en-CA",
    EnglishUK = "en-UK",
    FrenchFrance = "fr-FR",
    FrenchCanada = "fr-CA",
}

export enum AppEnvironment {
    Development = "Development",
    Test = "Test",
    Production = "Production",
    Live = "Live",
}

export enum ServiceCategory {
    Solution = "Solution",
    Microservice = "Microservice",
    PackageGroup = "Package Group",
    Package = "Package",
    Function = "Function",
    TestCase = "Test case",
    UseCase = "Use case",
    Table = "Table",
    Collection = "Collection",
    Documentation = "Documentation",
    FastLinks = "Fast Links",
    Record = "Record",
    Object = "Object",
}

export interface AppParamsType {
    appId: string;
    accessKey: string;
    appName?: string;
}

export interface AppType {
    id?: string;
    appName?: string;
    accessKey?: string;
    language?: string;
    description?: string;
    isActive?: boolean;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    appCategory?: ServiceCategory,
}

export enum LoginService {
    Custom = "Custom",
    GitHub = "Github",
    Google = "Google",
    Facebook = "Facebook",
    Twitter = "Twitter",
    TwoFactor = "Two Factor",
    Other = "Other",
}

export enum PermittedChangeRequest {
    VerifyRegistration = "verifyRegistration",
    ResetPassword = "resetPassword",
    ChangeEmail = "changeEmail",
    ChangeUsername = "changeUsername",
    GetUsername = "getUsername"
}

// UserInfo type: required for access management
export interface UserInfoType {
    userId?: string;
    firstname?: string;
    lastname?: string;
    language?: string;
    loginName?: string;
    token?: string;
    expire?: number;
    email?: string;
}

// dBase-operation-types
// types
export enum TaskTypes {
    CREATE = "create",
    INSERT = "insert",
    UPDATE = "update",
    READ = "read",
    DELETE = "delete",
    REMOVE = "remove",
}

export interface DbSecureType {
    secureAccess: boolean;
    secureCert?: string;
    secureKey?: string;
}

// export type DbConnectType = Sequelize;

export type DbType = "postgres" | "sqlite" | "mysql" | "mariadb" | "mssql" | undefined;

export interface DbOptionType {
    host?: string;
    username?: string;
    password?: string;
    database?: string;
    filename?: string;
    location?: string;
    port?: number | string;
    dbType?: DbType;
    poolSize?: number;
    secureOption?: DbSecureType;
    uri?: string;
}

export interface DbConfigType {
    [key: string]: DbOptionType;
}

// types
export interface DbSecure {
    secureAccess: boolean;
    secureCert?: string;
    secureKey?: string;
}

export interface DbOption {
    host?: string;
    username?: string;
    password?: string;
    database?: string;
    filename?: string;
    location?: string;
    port?: number | string;
    dbType?: DbType;
    poolSize?: number;
    secureOption?: DbSecure;
    uri?: string;
}

export interface DbConfig {
    [key: string]: DbOption;
}

export interface DB {
    dbType: DbType;
    postgres: DbConfig;
    mongodb: DbConfig;
    redis: DbConfig;
    mysql: DbConfig;
    mariadb: DbConfig;
    mssql: DbConfig;
    sqlite: DbConfig;
}

export interface DbConnectOptions {
    [key: string]: string | number | object | boolean;
}

export interface MongoDbOptions {
    checkAccess?: boolean;
    poolSize?: number;
    reconnectTries?: number;
    reconnectInterval?: number;
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
}

export interface DatabaseType {
    dbType: DbType;
    postgres: DbConfigType;
    mongodb: DbConfigType;
    redis: DbConfigType;
    mysql: DbConfigType;
    mariadb: DbConfigType;
    mssql: DbConfigType;
    sqlite: DbConfigType;
}

export interface RoleServiceResponseType {
    serviceId: string;
    groupId: string;
    serviceCategory: string;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canCrud: boolean;
    tableAccessPermitted?: boolean;
}

export interface CheckAccessType {
    userId: string;
    groupId: string;
    groupIds: Array<string>;
    isActive: boolean;
    isAdmin: boolean;
    roleServices: Array<RoleServiceResponseType>;
    tableId: string;
}

export interface RoleFuncType {
    (it1: string, it2: RoleServiceResponseType): boolean;
}

// Exception/error types
export type SaveError = Error;
export type CreateError = Error;
export type UpdateError = Error;
export type DeleteError = Error;
export type ReadError = Error;
export type AuthError = Error;
export type ConnectError = Error
export type SelectQueryError = Error
export type WhereQueryError = Error
export type CreateQueryError = Error
export type UpdateQueryError = Error
export type DeleteQueryError = Error


// function-types
export interface IPredicate {
    (val: number): boolean;
}

export interface StringPredicate {
    (val: string): boolean;
}

export interface Predicate<T> {
    (val: T): boolean;
}

export interface BinaryPredicate<T, U> {
    (valA: T, valB: U): boolean;
}

export interface UnaryOperator<T> {
    (val: T): T;
}

export interface BinaryOperator<T> {
    (valA: T, valB: T): T;
}

export interface Function<T, R> {
    (val: T): R;
}

export interface BiFunction<T, U, R> {
    (valA: T, valB: U): R;
}

export interface Consumer<T> {
    (val: T): void;
}

export interface BiConsumer<T, U> {
    (valA: T, valB: U): void;
}

export interface Supplier<R> {
    (): R;
}

export interface Comparator<T> {
    (valA: T, valB: T): number;
}

// common types
export interface MessageObject {
    [key: string]: string;
}

export interface ValidateResponseType {
    ok: boolean;
    errors?: MessageObject;
}

export interface OkResponse {
    ok: boolean;
}

export interface EmailUserNameType {
    email: string;
    username: string;
}

export interface ErrorType {
    [key: string]: string;
}

export interface DefaultValueType {
    [key: string]: string;
}
