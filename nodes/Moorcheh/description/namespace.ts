import { INodeTypeDescription } from 'n8n-workflow';

export const namespaceOperations: INodeTypeDescription['properties'] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['namespace'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new namespace',
				action: 'Create a new namespace',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all namespaces',
				action: 'List all namespaces',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a namespace',
				action: 'Delete a namespace',
			},
		],
		default: 'list',
	},
	{
		displayName: 'Namespace Name',
		name: 'namespaceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['namespace'],
				operation: ['create'],
			},
		},
		routing: {
			request: {
				url: '/namespaces',
				method: 'POST',
				body: {
					namespace_name: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'Vector',
				value: 'vector',
			},
		],
		default: 'text',
		required: true,
		displayOptions: {
			show: {
				resource: ['namespace'],
				operation: ['create'],
			},
		},
		routing: {
			request: {
				body: {
					type: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Vector Dimension',
		name: 'vectorDimension',
		type: 'number',
		default: 1536,
		displayOptions: {
			show: {
				resource: ['namespace'],
				operation: ['create'],
				type: ['vector'],
			},
		},
		routing: {
			request: {
				body: {
					vector_dimension: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'List Namespaces',
		name: 'listNamespaces',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: false,
		},
		displayOptions: {
			show: {
				resource: ['namespace'],
				operation: ['list'],
			},
		},
		default: {},
		options: [
			{
				name: 'parameters',
				displayName: 'Parameters',
				values: [
					{
						displayName: 'Random String',
						name: 'randomString',
						type: 'string',
						default: 'dummy',
						description: 'Dummy parameter for no-parameter tools',
					},
				],
			},
		],
		routing: {
			request: {
				url: '/namespaces',
				method: 'GET',
			},
		},
	},
	{
		displayName: 'Namespace Name',
		name: 'namespaceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['namespace'],
				operation: ['delete'],
			},
		},
		routing: {
			request: {
				url: '={{"/namespaces/" + $value}}',
				method: 'DELETE',
			},
		},
	},
]; 