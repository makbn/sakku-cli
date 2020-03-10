// External Modules
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import * as inquirer from 'inquirer';

// Project Modules
import { networkService } from '../../_service/network.service';
import { messages } from '../../consts/msg';

export default class AddApp extends Command {
  static description = 'network:addApp';

  static examples = [
    `$ sakku network:addApp 
Enter your app id: APP-ID
Enter network name: Network-Name`,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: 'Network Name' }),
    app: flags.integer({ char: 'a', description: 'App Name' }),
  };

  async run() {
    const { args, flags } = this.parse(AddApp);
    let self = this;
    let result: any;
    let appId: number;
    let networkName: string;
    let data = {};

    if (flags.hasOwnProperty('app') && flags.app) {
      appId = flags.app;
    }
    else {
      appId = await cli.prompt(messages.enter_app_id, { required: true });
    }

    if (flags.hasOwnProperty('name') && flags.name) {
      networkName = flags.name;
    }
    else {
      networkName = await cli.prompt(messages.enter_network_name, { required: true });
    }


    data = {
      appId
    }
    try {
      result = await networkService.addApp(self, networkName, data);
      this.log(JSON.stringify(result.data ,null, 2));
    } catch(e) {
      console.log(e);
    }
  }
}