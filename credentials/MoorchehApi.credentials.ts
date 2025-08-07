import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MoorchehApi implements ICredentialType {
	name = 'moorchehApi';
	displayName = 'Moorcheh API';
	documentationUrl = 'https://console.moorcheh.ai/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.moorcheh.ai/v1',
			url: '/namespaces',
			method: 'GET',
		},
	};
} 