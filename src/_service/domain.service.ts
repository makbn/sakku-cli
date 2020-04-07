// External Modules
import { Command } from '@oclif/command';
import axios from 'axios';

// Project Modules
import { domain_url, domain_app_url, domain_record_url } from '../consts/urls';
import { IApp, IAppVO } from '../interfaces/app.interface';
import IServerResult from '../interfaces/server-result.interface';
import { readToken } from '../utils/read-token';
import { common } from '../utils/common';

export const domainService = {
  all,
  app,
  add,
  rm,
  getAllRecord,
  addRecord,
  updateRecord,
  rmRecord
};

function add(ctx: Command, appId: number, data: {}) {
  return axios.post(domain_app_url + appId + '/addDomain', {}, { headers: getHeader(ctx) , params: data})
    .catch((error) => {
      throw common.handleRequestError(error);
    });
}

function all(ctx: Command) {
  return axios.get<IServerResult<IAppVO>>(domain_url , { headers: getHeader(ctx) }).
    catch((error) => {
      throw common.handleRequestError(error);
    });
}

function app(ctx: Command, appId: string) {
  return axios.get<IServerResult<IAppVO>>(domain_app_url + appId, { headers: getHeader(ctx) })
    .catch((error) => {
      throw common.handleRequestError(error);
    });
}

function rm(ctx: Command, appId: number, data: {}) {
  return axios.delete(domain_app_url + appId, { headers: getHeader(ctx) , params: data})
    .catch((error) => {
      throw common.handleRequestError(error);
    });
}

function getAllRecord(ctx: Command, domain: String) {
  return axios.get<IServerResult<IAppVO>>(domain_record_url , { headers: getHeader(ctx) , params: {domain}}).
    catch((error) => {
      throw common.handleRequestError(error);
    });
}

function addRecord(ctx: Command, domain: string, data: {}) {
  console.log(data);
  return axios.post(domain_record_url, data, { headers: getHeader(ctx) , params: {domain}})
    .catch((error) => {
      throw common.handleRequestError(error);
    });
}

function updateRecord(ctx: Command, domain: string, name: string, type: string, data: {}) {
  console.log({domain, name, type});
  console.log(data);
  return axios.put(domain_record_url, data, { headers: getHeader(ctx) , params: {domain, name, type}})
    .catch((error) => {
      throw common.handleRequestError(error);
    });
}

function rmRecord(ctx: Command, data: {}) {
  return axios.delete(domain_record_url , { headers: getHeader(ctx) , params: data})
    .catch((error) => {
      throw common.handleRequestError(error);
    });
}

function getHeader(ctx: Command) {
  return { Authorization: readToken(ctx) };
}