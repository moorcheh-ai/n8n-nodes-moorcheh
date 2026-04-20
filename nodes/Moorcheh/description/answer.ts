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
				name: 'Amazon Nova Pro',
				value: 'amazon.nova-pro-v1:0',
			},
			{
				name: 'Claude Opus 4.6',
				value: 'anthropic.claude-opus-4-6-v1',
			},
			{
				name: 'Claude Sonnet 4.6',
				value: 'anthropic.claude-sonnet-4-6',
			},
			{
				name: 'DeepSeek R1',
				value: 'deepseek.r1-v1:0',
			},
			{
				name: 'DeepSeek V3.2',
				value: 'deepseek.v3.2',
			},
			{
				name: 'Llama 4 Maverick 17B',
				value: 'meta.llama4-maverick-17b-instruct-v1:0',
			},
			{
				name: 'OpenAI GPT OSS 120B',
				value: 'openai.gpt-oss-120b-1:0',
			},
			{
				name: 'Qwen 3 32B',
				value: 'qwen.qwen3-32b-v1:0',
			},
			{
				name: 'Qwen3 Next 80B A3B',
				value: 'qwen.qwen3-next-80b-a3b',
			},
		],
		default: 'anthropic.claude-sonnet-4-6',
		displayOptions: {
			show: {
				resource: ['answer'],
				operation: ['generate'],
			},
		},
		routing: {
			request: {
				body: {
					ai_model: '={{$value}}',
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
					header_prompt: '={{$value}}',
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
					footer_prompt: '={{$value}}',
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
					chat_history: '={{$value && $value.message && $value.message.length > 0 ? $value.message.map(msg => ({role: msg.role, content: msg.content})) : []}}',
				},
			},
		},
	},
];
