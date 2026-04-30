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
	},
]; 