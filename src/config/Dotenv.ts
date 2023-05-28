import * as dotenv from 'dotenv';
import * as path from 'path';

const configPath = path.join(__dirname, '../../.env');

export default {
	config: () => dotenv.config({ path: configPath }),
};