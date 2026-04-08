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
				description:
					'Amazon · 2 credits · Chat, math, and structured answers for AWS-style workloads',
			},
			{
				name: 'Claude Opus 4.6',
				value: 'anthropic.claude-opus-4-6-v1',
				description:
					'Anthropic · 3 credits · Deepest reasoning and hardest tasks; pick when quality matters most (~1M context)',
			},
			{
				name: 'Claude Sonnet 4.6',
				value: 'anthropic.claude-sonnet-4-6',
				description:
					'Anthropic · 3 credits · Fast flagship: coding, tools, long docs and RAG (~1M context)',
			},
			{
				name: 'DeepSeek R1',
				value: 'deepseek.r1-v1:0',
				description:
					'DeepSeek · 1 credit · Step-by-step reasoning; math, logic, and technical explanations',
			},
			{
				name: 'DeepSeek V3.2',
				value: 'deepseek.v3.2',
				description:
					'DeepSeek · 2 credits · Efficient general Q&A, multilingual, everyday RAG (~164K context)',
			},
			{
				name: 'Llama 4 Maverick 17B',
				value: 'meta.llama4-maverick-17b-instruct-v1:0',
				description:
					'Meta · 3 credits · Long context, summarization, function calling, fine-tuning friendly',
			},
			{
				name: 'OpenAI GPT OSS 120B',
				value: 'openai.gpt-oss-120b-1:0',
				description:
					'OpenAI · 3 credits · Large generalist: research-style answers and long-form writing',
			},
			{
				name: 'Qwen 3 32B',
				value: 'qwen.qwen3-32b-v1:0',
				description: 'Qwen · 2 credits · Code and bilingual (EN/ZH) tasks in a smaller footprint',
			},
			{
				name: 'Qwen3 Next 80B A3B',
				value: 'qwen.qwen3-next-80b-a3b',
				description:
					'Qwen · MoE model for long chats, docs, and code at scale (~256K context)',
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
