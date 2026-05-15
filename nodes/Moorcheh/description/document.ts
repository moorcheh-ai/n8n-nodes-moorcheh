import { INodeTypeDescription } from 'n8n-workflow';

export const documentOperations: INodeTypeDescription['properties'] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload documents to a namespace',
				action: 'Upload documents to a namespace',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get documents from a namespace',
				action: 'Get documents from a namespace',
			},
			{
				name: 'Fetch Text Data',
				value: 'fetchTextData',
				description: 'List text/summary chunks from a text-type namespace (max 100 per request)',
				action: 'Fetch text data from a text namespace',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete documents from a namespace',
				action: 'Delete documents from a namespace',
			},
		],
		default: 'upload',
	},
	{
		displayName: 'Namespace Name',
		name: 'namespaceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['upload'],
			},
		},
	},
	{
		displayName: 'Documents',
		name: 'documents',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['upload'],
			},
		},
		default: {},
		options: [
			{
				name: 'document',
				displayName: 'Document',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						required: true,
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '{}',
						description: 'Additional metadata for the document',
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
				resource: ['document'],
				operation: ['delete'],
			},
		},
	},
	{
		displayName: 'Document IDs',
		name: 'documentIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['delete'],
			},
		},
		description: 'Comma-separated list of document IDs to delete',
	},
	{
		displayName: 'Namespace Name',
		name: 'namespaceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Document IDs',
		name: 'documentIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		description: 'Comma-separated list of document IDs to retrieve',
	},
	{
		displayName: 'Namespace Name',
		name: 'namespaceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['fetchTextData'],
			},
		},
		description:
			'Text-type namespace only. Returns up to 100 text/summary chunks per request. Vector-only namespaces are not supported.',
	},
];