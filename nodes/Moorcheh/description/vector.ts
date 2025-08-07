import { INodeTypeDescription } from 'n8n-workflow';

export const vectorOperations: INodeTypeDescription['properties'] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['vector'],
			},
		},
		options: [
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload vectors to a namespace',
				action: 'Upload vectors to a namespace',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete vectors from a namespace',
				action: 'Delete vectors from a namespace',
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
				resource: ['vector'],
				operation: ['upload'],
			},
		},
		routing: {
			request: {
				url: '={{"/namespaces/" + $value + "/vectors"}}',
				method: 'POST',
			},
		},
	},
	{
		displayName: 'Vectors',
		name: 'vectors',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['vector'],
				operation: ['upload'],
			},
		},
		default: {},
		options: [
			{
				name: 'vector',
				displayName: 'Vector',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Vector',
						name: 'vector',
						type: 'string',
						default: '',
						required: true,
						description: 'Comma-separated vector values (e.g., 0.1,0.2,0.3)',
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '{}',
						description: 'Additional metadata for the vector',
					},
				],
			},
		],
		routing: {
			request: {
				body: {
					vectors: '={{$value && $value.vector ? $value.vector.map(vec => ({id: vec.id, vector: vec.vector.split(",").map(v => parseFloat(v.trim())), ...JSON.parse(vec.metadata || "{}")})) : []}}',
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
				resource: ['vector'],
				operation: ['delete'],
			},
		},
		routing: {
			request: {
				url: '={{"/namespaces/" + $value + "/vectors/delete"}}',
				method: 'POST',
			},
		},
	},
	{
		displayName: 'Vector IDs',
		name: 'vectorIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['vector'],
				operation: ['delete'],
			},
		},
		description: 'Comma-separated list of vector IDs to delete',
		routing: {
			request: {
				body: {
					ids: '={{$value.split(",").map(id => id.trim())}}',
				},
			},
		},
	},
]; 