import { INodeTypeDescription } from 'n8n-workflow';

export const searchOperations: INodeTypeDescription['properties'] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['search'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				description: 'Search across namespaces',
				action: 'Search across namespaces',
			},
		],
		default: 'search',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search'],
			},
		},
		description: 'Text query or comma-separated vector values (e.g., 0.1,0.2,0.3). For vector search, ensure the dimension matches your namespace.',
		routing: {
			request: {
				url: '/search',
				method: 'POST',
				body: {
					query: '={{$value.includes(",") ? $value.split(",").map(v => parseFloat(v.trim())) : $value}}',
				},
			},
		},
	},
	{
		displayName: 'Namespaces',
		name: 'namespaces',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search'],
			},
		},
		description: 'Comma-separated list of namespace names to search in',
		routing: {
			request: {
				body: {
					namespaces: '={{$value.split(",").map(ns => ns.trim())}}',
				},
			},
		},
	},
	{
		displayName: 'Top K',
		name: 'topK',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search'],
			},
		},
		routing: {
			request: {
				body: {
					top_k: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Threshold',
		name: 'threshold',
		type: 'number',
		default: 0.1,
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search'],
				kioskMode: [true],
			},
		},
		routing: {
			request: {
				body: {
					threshold: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Kiosk Mode',
		name: 'kioskMode',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search'],
			},
		},
		routing: {
			request: {
				body: {
					kiosk_mode: '={{$value}}',
				},
			},
		},
	},
]; 