import { INodeTypeDescription } from 'n8n-workflow';

export const answerOperations: INodeTypeDescription['properties'] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['answer'],
			},
		},
		options: [
			{
				name: 'Generate',
				value: 'generate',
				description: 'Generate AI answer based on namespace content',
				action: 'Generate AI answer based on namespace content',
			},
		],
		default: 'generate',
	},
	{
		displayName: 'Namespace',
		name: 'namespace',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		routing: {
			request: {
				url: '/answer',
				method: 'POST',
				body: {
					namespace: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'hidden',
		default: 'text',
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
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
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		routing: {
			request: {
				body: {
					query: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Top K',
		name: 'topK',
		type: 'number',
		default: 5,
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
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
		default: 0.2,
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
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
				resource: ['answer'],
				operation: ['generate'],
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
	{
		displayName: 'AI Model',
		name: 'aiModel',
		type: 'options',
		options: [
			{
				name: 'Claude 3.7 Sonnet',
				value: 'anthropic.claude-3-7-sonnet-20250219-v1:0',
			},
			{
				name: 'Claude Sonnet 4',
				value: 'anthropic.claude-sonnet-4-20250514-v1:0',
			},
			{
				name: 'DeepSeek R1',
				value: 'deepseek.r1-v1:0',
			},
			{
				name: 'Llama 3.3 70B',
				value: 'meta.llama3-3-70b-instruct-v1:0',
			},
			{
				name: 'Llama 4 Maverick',
				value: 'meta.llama4-maverick-17b-instruct-v1:0',
			},
		],
		default: 'anthropic.claude-3-7-sonnet-20250219-v1:0',
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		routing: {
			request: {
				body: {
					aiModel: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Temperature',
		name: 'temperature',
		type: 'number',
		default: 0.7,
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		routing: {
			request: {
				body: {
					temperature: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Header Prompt',
		name: 'headerPrompt',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		routing: {
			request: {
				body: {
					headerPrompt: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Footer Prompt',
		name: 'footerPrompt',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		routing: {
			request: {
				body: {
					footerPrompt: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Chat History',
		name: 'chatHistory',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		default: {},
		options: [
			{
				name: 'message',
				displayName: 'Message',
				values: [
					{
						displayName: 'Role',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'Assistant',
								value: 'assistant',
							},
						],
						default: 'user',
					},
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						default: '',
					},
				],
			},
		],
		routing: {
			request: {
				body: {
					chatHistory: '={{$value && $value.message && $value.message.length > 0 ? $value.message.map(msg => ({role: msg.role, content: msg.content})) : []}}',
				},
			},
		},
	},
]; 
