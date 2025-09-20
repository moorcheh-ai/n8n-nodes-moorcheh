import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { namespaceOperations } from './description/namespace';
import { documentOperations } from './description/document';
import { vectorOperations } from './description/vector';
import { searchOperations } from './description/search';
import { answerOperations } from './description/answer';

export class Moorcheh implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Moorcheh',
		name: 'moorcheh',
		icon: 'file:moorcheh.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Moorcheh Vector Store API',
		defaults: {
			name: 'Moorcheh',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'moorchehApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.moorcheh.ai/v1',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Answer',
						value: 'answer',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Namespace',
						value: 'namespace',
					},
					{
						name: 'Search',
						value: 'search',
					},
					{
						name: 'Vector',
						value: 'vector',
					},
				],
				default: 'namespace',
			},
			...namespaceOperations,
			...documentOperations,
			...vectorOperations,
			...searchOperations,
			...answerOperations,
		],
	};
}
