import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const csvToArray = (csv: string): string[] =>
			csv
				.split(',')
				.map((entry) => entry.trim())
				.filter((entry) => entry.length > 0);

		const safeParseJson = (jsonString: string, itemIndex: number): IDataObject => {
			try {
				return JSON.parse(jsonString || '{}') as IDataObject;
			} catch (error) {
				throw new NodeOperationError(this.getNode(), 'Metadata must be valid JSON', {
					itemIndex,
					description: String(error),
				});
			}
		};

		const moorchehRequest = async (method: 'GET' | 'POST' | 'DELETE', url: string, body?: IDataObject) =>
			this.helpers.httpRequestWithAuthentication.call(this, 'moorchehApi', {
				method,
				url: `https://api.moorcheh.ai/v1${url}`,
				body,
				json: true,
			});

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			let responseData: IDataObject | IDataObject[] = {};

			if (resource === 'namespace') {
				if (operation === 'create') {
					const namespaceName = this.getNodeParameter('namespaceName', i) as string;
					const type = this.getNodeParameter('type', i) as string;
					const body: IDataObject = {
						namespace_name: namespaceName,
						type,
					};
					if (type === 'vector') {
						body.vector_dimension = this.getNodeParameter('vectorDimension', i) as number;
					}
					responseData = await moorchehRequest('POST', '/namespaces', body);
				} else if (operation === 'list') {
					responseData = await moorchehRequest('GET', '/namespaces');
				} else if (operation === 'delete') {
					const namespaceName = this.getNodeParameter('namespaceName', i) as string;
					responseData = await moorchehRequest(
						'DELETE',
						`/namespaces/${encodeURIComponent(namespaceName)}`,
					);
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`Unsupported namespace operation: ${operation}`,
						{ itemIndex: i },
					);
				}
			} else if (resource === 'document') {
				if (operation === 'upload') {
					const namespaceName = this.getNodeParameter('namespaceName', i) as string;
					const documents = this.getNodeParameter('documents', i, {}) as {
						document?: Array<{ id: string; text: string; metadata?: string }>;
					};
					responseData = await moorchehRequest(
						'POST',
						`/namespaces/${encodeURIComponent(namespaceName)}/documents`,
						{
							documents: (documents.document ?? []).map((doc) => ({
								id: doc.id,
								text: doc.text,
								...safeParseJson(doc.metadata ?? '{}', i),
							})),
						},
					);
				} else if (operation === 'delete') {
					const namespaceName = this.getNodeParameter('namespaceName', i) as string;
					const documentIds = this.getNodeParameter('documentIds', i) as string;
					responseData = await moorchehRequest(
						'POST',
						`/namespaces/${encodeURIComponent(namespaceName)}/documents/delete`,
						{ ids: csvToArray(documentIds) },
					);
				} else if (operation === 'get') {
					const namespaceName = this.getNodeParameter('namespaceName', i) as string;
					const documentIds = this.getNodeParameter('documentIds', i) as string;
					responseData = await moorchehRequest(
						'POST',
						`/namespaces/${encodeURIComponent(namespaceName)}/documents/get`,
						{ ids: csvToArray(documentIds) },
					);
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`Unsupported document operation: ${operation}`,
						{ itemIndex: i },
					);
				}
			} else if (resource === 'vector') {
				if (operation === 'upload') {
					const namespaceName = this.getNodeParameter('namespaceName', i) as string;
					const vectors = this.getNodeParameter('vectors', i, {}) as {
						vector?: Array<{ id: string; vector: string; metadata?: string }>;
					};
					responseData = await moorchehRequest(
						'POST',
						`/namespaces/${encodeURIComponent(namespaceName)}/vectors`,
						{
							vectors: (vectors.vector ?? []).map((vec) => ({
								id: vec.id,
								vector: csvToArray(vec.vector).map((v) => Number(v)),
								...safeParseJson(vec.metadata ?? '{}', i),
							})),
						},
					);
				} else if (operation === 'delete') {
					const namespaceName = this.getNodeParameter('namespaceName', i) as string;
					const vectorIds = this.getNodeParameter('vectorIds', i) as string;
					responseData = await moorchehRequest(
						'POST',
						`/namespaces/${encodeURIComponent(namespaceName)}/vectors/delete`,
						{ ids: csvToArray(vectorIds) },
					);
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`Unsupported vector operation: ${operation}`,
						{ itemIndex: i },
					);
				}
			} else if (resource === 'search') {
				const queryRaw = this.getNodeParameter('query', i) as string;
				const namespaces = this.getNodeParameter('namespaces', i) as string;
				const topK = this.getNodeParameter('topK', i) as number;
				const kioskMode = this.getNodeParameter('kioskMode', i) as boolean;
				const threshold = this.getNodeParameter('threshold', i, 0.1) as number;

				const body: IDataObject = {
					query: queryRaw.includes(',') ? csvToArray(queryRaw).map((v) => Number(v)) : queryRaw,
					namespaces: csvToArray(namespaces),
					top_k: topK,
					kiosk_mode: kioskMode,
				};
				if (kioskMode) body.threshold = threshold;
				responseData = await moorchehRequest('POST', '/search', body);
			} else if (resource === 'answer') {
				const namespace = this.getNodeParameter('namespace', i) as string;
				const query = this.getNodeParameter('query', i) as string;
				const topK = this.getNodeParameter('topK', i) as number;
				const kioskMode = this.getNodeParameter('kioskMode', i) as boolean;
				const threshold = this.getNodeParameter('threshold', i, 0.2) as number;
				const aiModel = this.getNodeParameter('aiModel', i) as string;
				const temperature = this.getNodeParameter('temperature', i) as number;
				const headerPrompt = this.getNodeParameter('headerPrompt', i) as string;
				const footerPrompt = this.getNodeParameter('footerPrompt', i) as string;
				const chatHistory = this.getNodeParameter('chatHistory', i, {}) as {
					message?: Array<{ role: 'user' | 'assistant'; content: string }>;
				};

				const body: IDataObject = {
					namespace,
					type: 'text',
					query,
					top_k: topK,
					kiosk_mode: kioskMode,
					ai_model: aiModel,
					temperature,
					header_prompt: headerPrompt,
					footer_prompt: footerPrompt,
					chat_history: (chatHistory.message ?? []).map((msg) => ({
						role: msg.role,
						content: msg.content,
					})),
				};
				if (kioskMode) body.threshold = threshold;
				responseData = await moorchehRequest('POST', '/answer', body);
			} else {
				throw new NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`, {
					itemIndex: i,
				});
			}

			const normalized = Array.isArray(responseData) ? responseData : [responseData];
			for (const entry of normalized) {
				returnData.push({ json: entry });
			}
		}

		return [returnData];
	}
}
