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
		routing: {
			request: {
				url: '={{"/namespaces/" + $value + "/documents"}}',
				method: 'POST',
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
		routing: {
			request: {
				body: {
					documents: '={{$value && $value.document ? $value.document.map(doc => ({id: doc.id, text: doc.text, ...JSON.parse(doc.metadata || "{}")})) : []}}',
				},
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
				resource: ['document'],
				operation: ['delete'],
			},
		},
		routing: {
			request: {
				url: '={{"/namespaces/" + $value + "/documents/delete"}}',
				method: 'POST',
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
		routing: {
			request: {
				body: {
					ids: '={{$value.split(",").map(id => id.trim())}}',
				},
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
				resource: ['document'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				url: '={{"/namespaces/" + $value + "/documents/get"}}',
				method: 'POST',
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
		routing: {
			request: {
				body: {
					ids: '={{$value.split(",").map(id => id.trim())}}',
				},
			},
		},
	},
]; 