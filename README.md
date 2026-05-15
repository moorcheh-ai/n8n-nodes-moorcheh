# n8n-nodes-moorcheh

![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

This is an [n8n](https://n8n.io/) Official node interfacing with [Moorcheh](https://moorcheh.ai).

Moorcheh is a powerful vector store and AI platform that enables semantic search, document storage, and AI-powered question answering across your data.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Namespace Operations
- **[Create](https://docs.moorcheh.ai/api-reference/namespaces/create)**: Create a new namespace for storing documents or vectors
- **[List](https://docs.moorcheh.ai/api-reference/namespaces/list)**: List all available namespaces
- **[Delete](https://docs.moorcheh.ai/api-reference/namespaces/delete)**: Delete a namespace and all its contents

### Document Operations
- **[Upload](https://docs.moorcheh.ai/api-reference/data/upload-text)**: Upload documents to a namespace for semantic search
- **[Get](https://docs.moorcheh.ai/api-reference/data/get-documents)**: Retrieve specific documents by their IDs
- **[Fetch Text Data](https://docs.moorcheh.ai/api-reference/data/fetch-text-data)**: List stored text and summary chunks from a **text-type** namespace (up to **100** items per request; vector-only namespaces are not supported)
- **[Delete](https://docs.moorcheh.ai/api-reference/data/delete)**: Delete documents from a namespace

### Vector Operations
- **[Upload](https://docs.moorcheh.ai/api-reference/data/upload-vector)**: Upload vector embeddings to a namespace
- **[Delete](https://docs.moorcheh.ai/api-reference/data/delete)**: Delete vectors from a namespace

### Search Operations
- **[Search](https://docs.moorcheh.ai/api-reference/search/query)**: Perform semantic search across namespaces using text queries or vector embeddings

### Answer Operations
- **[Generate](https://docs.moorcheh.ai/api-reference/ai/generate)**: Generate AI-powered answers based on namespace content using various LLM models

## Credentials

To use this node, you need a Moorcheh API key:

1. Sign up for a Moorcheh account (see [Quickstart](https://docs.moorcheh.ai/quickstart) on [docs.moorcheh.ai](https://docs.moorcheh.ai))
2. Navigate to your API settings in the Moorcheh console
3. Generate an API key
4. Use the API key in the Moorcheh credentials in n8n ([Authentication](https://docs.moorcheh.ai/guides/authentication))

## Compatibility

- **n8n version**: 1.0.0 or later
- **Node.js version**: 20.15 or later

## Usage

### Creating a Namespace
1. Select the "Namespace" resource
2. Choose "Create" operation
3. Enter a namespace name
4. Select the type (Text or Vector)
5. For vector namespaces, specify the vector dimension

### Uploading Documents
1. Select the "Document" resource
2. Choose "Upload" operation
3. Enter the namespace name
4. Add documents with ID, text content, and optional metadata

### Fetching text chunks (batch)
1. Select the "Document" resource
2. Choose **Fetch Text Data**
3. Enter the **text-type** namespace name

The API returns `items` (max 100), `statistics`, and metadata suited for display, export, or RAG. Authenticate with your Moorcheh API key (same as other operations).

### Searching Content
1. Select the "Search" resource
2. Choose "Search" operation
3. Enter your query (text or comma-separated vector values)
4. Specify target namespaces
5. Set top_k and threshold parameters

### Generating AI Answers
1. Select the "Answer" resource
2. Choose "Generate" operation
3. Enter the namespace name
4. Provide your question
5. Select an AI model and configure parameters

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Moorcheh Documentation](https://docs.moorcheh.ai) — API reference, guides, and [documentation index](https://docs.moorcheh.ai/llms.txt)
* [Moorcheh n8n integration](https://docs.moorcheh.ai/integrations/n8n/overview)
* [Moorcheh Console](https://console.moorcheh.ai) — account and API keys
